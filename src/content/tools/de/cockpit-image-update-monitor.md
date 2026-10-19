---
slug: cockpit-image-update-monitor
lang: de
title: "Image Update Monitor: Docker-Updates mit Rollback (Cockpit)"
description: "Konfigurierte, laufende und neueste Version jedes Docker-Containers. Updates aus Cockpit mit Datenbank-Dump vorab und Rollback per Klick."
eyebrow: Cockpit-Add-on
h1: Docker-Updates mit Plan und Rückweg
lead: "Für jeden laufenden Docker-Container: was die Compose-Datei sagt, welche Version wirklich läuft und welche die neueste ist. Updates aus Cockpit mit Datenbank-Dump vorab, einer Rollback-Kopie des alten Images und Rollback per Klick."
summary: Konfigurierte, laufende und neueste Version jedes Docker-Containers, und Updates mit Dump vorab und Rollback.
platforms: ["Cockpit", "Docker Compose v2", "Linux mit systemd"]
problemTitle: "latest ist keine Version."
problem:
  - "Ein Tag wie latest sagt nicht, welche Version läuft."
  - "Ein Update ohne Dump setzt die Datenbank aufs Spiel."
  - "Wer bewusst aktualisieren will, braucht vorher einen Plan und nachher einen Rückweg."
features:
  - title: Drei Versionen pro Container
    text: "Konfiguriert, installiert und neueste, die neueste unterteilt nach Patch, Minor und Major."
  - title: Zwei Wege zu Updates
    text: "Diun meldet neue Images desselben Tags; ein Versionsradar sucht alle sechs Stunden nach neueren Tags, ohne Images zu laden."
  - title: Update mit Plan
    text: "Bevor sich etwas ändert: welche Container neu erstellt werden, welche Datenbanken betroffen sind, was davon abhängt und wie viel Platz frei ist."
  - title: Dump vor jedem Update
    text: "Postgres, MariaDB und MySQL werden zuerst gesichert. Scheitert der Dump, stoppt das Update, bevor sich etwas ändert."
  - title: Rollback per Klick
    text: "Das alte Image bleibt als Rollback-Kopie erhalten; ein Klick setzt es zurück."
  - title: Version wechseln
    text: "Einen anderen Tag aus einer Liste wählen und jede Zeile sehen, die sich in der Compose- oder .env-Datei ändert. Die Dateien werden byte-genau kopiert und beim Rollback zurückgelegt."
explainer:
  title: Woher es die laufende Version kennt
  intro: "Ein Tag wie latest oder 16-alpine sagt nicht, was wirklich läuft. Das Add-on fragt vier Quellen; die erste, die passt, gilt."
  head: ["Quelle", "Beispiel"]
  rows:
    - ["Der Tag ist schon eine genaue Version", "v2.1.4 ist 2.1.4"]
    - ["Die Versionsvariable der App im Image", "PG_VERSION=16.14 hinter 16-alpine"]
    - ["Das Image-Label org.opencontainers.image.version, wenn es diese Version als Tag gibt", "rustdesk 1.1.15"]
    - ["Der Digest: welcher Versions-Tag der Registry genau auf das installierte Image zeigt", "ollama latest ist 0.30.11"]
security:
  - "Alles, was als root läuft, ist ein kleiner, fester Satz Hilfsskripte in einem Paketverzeichnis."
  - "Diun sieht Docker nur über einen lesenden Socket-Proxy."
  - "Der Browser stellt keine externen Anfragen."
  - "Dumps sind nur für root lesbar."
requirements:
  - "Linux mit systemd und Cockpit 264 oder neuer"
  - "Docker Engine mit dem Docker-Compose-Plugin 2.8 oder neuer"
  - "Python 3.8 oder neuer"
  - "skopeo für den Radar und Diun für Digest-Updates; beides richtet das Add-on auf Wunsch ein"
faq:
  - q: Aktualisiert es Container automatisch?
    a: "Nein. Jedes Update startet per Klick, nach einem Plan. Regeln für automatische Updates stehen als Idee in der Roadmap."
  - q: Stellt ein Rollback meine Daten wieder her?
    a: "Nein. Der Rollback setzt das alte Image zurück. Hat die neue Version die Datenbank schon migriert, hilft nur der Dump, und dessen Wiederherstellung ist bewusst manuell."
  - q: Brauche ich Diun?
    a: "Für neue Images desselben Tags ja; das Add-on richtet Diun auf Wunsch ein. Neue Versions-Tags findet der Radar mit skopeo."
  - q: Lädt es Images, um Updates zu finden?
    a: "Nein. Der Radar liest nur Tag-Listen; bei Docker Hub zählt das nicht gegen das Pull-Limit."
  - q: Funktioniert es mit Podman?
    a: "Nein, nur mit Docker und Compose v2. Auch Swarm, Kubernetes und rootless Docker werden nicht unterstützt."
  - q: Was passiert, wenn der Datenbank-Dump scheitert?
    a: "Dann stoppt das Update, bevor sich etwas ändert."
compare: "Image Update Monitor aktualisiert bewusst nicht von selbst: Du entscheidest, wann, mit Plan, Dump und Rückweg. Werkzeuge wie die Nachfolger von Watchtower aktualisieren automatisch; Diun benachrichtigt nur. Grenzen, offen benannt: nur Docker mit Compose v2, private Registries sieht der Radar nicht, und Major-Versionen von Datenbanken bleiben manuell."
alt:
  updates: "Image Update Monitor in Cockpit: jeder laufende Container mit konfigurierter, installierter und neuester Version"
  update-dialog: "Der Plan vor einem Update: was neu erstellt wird, installierte und neue Version, Rollback-Kopie und Datenbank-Dump"
  update-done: "Ein laufendes Update: Datenbank-Dump, Rollback-Kopie und die Ausgabe von Docker Compose, live"
  version-dialog: "Version eines Containers wechseln: der gewählte Tag, die Zeile, die sich in der Compose-Datei ändert, und der Plan"
  backups: "Backups und Dumps: Regeln für das Aufräumen und die Update-Historie mit Rollback-Knöpfen"
primaryAction:
  label: Image Update Monitor installieren
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

Installiere dann **Image Update Monitor** in Cockpit unter **Anwendungen** oder auf der Konsole:

```sh
sudo apt install cockpit-image-update-monitor    # Debian, Ubuntu
sudo dnf install cockpit-image-update-monitor    # Fedora, RHEL
```

Beim ersten Start bietet das Add-on an, skopeo und Diun einzurichten.

### Aus den Dateien eines Releases

Jedes [Release](https://github.com/Azentrius/cockpit-image-update-monitor/releases) enthält `.deb`, `.rpm`, `SHA256SUMS` und einen signierten Build-Nachweis:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify <datei> --repo Azentrius/cockpit-image-update-monitor
```

Unterstützte Systeme, openSUSE und Deinstallation: siehe [README](https://github.com/Azentrius/cockpit-image-update-monitor#install-update-uninstall).
