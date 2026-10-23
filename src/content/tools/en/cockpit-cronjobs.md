---
slug: cockpit-cronjobs
lang: en
title: "Cron Jobs: manage cron and systemd timers in Cockpit"
description: "Open-source Cockpit page for cron: every job and systemd timer in one place, safe crontab edits, run history, run now, convert to systemd timers."
eyebrow: Cockpit add-on
h1: Manage cron jobs and systemd timers in Cockpit
lead: "Everything scheduled on a server, on one Cockpit page: safe crontab edits, the result of every run, run now, and conversion to systemd timers."
summary: Every cron job and systemd timer on one Cockpit page, with safe edits, run history and conversion to timers.
platforms: ["Cockpit", "Debian & Ubuntu", "Fedora & RHEL", "openSUSE"]
problemTitle: Cron works quietly. Too quietly.
problem:
  - "On servers without a mail program, cron's output is lost: a job that fails, fails without a word."
  - "A job runs in the shell but not in cron, because cron gives it a different environment."
  - "Files in /etc/cron.d are skipped silently when their name, owner or permissions do not fit."
features:
  - title: Everything in one place
    text: "The root crontab, /etc/crontab, /etc/cron.d, other users' crontabs, the periodic scripts and systemd timers. Schedules in words, and files cron would skip marked with the reason."
  - title: The next 24 hours
    text: "A timeline of all cron jobs and timers. Jobs that start in the same minute are pointed out."
  - title: Safe changes
    text: "Lines you do not touch stay byte for byte. Each change is one locked step, only if the crontab is still the one you see, after a backup, and read back afterwards."
  - title: The result of every run
    text: "Turn on recording and a job keeps exit code, duration and output of its last 20 runs, also on servers without mail. Timers show their runs from the journal."
  - title: Run now
    text: "Starts a job right away with the environment cron gives it on this server, shows the output live and can stop it."
  - title: To a systemd timer and back
    text: "Creates a service and a timer with the same schedule, checked against systemd-analyze. Back to cron undoes it in one step."
security:
  - "Commands go to programs as arguments, never as shell code."
  - "A crontab is replaced only if it is still exactly the version on screen; a backup of the previous version comes first."
  - "A conversion stops if systemd would run the job at other times than cron."
  - "Changes need administrative access in Cockpit. Without it, the page shows the system crontabs and timers and nothing of other users."
requirements:
  - "Cockpit (tested with 360 and 362)"
  - "cron on Debian and Ubuntu, or cronie on Fedora, RHEL and its rebuilds, Arch and openSUSE"
  - "systemd, optional: for timers, their timeline entries and the conversion"
faq:
  - q: Does it work without systemd?
    a: "Yes. systemd is needed only for timers, their entries in the timeline and the conversion."
  - q: Which distributions are supported?
    a: "Debian and Ubuntu with cron; Fedora, RHEL and its rebuilds, Arch and openSUSE with cronie."
  - q: Can I edit other users' crontabs?
    a: "Yes, with administrative access in Cockpit. They are changed through crontab -u and get backups of their own."
  - q: What happens to lines I don't touch?
    a: "They stay byte for byte. Before every change, a backup of the previous version is written."
  - q: How are runs recorded?
    a: "Through a small wrapper that keeps the last 20 runs with up to 64 KiB of output each. Mail from cron keeps working."
  - q: Can I go back from a systemd timer to cron?
    a: "Yes. Back to cron undoes the conversion in one step: the line is on again exactly as before, and the timer and its units are removed."
compare: "Cockpit manages systemd timers under Services but has no page for cron. General web interfaces such as Crontab UI run as a service of their own, with their own port and login; Cron Jobs uses Cockpit's login and administrative access."
alt:
  overview: "Cron Jobs in Cockpit: the latest results, the next 24 hours and the root crontab"
  run-now: "Run now: a job started with cron's environment, its output and result"
  runs: "Recorded runs of a job: start, who started it, duration and result, with the output of a failed run"
  convert: "Converting a cron job to a systemd timer: name, schedule checked with systemd-analyze and the units it creates"
  backups: "Backups of the root crontab, each with the lines restoring it would remove and add"
primaryAction:
  label: Install Cron Jobs
  href: "#install"
updated: 2026-10-23
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

Then install **Cron Jobs** in Cockpit under **Applications**, or on the console:

```sh
sudo apt install cockpit-cronjobs    # Debian, Ubuntu
sudo dnf install cockpit-cronjobs    # Fedora, RHEL
```

The system's updates keep it current.

### From the files of a release

On openSUSE this is the only way. Every [release](https://github.com/Azentrius/cockpit-cronjobs/releases) has the `.deb`, the `.rpm`, `SHA256SUMS` and a signed build provenance. Check both before you install:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify <file> --repo Azentrius/cockpit-cronjobs
```

The [README](https://github.com/Azentrius/cockpit-cronjobs#installation) has the details, including openSUSE.
