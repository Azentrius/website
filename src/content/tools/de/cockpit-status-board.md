---
slug: cockpit-status-board
lang: de
title: "Status Board: Add-ons aller Hosts auf einer Cockpit-Seite"
description: "Cockpit-Seite für den Host, der die anderen erreicht: eine Zeile je Host des Host-Umschalters, eine Kachel je Azentrius-Add-on. Nur lesend."
eyebrow: Cockpit-Add-on
h1: Der Zustand aller Hosts auf einer Seite
lead: "Eine Zeile je Host des Host-Umschalters von Cockpit, eine Kachel je Azentrius-Add-on, etwa Cron Jobs, Image Update Monitor, Update Gaps und Security Monitor. Es gehört auf den Cockpit-Host, von dem aus die anderen erreicht werden, und liest nur; ein Klick auf eine Kachel öffnet das Add-on auf seinem Host."
summary: Der Zustand der Azentrius-Add-ons auf jedem Host des Host-Umschalters von Cockpit, eine Zeile je Host, eine Kachel je Add-on.
platforms: ["Cockpit", "Debian & Ubuntu", "Fedora & RHEL"]
problemTitle: Jedes Add-on auf jedem Host ist eine eigene Seite.
problem:
  - "Jedes Add-on zeigt seinen Zustand auf seinem eigenen Host. Um alles zu sehen, öffnest du jedes Add-on auf jedem Host."
  - "Ein Add-on, das auf einem Host fehlt, oder ein Update, das dort vergessen wurde, übersieht man leicht."
  - "Ein Host, der nicht antwortet, sollte das sagen, statt unauffällig auszusehen."
features:
  - title: Eine Zeile je Host
    text: "In der Reihenfolge des Host-Umschalters, dieser Host zuerst, mit dem schwersten Zustand seiner Add-ons oder dem Grund, warum sich der Host nicht lesen lässt."
  - title: Eine Kachel je Add-on
    text: "Sein Zustand, seine wichtigste Zahl, seine Zusammenfassung und das Alter seiner Daten. Ein Klick öffnet das Add-on auf seinem Host."
  - title: Lücken fallen auf
    text: "Die Kacheln stehen auf jedem Host in derselben Reihenfolge: Ein Add-on, das auf einem Host fehlt, bekommt dort eine Kachel „Nicht installiert“, und eine Kachel sagt, wenn auf einem anderen Host eine neuere Version läuft."
  - title: Jeder Eintrag
    text: "Alle Einträge eines Add-ons klappen in einer Tabelle unter der Zeile auf. Ein Eintrag mit einer Stelle im Add-on öffnet es dort."
  - title: Nur Auffälliges
    text: "Ein Schalter in der Kopfzeile blendet die Kacheln aus, die keine Aufmerksamkeit brauchen. Der Browser merkt sich die Wahl."
  - title: Aktuell ohne dein Zutun
    text: "Es lädt beim Öffnen, bei „Aktualisieren“ und alle 5 Minuten, solange die Seite sichtbar ist. Daten, die älter sind, als das Add-on erlaubt, machen die Kachel zur Warnung."
explainer:
  title: Was eine Kachel sagen kann
  intro: "Eine Kachel „In Ordnung“ heißt, dass das Add-on in dem, was es prüft, nichts gefunden hat, nicht, dass der Host sicher ist."
  head: ["Anzeige", "Bedeutung"]
  rows:
    - ["In Ordnung, Hinweis, Achtung, Problem, Unbekannt", "Der Zustand des Add-ons selbst, in der Statussprache, die alle Azentrius-Add-ons teilen"]
    - ["Nicht installiert", "Das Add-on läuft auf einem anderen Host, aber nicht auf diesem"]
    - ["Kein Status", "Die Version des Add-ons auf diesem Host kennt den Status-Vertrag noch nicht"]
    - ["Kein Zugriff", "Ohne Administratorzugriff auf diesem Host hat das Add-on nichts zu melden"]
    - ["Status nicht lesbar", "Die Antwort passt nicht zum Vertrag; die Kachel nennt den Grund"]
    - ["Nicht erreichbar, Schlüssel gesperrt", "Der Host hat nicht geantwortet, oder der SSH-Schlüssel ist gesperrt"]
security:
  - "Nur lesend: Es führt den Status-Befehl jedes Add-ons aus, fragt nach keinen Administratorrechten und ändert auf keinem Host etwas."
  - "Status-Befehle laufen nur aus /usr/lib/cockpit-… und immer mit status --lang en oder de; andere Argumente aus einem Manifest werden ignoriert."
  - "Was ein Host sendet, sind Daten: gegen den Status-Vertrag geprüft und nur als Text gezeigt. Ein kompromittierter Host kann einen falschen Zustand melden, aber keinen Code in der Sitzung ausführen."
  - "Die Seite lädt nichts aus dem Netz: Schriften und Symbole bringt sie selbst mit."
requirements:
  - "Auf dem Host mit dem Board: Cockpit mit dem Host-Umschalter, entwickelt mit Cockpit 360"
  - "Um ein Add-on auf einem anderen Host per Klick zu öffnen: AllowMultiHost in Cockpit"
  - "Auf den anderen Hosts: cockpit-bridge, eine Anmeldung per SSH-Schlüssel und die Add-ons"
  - "Add-ons mit Status-Vertrag: Cron Jobs 2.8.1, Image Update Monitor 0.20.0, Update Gaps 0.1.0, Security Monitor 0.1.0 oder neuer"
faq:
  - q: Wo installiere ich es?
    a: "Auf dem Cockpit-Host, von dem aus die anderen erreicht werden, etwa einer Bastion. Die anderen Hosts brauchen nur die Add-ons."
  - q: Braucht es Administratorrechte auf den anderen Hosts?
    a: "Nein. Jedes Add-on meldet, was es ohne root lesen kann; für Hosts, die per Schlüssel erreicht werden, ist das der Normalfall."
  - q: Benachrichtigt es mich?
    a: "Nein. Es lädt nur, solange die Seite offen ist, und benachrichtigt niemanden."
  - q: Sucht es nach neuen Releases?
    a: "Nein. Es vergleicht die Versionen, die auf den Hosts laufen, miteinander, damit ein vergessenes Update auffällt."
  - q: Welche Hosts zeigt es?
    a: "Die aus der Liste des Host-Umschalters in /etc/cockpit/machines.d. Ein Host, der ohne Administratorrechte hinzugefügt wurde und den der Umschalter nur für eine Browsersitzung behält, steht nicht auf dem Board."
  - q: Speichert es Daten?
    a: "Nein, auf keinem Host. Nur der Browser merkt sich den Schalter „Nur Auffälliges“."
compare: "Status Board ist kein Monitoring-System: Es speichert keine Daten, verschickt keine Warnungen und lädt nur, solange die Seite offen ist. Es erreicht die Hosts über die eigenen SSH-Verbindungen des Host-Umschalters; sie brauchen nur cockpit-bridge, eine Anmeldung per Schlüssel und die Add-ons."
alt: {}
primaryAction:
  label: Status Board installieren
  href: "#install"
updated: 2026-10-23
---

Installiere das Board auf dem Host mit dem Host-Umschalter; die anderen Hosts brauchen nur die Add-ons.

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

Installiere dann **Status Board** in Cockpit unter **Anwendungen** oder auf der Konsole:

```sh
sudo apt install cockpit-status-board    # Debian, Ubuntu
sudo dnf install cockpit-status-board    # Fedora, RHEL
```

Die Updates deines Systems halten es aktuell. Status Board erscheint im Menü von Cockpit bei der Übersicht; wenn noch nicht, melde dich neu bei Cockpit an.

### Aus den Dateien eines Releases

Unter openSUSE ist das der einzige Weg. Jedes [Release](https://github.com/Azentrius/cockpit-status-board/releases) enthält `.deb`, `.rpm`, `SHA256SUMS` und einen signierten Build-Nachweis. Prüfe beides vor der Installation:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify <datei> --repo Azentrius/cockpit-status-board
```

Das `.rpm` eines Releases trägt keine Paketsignatur, deshalb braucht `zypper` die Option `--allow-unsigned-rpm`; die beiden Prüfungen treten an ihre Stelle. Einzelheiten stehen im [README](https://github.com/Azentrius/cockpit-status-board#install-update-uninstall).
