---
slug: cockpit-cronjobs
lang: de
title: Cron Jobs für Cockpit – Cronjobs und systemd-Timer verwalten
description: "Cockpit-Seite für cron: alle Cronjobs und systemd-Timer an einem Ort, sichere Crontab-Änderungen, Ergebnis jedes Laufs, Umwandeln in systemd-Timer."
eyebrow: Cockpit-Add-on
h1: Cron Jobs für Cockpit
lead: "Alles, was auf einem Server geplant ist, auf einer Cockpit-Seite: sichere Änderungen an der Crontab, das Ergebnis jedes Laufs, Jetzt ausführen und Umwandeln in systemd-Timer."
summary: Alle Cronjobs und systemd-Timer auf einer Cockpit-Seite, mit sicheren Änderungen, Laufhistorie und Umwandeln in Timer.
platforms: ["Cockpit", "Debian & Ubuntu", "Fedora & RHEL", "openSUSE"]
problemTitle: Cron arbeitet leise. Zu leise.
problem:
  - "Auf Servern ohne Mailprogramm geht die Ausgabe von cron verloren: Ein Job, der scheitert, scheitert ohne ein Wort."
  - "Ein Job läuft in der Shell, aber nicht in cron, weil cron ihm eine andere Umgebung gibt."
  - "Dateien in /etc/cron.d werden still übersprungen, wenn Name, Besitzer oder Rechte nicht passen."
features:
  - title: Alles an einem Ort
    text: "Die Crontab von root, /etc/crontab, /etc/cron.d, die Crontabs anderer Benutzer, die periodischen Skripte und systemd-Timer. Zeitpläne in Worten, und Dateien, die cron überspringen würde, mit dem Grund markiert."
  - title: Die nächsten 24 Stunden
    text: "Eine Zeitleiste aller Cronjobs und Timer. Jobs, die in derselben Minute starten, werden hervorgehoben."
  - title: Sichere Änderungen
    text: "Zeilen, die du nicht anfasst, bleiben byte-genau. Jede Änderung ist ein gesperrter Schritt, nur wenn die Crontab noch die angezeigte ist, nach einem Backup, und wird danach zurückgelesen."
  - title: Das Ergebnis jedes Laufs
    text: "Mit eingeschalteter Aufzeichnung behält ein Job Exitcode, Dauer und Ausgabe seiner letzten 20 Läufe, auch ohne Mail. Timer zeigen ihre Läufe aus dem Journal."
  - title: Jetzt ausführen
    text: "Startet einen Job sofort mit der Umgebung, die cron ihm auf diesem Server gibt, zeigt die Ausgabe live und kann ihn stoppen."
  - title: In einen systemd-Timer und zurück
    text: "Legt Service und Timer mit demselben Zeitplan an, geprüft mit systemd-analyze. „Zurück zu cron“ macht es in einem Schritt rückgängig."
security:
  - "Befehle gehen als Argumente an Programme, nie als Shell-Code."
  - "Eine Crontab wird nur ersetzt, wenn sie noch exakt der angezeigten Fassung entspricht; vorher entsteht ein Backup."
  - "Das Umwandeln bricht ab, wenn systemd den Job zu anderen Zeiten ausführen würde als cron."
  - "Änderungen brauchen Administratorrechte in Cockpit. Ohne sie zeigt die Seite die System-Crontabs und Timer und nichts von anderen Benutzern."
requirements:
  - "Cockpit (getestet mit 360 und 362)"
  - "cron unter Debian und Ubuntu oder cronie unter Fedora, RHEL und Nachbauten, Arch und openSUSE"
  - "systemd, optional: für Timer, ihre Einträge in der Zeitleiste und das Umwandeln"
faq:
  - q: Funktioniert es ohne systemd?
    a: "Ja. systemd braucht es nur für Timer, ihre Einträge in der Zeitleiste und das Umwandeln."
  - q: Welche Distributionen werden unterstützt?
    a: "Debian und Ubuntu mit cron; Fedora, RHEL und Nachbauten, Arch und openSUSE mit cronie."
  - q: Kann ich die Crontabs anderer Benutzer bearbeiten?
    a: "Ja, mit Administratorrechten in Cockpit. Sie werden über crontab -u geändert und bekommen eigene Backups."
  - q: Was passiert mit Zeilen, die ich nicht anfasse?
    a: "Sie bleiben byte-genau. Vor jeder Änderung entsteht ein Backup der vorigen Fassung."
  - q: Wie werden Läufe aufgezeichnet?
    a: "Über ein kleines Skript, das die letzten 20 Läufe mit bis zu 64 KiB Ausgabe speichert. Mail von cron funktioniert weiter."
  - q: Kann ich von einem systemd-Timer zurück zu cron?
    a: "Ja. „Zurück zu cron“ macht das Umwandeln in einem Schritt rückgängig: Die Zeile ist wieder genau wie vorher aktiv, Timer und Units sind entfernt."
compare: "Cockpit verwaltet systemd-Timer unter „Dienste“, hat aber keine Seite für cron. Allgemeine Web-Oberflächen wie Crontab UI laufen als eigener Dienst mit eigenem Port und Login; Cron Jobs nutzt die Anmeldung und die Administratorrechte von Cockpit."
alt:
  overview: "Cron Jobs in Cockpit: die letzten Ergebnisse, die nächsten 24 Stunden und die Crontab von root"
  run-now: "Jetzt ausführen: ein Job, gestartet mit der Umgebung von cron, mit Ausgabe und Ergebnis"
  runs: "Aufgezeichnete Läufe eines Jobs: Start, Auslöser, Dauer und Ergebnis, mit der Ausgabe eines fehlgeschlagenen Laufs"
  convert: "Umwandeln eines Cronjobs in einen systemd-Timer: Name, mit systemd-analyze geprüfter Zeitplan und die neuen Units"
  backups: "Backups der Crontab von root, jeweils mit den Zeilen, die das Wiederherstellen entfernen und hinzufügen würde"
primaryAction:
  label: Installieren
  href: "#install"
updated: 2026-10-19
---

### Aus der Azentrius-Paketquelle

Für Debian, Ubuntu, Fedora und RHEL. Richte die Paketquelle einmal ein:

```sh
# Debian und Ubuntu
curl -fsSLO https://packages.azentrius.com/azentrius-repository.deb
sudo apt install ./azentrius-repository.deb
sudo apt update

# Fedora und RHEL
sudo rpm --import https://packages.azentrius.com/azentrius.asc
sudo dnf install https://packages.azentrius.com/azentrius-repository.rpm
```

Installiere dann **Cron Jobs** in Cockpit unter **Anwendungen** oder auf der Konsole:

```sh
sudo apt install cockpit-cronjobs    # Debian, Ubuntu
sudo dnf install cockpit-cronjobs    # Fedora, RHEL
```

Die Updates deines Systems halten es aktuell.

### Aus den Dateien eines Releases

Unter openSUSE ist das der einzige Weg. Jedes [Release](https://github.com/Azentrius/cockpit-cronjobs/releases) enthält `.deb`, `.rpm`, `SHA256SUMS` und einen signierten Build-Nachweis. Prüfe beides vor der Installation:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify <datei> --repo Azentrius/cockpit-cronjobs
```

Einzelheiten, auch zu openSUSE, stehen im [README](https://github.com/Azentrius/cockpit-cronjobs#installation).
