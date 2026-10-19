---
slug: cockpit-image-update-monitor
lang: en
title: "Image Update Monitor: Docker updates with rollback (Cockpit)"
description: "See configured, running and newest version of every Docker container. Update from Cockpit with a database dump first and rollback at a click."
eyebrow: Cockpit add-on
h1: Docker updates with a plan and a way back
lead: "For every running Docker container: what the compose file says, which version actually runs and which is the newest. Updates from Cockpit with a database dump first, a rollback copy of the old image and a rollback at a click."
summary: Configured, running and newest version of every Docker container, and updates with a dump first and a rollback.
platforms: ["Cockpit", "Docker Compose v2", "Linux with systemd"]
problemTitle: "latest is not a version."
problem:
  - "A tag like latest does not tell you which version runs."
  - "An update without a dump puts the database at risk."
  - "Whoever updates on purpose needs a plan before and a way back after."
features:
  - title: Three versions per container
    text: "Configured, installed and newest, with the newest split into patch, minor and major."
  - title: Two ways to find updates
    text: "Diun reports new images of the same tag; a version radar looks for newer tags every six hours, without pulling images."
  - title: An update with a plan
    text: "Before anything changes: which containers are recreated, which databases are involved, what depends on them and how much space is free."
  - title: A dump before every update
    text: "Postgres, MariaDB and MySQL are dumped first. If the dump fails, the update stops before anything changes."
  - title: Rollback at a click
    text: "The old image is kept as a rollback copy; one click puts it back."
  - title: Change the version
    text: "Pick another tag from a list and see every line that changes in the compose or .env file. The files are copied byte for byte and restored on rollback."
explainer:
  title: How it knows which version runs
  intro: "A tag like latest or 16-alpine does not say what really runs. The add-on asks four sources; the first that matches wins."
  head: ["Source", "Example"]
  rows:
    - ["The tag is already an exact version", "v2.1.4 is 2.1.4"]
    - ["The app's version variable in the image", "PG_VERSION=16.14 behind 16-alpine"]
    - ["The image label org.opencontainers.image.version, if that version exists as a tag", "rustdesk 1.1.15"]
    - ["The digest: which version tag in the registry points to exactly the installed image", "ollama latest is 0.30.11"]
security:
  - "Everything that runs as root is a small, fixed set of helper scripts in a package directory."
  - "Diun sees Docker only through a read-only socket proxy."
  - "The browser makes no external requests."
  - "Dumps are readable by root only."
requirements:
  - "Linux with systemd and Cockpit 264 or newer"
  - "Docker Engine with the Docker Compose plugin 2.8 or newer"
  - "Python 3.8 or newer"
  - "skopeo for the radar and Diun for digest updates; the add-on sets both up on request"
faq:
  - q: Does it update containers automatically?
    a: "No. Every update starts with a click, after a plan. Rules for automatic updates are an idea in the roadmap."
  - q: Does a rollback restore my data?
    a: "No. A rollback puts the old image back. If the new version has already migrated the database, only the dump helps, and restoring it is deliberately manual."
  - q: Do I need Diun?
    a: "For new images of the same tag, yes; the add-on sets Diun up on request. New version tags are found by the radar with skopeo."
  - q: Does it pull images to check for updates?
    a: "No. The radar only reads tag lists; on Docker Hub this does not count against the pull limit."
  - q: Does it work with Podman?
    a: "No, only Docker with Compose v2. Swarm, Kubernetes and rootless Docker are not supported either."
  - q: What if the database dump fails?
    a: "Then the update stops before anything changes."
compare: "Image Update Monitor does not update on its own, on purpose: you decide when, with a plan, a dump and a way back. Tools such as Watchtower's successors update automatically; Diun only notifies. Limits, named openly: Docker with Compose v2 only, the radar does not see private registries, and major versions of databases stay manual."
alt:
  updates: "Image Update Monitor in Cockpit: every running container with its configured, installed and newest version"
  update-dialog: "The plan before an update: what is recreated, the installed and the new version, the rollback copy and the database dump"
  update-done: "An update in progress: the database dump, the rollback copy and Docker Compose's output, live"
  version-dialog: "Changing the version of a container: the chosen tag, the line that changes in the compose file and the plan"
  backups: "Backups and dumps: cleanup rules and the update history with rollback buttons"
primaryAction:
  label: Install Image Update Monitor
  href: "#install"
updated: 2026-10-19
---

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

Then install **Image Update Monitor** in Cockpit under **Applications**, or on the console:

```sh
sudo apt install cockpit-image-update-monitor    # Debian, Ubuntu
sudo dnf install cockpit-image-update-monitor    # Fedora, RHEL
```

On first start, the add-on offers to set up skopeo and Diun.

### From the files of a release

Every [release](https://github.com/Azentrius/cockpit-image-update-monitor/releases) has the `.deb`, the `.rpm`, `SHA256SUMS` and a signed build provenance:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify <file> --repo Azentrius/cockpit-image-update-monitor
```

Supported systems, openSUSE and uninstalling: see the [README](https://github.com/Azentrius/cockpit-image-update-monitor#install-update-uninstall).
