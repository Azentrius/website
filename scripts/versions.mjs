// SPDX-License-Identifier: Apache-2.0
// Reads the latest release of every tool from the GitHub API into src/data/versions.json. When a
// request fails (no network, rate limit), the version already in the file stays: the build goes on
// with the last known version instead of failing. GITHUB_TOKEN is used if set (more requests per hour).
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../src/data/versions.json", import.meta.url);
const REPOS = {
  "cockpit-cronjobs": "Azentrius/cockpit-cronjobs",
  "cockpit-image-update-monitor": "Azentrius/cockpit-image-update-monitor",
  "cockpit-update-gaps": "Azentrius/cockpit-update-gaps",
  "cockpit-security-monitor": "Azentrius/cockpit-security-monitor",
  "cockpit-status-board": "Azentrius/cockpit-status-board",
  "cockpit-host-settings": "Azentrius/cockpit-host-settings",
  stellwerk: "Azentrius/stellwerk",
  lautwerk: "Azentrius/lautwerk",
  sharewerk: "Azentrius/sharewerk",
  "home-assistant-theme": "Azentrius/home-assistant-theme",
};

let known = {};
try {
  known = JSON.parse(readFileSync(FILE, "utf8"));
} catch {
  known = {};
}

const headers = { Accept: "application/vnd.github+json", "User-Agent": "azentrius-website-build" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const result = { ...known };
for (const [slug, repo] of Object.entries(REPOS)) {
  try {
    const url = `https://api.github.com/repos/${repo}/releases/latest`;
    let response = await fetch(url, { headers, signal: AbortSignal.timeout(10_000) });
    if (response.status === 401 && headers.Authorization) {
      // A token that is not valid for this API: public releases need none.
      delete headers.Authorization;
      response = await fetch(url, { headers, signal: AbortSignal.timeout(10_000) });
    }
    if (response.status === 404) {
      result[slug] = null; // no release yet
      console.log(`${slug}: no release`);
      continue;
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const release = await response.json();
    const version = String(release.tag_name).replace(/^v/, "");
    if (!/^\d+\.\d+\.\d+([-.+][0-9A-Za-z.-]+)?$/.test(version)) throw new Error(`odd tag ${release.tag_name}`);
    result[slug] = { version, date: String(release.published_at).slice(0, 10) };
    console.log(`${slug}: ${version}`);
  } catch (error) {
    console.warn(`${slug}: keeping ${JSON.stringify(known[slug] ?? null)} (${error.message})`);
    result[slug] = known[slug] ?? null;
  }
}

writeFileSync(FILE, JSON.stringify(result, null, 2) + "\n");
