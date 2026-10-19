#!/usr/bin/env python3
# SPDX-License-Identifier: Apache-2.0
"""Keeps azentrius.com at the latest release of Azentrius/website.

    azentrius-website sync          take the latest release from GitHub if it is new, verify it,
                                    unpack it and make it the live one
    azentrius-website use VERSION   make an unpacked release the live one (going back)
    azentrius-website list          the unpacked releases; * marks the live one

A release is taken only if the SHA-256 of its archive matches the release's SHA256SUMS and the
digest GitHub reports, and if `gh attestation verify` confirms that the release workflow of
Azentrius/website built it. It is unpacked next to the others; then the link "current", which
nginx serves, is switched to it in one step. The last KEEP releases stay for going back.

Environment (defaults for public-host):
    AZWEB_ROOT   /var/www/azentrius-website    releases/ and the link current
    AZWEB_STATE  /var/lib/azentrius-website    lock and temporary files
"""
import argparse
import fcntl
import hashlib
import json
import os
import pathlib
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import urllib.request

REPO = "Azentrius/website"
WORKFLOW = f"{REPO}/.github/workflows/release.yml"
ROOT = pathlib.Path(os.environ.get("AZWEB_ROOT", "/var/www/azentrius-website"))
STATE = pathlib.Path(os.environ.get("AZWEB_STATE", "/var/lib/azentrius-website"))
RELEASES = ROOT / "releases"
CURRENT = ROOT / "current"
API = "https://api.github.com"
KEEP = 3
VERSION = re.compile(r"^\d+\.\d+\.\d+$")


def log(*args):
    print(*args, flush=True)


def http(url, accept="application/vnd.github+json"):
    req = urllib.request.Request(url, headers={
        "Accept": accept, "User-Agent": "azentrius-website", "X-GitHub-Api-Version": "2022-11-28"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        return resp.read()


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for block in iter(lambda: f.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest()


def parse_sums(text):
    """SHA256SUMS lines "<hex>  <name>" (also "*name") -> {name: hex}."""
    sums = {}
    for line in text.splitlines():
        parts = line.split()
        if len(parts) == 2 and len(parts[0]) == 64:
            sums[parts[1].lstrip("*")] = parts[0].lower()
    return sums


def verify_attestation(path, digest, work):
    """gh checks the Sigstore bundle: built by .github/workflows/release.yml of Azentrius/website."""
    data = json.loads(http(f"{API}/repos/{REPO}/attestations/sha256:{digest}"))
    bundles = [a["bundle"] for a in data.get("attestations", [])]
    if not bundles:
        raise RuntimeError(f"{path.name}: no attestation")
    bundle = work / "bundle.jsonl"
    bundle.write_text("".join(json.dumps(b) + "\n" for b in bundles))
    (work / "gh").mkdir(exist_ok=True)
    env = dict(os.environ, GH_TOKEN="", GITHUB_TOKEN="", GH_CONFIG_DIR=str(work / "gh"))
    subprocess.run(["gh", "attestation", "verify", str(path), "--repo", REPO, "--bundle", str(bundle),
                    "--signer-workflow", WORKFLOW], check=True, env=env, stdout=subprocess.DEVNULL)


def key(version):
    return [int(n) for n in version.split(".")]


def unpacked():
    """Versions in releases/, oldest first."""
    if not RELEASES.is_dir():
        return []
    return sorted((p.name for p in RELEASES.iterdir() if p.is_dir() and VERSION.match(p.name)), key=key)


def live():
    """The version "current" points at, or None."""
    try:
        return pathlib.Path(os.readlink(CURRENT)).name
    except OSError:
        return None


def unpack(archive, version):
    """Unpack the one folder azentrius-website-VERSION/ of the archive to releases/VERSION."""
    prefix = f"azentrius-website-{version}"
    RELEASES.mkdir(parents=True, exist_ok=True)
    tmp = pathlib.Path(tempfile.mkdtemp(prefix=f".{version}-", dir=RELEASES))
    try:
        with tarfile.open(archive, "r:gz") as tar:
            for member in tar.getmembers():
                if member.name != prefix and not member.name.startswith(prefix + "/"):
                    raise RuntimeError(f"unexpected path in the archive: {member.name}")
                if not (member.isfile() or member.isdir()):
                    raise RuntimeError(f"not a file or folder in the archive: {member.name}")
            # The "data" filter refuses absolute paths, links out of the folder and special files.
            tar.extractall(tmp, filter="data")
        site = tmp / prefix
        if not (site / "index.html").is_file() or not (site / "404.html").is_file():
            raise RuntimeError("the archive has no index.html or 404.html")
        for dirpath, dirnames, filenames in os.walk(site):
            os.chmod(dirpath, 0o755)
            for name in filenames:
                os.chmod(os.path.join(dirpath, name), 0o644)
        dest = RELEASES / version
        if dest.exists():
            shutil.rmtree(dest)
        os.rename(site, dest)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def use(version):
    """Point "current" at releases/VERSION in one step."""
    if not (RELEASES / version / "index.html").is_file():
        raise RuntimeError(f"release {version} is not unpacked")
    tmp = ROOT / ".current.part"
    tmp.unlink(missing_ok=True)
    tmp.symlink_to(pathlib.Path("releases") / version)
    os.replace(tmp, CURRENT)
    log(f"live: {version}")


def prune():
    """Keep the newest KEEP releases and the live one."""
    keep = set(unpacked()[-KEEP:]) | {live()}
    for version in unpacked():
        if version not in keep:
            shutil.rmtree(RELEASES / version)
            log(f"removed {version}")


def sync():
    rel = json.loads(http(f"{API}/repos/{REPO}/releases/latest"))
    version = rel["tag_name"].removeprefix("v")
    if not VERSION.match(version):
        raise RuntimeError(f"tag {rel['tag_name']} is not a version")
    if live() == version:
        log(f"nothing new ({version} is live)")
        return
    name = f"azentrius-website-{version}.tar.gz"
    assets = {a["name"]: a for a in rel["assets"]}
    if name not in assets or "SHA256SUMS" not in assets:
        raise RuntimeError(f"release {version} lacks {name} or SHA256SUMS")
    sums = parse_sums(http(assets["SHA256SUMS"]["browser_download_url"], "*/*").decode())
    with tempfile.TemporaryDirectory(dir=STATE) as tmp:
        work = pathlib.Path(tmp)
        archive = work / name
        archive.write_bytes(http(assets[name]["browser_download_url"], "*/*"))
        digest = sha256(archive)
        reported = assets[name].get("digest")
        if sums.get(name) != digest or (reported and reported != "sha256:" + digest):
            raise RuntimeError(f"{name}: checksum differs")
        verify_attestation(archive, digest, work)
        unpack(archive, version)
    use(version)
    prune()


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="cmd", required=True)
    sub.add_parser("sync")
    p_use = sub.add_parser("use")
    p_use.add_argument("version")
    sub.add_parser("list")
    args = parser.parse_args()

    if args.cmd == "list":
        for version in unpacked():
            log(("* " if version == live() else "  ") + version)
        return
    STATE.mkdir(parents=True, exist_ok=True)
    with open(STATE / "lock", "w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        if args.cmd == "sync":
            sync()
        else:
            use(args.version)


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as e:
        sys.exit(f"failed: {' '.join(map(str, e.cmd))} (exit {e.returncode})")
    except (RuntimeError, OSError, tarfile.TarError) as e:
        sys.exit(f"failed: {e}")
