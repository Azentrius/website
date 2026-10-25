---
slug: cockpit-status-board
lang: en
title: "Status Board: every host's add-ons on one Cockpit page"
description: "Cockpit page for the host that reaches the others: one row per host of the host switcher, one tile per Azentrius add-on. Read-only."
eyebrow: Cockpit add-on
h1: The state of every host on one page
lead: "One row per host of Cockpit's host switcher, one tile per Azentrius add-on, such as Cron Jobs, Image Update Monitor, Update Gaps and Security Monitor. It belongs on the Cockpit host from which the others are reached and only reads; a click on a tile opens the add-on on its host."
summary: The state of the Azentrius add-ons on every host of Cockpit's host switcher, one row per host, one tile per add-on.
platforms: ["Cockpit", "Debian & Ubuntu", "Fedora & RHEL"]
problemTitle: Every add-on on every host is a page of its own.
problem:
  - "Each add-on shows its state on its own host. To see everything, you open every add-on on every host."
  - "An add-on missing on one host, or an update forgotten there, is easy to miss."
  - "A host that does not answer should say so instead of looking fine."
features:
  - title: One row per host
    text: "In the order of the host switcher, this host first, with the most severe state of its add-ons, or why the host cannot be read."
  - title: One tile per add-on
    text: "Its state, its most important figure, its summary and the age of its data. A click opens the add-on on its host."
  - title: Gaps show
    text: "The tiles stand in the same order on every host: an add-on missing on one host gets a tile “Not installed” there, and a tile says when another host runs a newer version."
  - title: Every entry
    text: "All entries of an add-on fold out in a table below the row. An entry with a place in the add-on opens it there."
  - title: Only what needs attention
    text: "A switch in the header leaves out the tiles that need none. The browser keeps the choice."
  - title: Current without you
    text: "It loads on opening, on Refresh and every 5 minutes while the page is visible. Data older than the add-on allows makes the tile a warning."
explainer:
  title: What a tile can say
  intro: "A tile in OK means that the add-on found nothing in what it checks, not that the host is safe."
  head: ["Label", "Meaning"]
  rows:
    - ["OK, Notice, Warning, Problem, Unknown", "The add-on's own state, in the status language all Azentrius add-ons share"]
    - ["Not installed", "The add-on runs on another host, but not on this one"]
    - ["No status", "The add-on's version on this host does not have the status contract yet"]
    - ["No access", "Without administrative access on this host, the add-on has nothing to report"]
    - ["Status unreadable", "The answer does not fit the contract; the tile gives the reason"]
    - ["Unreachable, Key locked", "The host did not answer, or the SSH key is locked"]
security:
  - "Read-only: it runs each add-on's status command, asks for no administrative access and changes nothing on any host."
  - "Status commands run only from /usr/lib/cockpit-…, always with status --lang en or de; other arguments from a manifest are ignored."
  - "What a host sends is data: checked against the status contract and shown as text only. A compromised host can report a false state, but it cannot run code in the session."
  - "The page loads nothing from the network: it brings its own fonts and icons."
requirements:
  - "On the host with the board: Cockpit with the host switcher, developed against Cockpit 360"
  - "To open an add-on on another host with a click: AllowMultiHost in Cockpit"
  - "On the other hosts: cockpit-bridge, a login by SSH key, and the add-ons"
  - "Add-ons with the status contract: Cron Jobs 2.8.1, Image Update Monitor 0.20.0, Update Gaps 0.1.0, Security Monitor 0.1.0 or newer"
faq:
  - q: Where do I install it?
    a: "On the Cockpit host from which the others are reached, such as a bastion. The other hosts need only the add-ons."
  - q: Does it need administrative access on the other hosts?
    a: "No. Each add-on reports what it can read without root; that is the normal case for hosts reached with a key."
  - q: Does it notify me?
    a: "No. It loads only while the page is open and notifies no one."
  - q: Does it look for new releases?
    a: "No. It compares the versions the hosts run with each other, so a forgotten update shows."
  - q: Which hosts does it show?
    a: "Those in the host switcher's list in /etc/cockpit/machines.d. A host added without administrative access, which the switcher keeps for one browser session only, is not on the board."
  - q: Does it keep any data?
    a: "No, on no host. Only the browser keeps the switch “Only what needs attention”."
compare: "Status Board is not a monitoring system: it keeps no data, sends no alerts and loads only while the page is open. It reaches the hosts over the host switcher's own SSH connections; they need only cockpit-bridge, a login by key and the add-ons."
alt:
  board: "Status Board on a bastion with three hosts behind it: the coverage above, then one row per host with a tile per add-on, its state, key figure and the age of its data"
  board-details: "Only what needs attention, with the entries of Security Monitor folded out below its row"
primaryAction:
  label: Install Status Board
  href: "#install"
updated: 2026-10-23
---

Install the board on the host with the host switcher; the other hosts need only the add-ons.

### From the Azentrius package repository

For Debian, Ubuntu, Fedora and RHEL. Set up the repository once:

```sh
# Debian and Ubuntu
curl -fsSLO https://packages.azentrius.com/azentrius-repository.deb
sudo apt install ./azentrius-repository.deb
sudo apt update

# Fedora and RHEL
sudo rpm --import https://packages.azentrius.com/azentrius.asc
sudo dnf install https://packages.azentrius.com/azentrius-repository.rpm
```

Then install **Status Board** in Cockpit under **Applications**, or on the console:

```sh
sudo apt install cockpit-status-board    # Debian, Ubuntu
sudo dnf install cockpit-status-board    # Fedora, RHEL
```

The system's updates keep it current. Status Board appears in Cockpit's menu near Overview; if it does not show yet, log in to Cockpit again.

### From the files of a release

On openSUSE this is the only way. Every [release](https://github.com/Azentrius/cockpit-status-board/releases) has the `.deb`, the `.rpm`, `SHA256SUMS` and a signed build provenance. Check both before you install:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify <file> --repo Azentrius/cockpit-status-board
```

The `.rpm` of a release carries no package signature, so `zypper` needs `--allow-unsigned-rpm`; the two checks take its place. The [README](https://github.com/Azentrius/cockpit-status-board#install-update-uninstall) has the details.
