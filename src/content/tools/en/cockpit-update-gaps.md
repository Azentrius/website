---
slug: cockpit-update-gaps
lang: en
title: "Update Gaps: missing updates and why (Cockpit)"
description: "Cockpit add-on: where a server misses updates although Software Updates lists none, such as held packages or Ubuntu Pro fixes, and why."
eyebrow: Cockpit add-on
h1: Find the updates Software Updates does not list
lead: "Held packages, fixes only with Ubuntu Pro, a pending restart, a kernel update that ran out of room in /boot: for every finding the page says what is missing, where the information comes from, why Cockpit's Software Updates does not show it and what you can do."
summary: Where a server misses updates although Software Updates lists none, and for every finding why and what you can do.
platforms: ["Cockpit", "Debian 12+", "Ubuntu 22.04+"]
problemTitle: No updates is not the same as up to date.
problem:
  - "A package on hold is never upgraded, and Software Updates does not list it."
  - "Once the last signing key of a source has expired, apt reads that source no more and its updates drop out of every list. Only apt update warns."
  - "A kernel update that runs out of room in /boot stops halfway and leaves dpkg half done. Software Updates only says that it failed."
features:
  - title: What Software Updates leaves out
    text: "Held packages, fixes only with Ubuntu Pro, a pending restart, CPU vulnerabilities the kernel reports, firmware (with fwupd), snaps that are not refreshed, packages without a source, backports, software outside the package manager and the end of support."
  - title: Upkeep gone wrong
    text: "Packages dpkg left half done, too little room in /boot for the next kernel, expired signing keys, old package lists, phased updates Software Updates fails on, and what the last run of the automatic updates did."
  - title: Why, and what you can do
    text: "Every card says why Software Updates does not show it, what you can do and where the data come from. Commands are there to copy into a terminal; the page installs nothing."
  - title: Since when
    text: "A finding an earlier check saw as well says since when it has been there. The page always says how old its data is and when apt last updated its package lists."
  - title: Acknowledge for a while
    text: "With administrative access, a finding that is meant to be there can be acknowledged until a day you pick, at most 90 days ahead, with an optional reason. The page keeps showing it; the status stops counting it."
  - title: Network data, if you want them
    text: "Once set up, an unprivileged service fetches once a day the security issues Ubuntu has not fixed yet, fixes released upstream and newer versions elsewhere in Ubuntu."
explainer:
  title: Why Software Updates does not show them
  intro: "A few of the areas the add-on checks, and why Cockpit's Software Updates misses them. An empty section never means safe: the page lists what it did not check."
  head: ["Area", "Why Software Updates does not show it"]
  rows:
    - ["Held packages", "A package on hold is never upgraded, and PackageKit does not list it."]
    - ["Fixes only with Ubuntu Pro", "Without Ubuntu Pro, apt has no source for esm-apps and esm-infra."]
    - ["Restart pending", "On Debian and Ubuntu, Cockpit does not tell when a restart is pending."]
    - ["Phased updates (Ubuntu)", "Software Updates lists them, but its install fails on them, and on every other update with them."]
    - ["Signing keys of the sources", "Once the last key of a source has expired, apt reads that source no more; only apt update warns."]
    - ["End of support", "Cockpit does not show when a release stops getting updates."]
security:
  - "Read only: the check never runs apt update and never installs, removes or restarts anything. The page can only switch its own regular check and the network data on or off, and acknowledge findings."
  - "Every check runs as a hardened systemd service without network access, also when you press Refresh."
  - "Network data come only once you set them up, from an unprivileged service of their own. What leaves the server: the release name, the names of selected source packages and which of a fixed list of projects are installed."
  - "Credentials in the addresses of package sources are removed from the state, which every local user can read."
  - "The browser makes no external requests: the fonts ship with the add-on."
requirements:
  - "Debian 12 or newer, or Ubuntu 22.04 or newer, with systemd"
  - "Cockpit 264 or newer"
  - "Python 3.8 or newer (standard library only)"
  - "Optional, used when present: needrestart, ubuntu-pro-client, distro-info-data, unattended-upgrades, gpg, fwupd"
faq:
  - q: Does it install updates?
    a: "No. It only reads. Where a card gives commands, they are for you to copy into a terminal."
  - q: Does an empty page mean the server is safe?
    a: "No. An empty section never means safe: the page always says what it did not check, what was skipped and how old its data is."
  - q: Which systems does it check?
    a: "Debian 12 and newer and Ubuntu 22.04 and newer. Fedora, RHEL and openSUSE are not checked yet, and the package repository serves the add-on for Debian and Ubuntu only."
  - q: Does it send data anywhere?
    a: "Only once you set up the network data. Then, once a day, the release name goes to Canonical's security metadata, the names of selected source packages to Launchpad, and which of a fixed list of projects are installed to GitHub."
  - q: Can I silence a finding I know about?
    a: "Yes, with administrative access: acknowledge it until a day at most 90 days ahead. It stays on the page and counts again after that day, or as soon as it changes in a way that matters. Some findings, such as a pending restart, cannot be acknowledged."
  - q: Does it check container images?
    a: "No. Image Update Monitor shows the versions of your containers."
  - q: Do I need it on every server?
    a: "Yes, on each server you look at in Cockpit, also behind a Cockpit bastion. Status Board shows the state of all of them on one page."
compare: "Software Updates compares the installed packages with the package sources. Update Gaps looks at what that comparison leaves out, and at the state of the system around it. It changes nothing on its own. Container images are for Image Update Monitor, what is reachable from where for Security Monitor."
alt:
  overview: "Update Gaps in Cockpit: findings in seven areas on a server with held packages, fixes only with Ubuntu Pro and a pending restart"
  upkeep: "Upkeep gone wrong: a kernel package dpkg left half configured and too little room in /boot, with the commands that finish it"
  accepted: "Held Docker packages acknowledged until the maintenance window: still shown, no longer counted in the status"
primaryAction:
  label: Install Update Gaps
  href: "#install"
updated: 2026-10-23
---

### From the Azentrius package repository

For Debian and Ubuntu. Set up the repository once:

```sh
curl -fsSLO https://packages.azentrius.com/azentrius-repository.deb
sudo apt install ./azentrius-repository.deb
sudo apt update
```

Then install **Update Gaps** in Cockpit under **Applications**, or on the console:

```sh
sudo apt install cockpit-update-gaps
```

The system's updates keep it current. Install it on every server you look at in Cockpit, then open the page once with administrative access: it checks the server by itself. Set up the regular check there, and the network data if you want them.

### From the files of a release

Every [release](https://github.com/Azentrius/cockpit-update-gaps/releases) has the `.deb`, `SHA256SUMS` and a signed build provenance. Check both before you install:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify cockpit-update-gaps_X.Y.Z-1_all.deb --repo Azentrius/cockpit-update-gaps
sudo apt install ./cockpit-update-gaps_X.Y.Z-1_all.deb
```

Supported systems, settings and uninstalling: see the [README](https://github.com/Azentrius/cockpit-update-gaps#install-update-uninstall).
