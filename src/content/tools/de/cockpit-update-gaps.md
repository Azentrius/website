---
slug: cockpit-update-gaps
lang: de
title: "Update Gaps: fehlende Updates und warum (Cockpit)"
description: "Cockpit-Add-on: wo einem Server Updates fehlen, obwohl Software-Updates keine zeigt, etwa gehaltene Pakete oder Fixes nur mit Ubuntu Pro, und warum."
eyebrow: Cockpit-Add-on
h1: Die Updates finden, die Software-Updates nicht anzeigt
lead: "Gehaltene Pakete, Fixes nur mit Ubuntu Pro, ein ausstehender Neustart, ein Kernel-Update, dem in /boot der Platz ausging: Zu jedem Befund sagt die Seite, was fehlt, woher die Angabe stammt, warum Software-Updates in Cockpit es nicht zeigt und was du tun kannst."
summary: Wo einem Server Updates fehlen, obwohl Software-Updates keine zeigt, und zu jedem Befund, warum und was du tun kannst.
platforms: ["Cockpit", "Debian 12+", "Ubuntu 22.04+"]
problemTitle: Keine Updates heißt nicht aktuell.
problem:
  - "Ein gehaltenes Paket aktualisiert apt nie, und Software-Updates listet es nicht."
  - "Ist der letzte Signaturschlüssel einer Paketquelle abgelaufen, liest apt diese Quelle nicht mehr, und ihre Updates fallen aus jeder Liste. Nur apt update warnt."
  - "Ein Kernel-Update, dem in /boot der Platz ausgeht, bleibt auf halbem Weg stehen und lässt dpkg halb fertig zurück. Software-Updates meldet nur, dass es gescheitert ist."
features:
  - title: Was Software-Updates auslässt
    text: "Gehaltene Pakete, Fixes nur mit Ubuntu Pro, ein ausstehender Neustart, CPU-Schwachstellen laut Kernel, Firmware (mit fwupd), Snaps, die nicht aktualisiert werden, Pakete ohne Paketquelle, Backports, Software außerhalb des Paketmanagers und das Ende der Unterstützung."
  - title: Wenn die Pflege schiefging
    text: "Pakete, die dpkg halb fertig liegen ließ, zu wenig Platz in /boot für den nächsten Kernel, abgelaufene Signaturschlüssel, alte Paketlisten, schrittweise verteilte Updates, an denen Software-Updates scheitert, und was der letzte Lauf der automatischen Updates getan hat."
  - title: Warum, und was du tun kannst
    text: "Jede Karte sagt, warum Software-Updates es nicht zeigt, was du tun kannst und woher die Daten stammen. Befehle stehen zum Kopieren für ein Terminal bereit; die Seite installiert nichts."
  - title: Seit wann
    text: "Ein Befund, den schon eine frühere Prüfung sah, sagt, seit wann es ihn gibt. Die Seite sagt immer, wie alt ihre Daten sind und wann apt zuletzt seine Paketlisten aktualisiert hat."
  - title: Für eine Weile quittieren
    text: "Mit Administratorrechten lässt sich ein Befund, der so sein soll, bis zu einem Tag deiner Wahl quittieren, höchstens 90 Tage im Voraus, auf Wunsch mit Grund. Die Seite zeigt ihn weiter; der Status zählt ihn nicht mehr."
  - title: Netzdaten, wenn du willst
    text: "Einmal eingerichtet, holt ein Dienst ohne Root-Rechte einmal am Tag Sicherheitslücken, die Ubuntu noch nicht behoben hat, Fixes, die die Projekte selbst veröffentlicht haben, und neuere Versionen anderswo in Ubuntu."
explainer:
  title: Warum Software-Updates sie nicht zeigt
  intro: "Einige der Bereiche, die das Add-on prüft, und warum Software-Updates in Cockpit sie übersieht. Ein leerer Abschnitt heißt nie „sicher“: Die Seite nennt, was sie nicht geprüft hat."
  head: ["Bereich", "Warum Software-Updates es nicht zeigt"]
  rows:
    - ["Gehaltene Pakete", "Ein gehaltenes Paket aktualisiert apt nie, und PackageKit listet es nicht."]
    - ["Fixes nur mit Ubuntu Pro", "Ohne Ubuntu Pro hat apt keine Quelle für esm-apps und esm-infra."]
    - ["Neustart ausstehend", "Unter Debian und Ubuntu sagt Cockpit nicht, wann ein Neustart aussteht."]
    - ["Schrittweise verteilte Updates (Ubuntu)", "Software-Updates listet sie, aber die Installation scheitert an ihnen und an jedem anderen Update, das mit ihnen kommt."]
    - ["Signaturschlüssel der Paketquellen", "Ist der letzte Schlüssel einer Quelle abgelaufen, liest apt sie nicht mehr; nur apt update warnt."]
    - ["Ende der Unterstützung", "Cockpit zeigt nicht, wann ein Release keine Updates mehr bekommt."]
security:
  - "Nur lesend: Die Prüfung führt nie apt update aus und installiert, entfernt oder startet nichts neu. Die Seite kann nur die eigene regelmäßige Prüfung und die Netzdaten ein- und ausschalten und Befunde quittieren."
  - "Jede Prüfung läuft als gehärteter systemd-Dienst ohne Netzwerkzugang, auch wenn du auf „Aktualisieren“ klickst."
  - "Netzdaten gibt es erst, wenn du sie einrichtest, von einem eigenen Dienst ohne Root-Rechte. Was den Server verlässt: der Name des Release, die Namen ausgewählter Quellpakete und welche aus einer festen Liste von Projekten installiert sind."
  - "Zugangsdaten in den Adressen der Paketquellen werden aus dem Zustand entfernt, den jeder lokale Benutzer lesen kann."
  - "Der Browser stellt keine externen Anfragen: Die Schriften liefert das Add-on mit."
requirements:
  - "Debian 12 oder neuer oder Ubuntu 22.04 oder neuer, mit systemd"
  - "Cockpit 264 oder neuer"
  - "Python 3.8 oder neuer (nur die Standardbibliothek)"
  - "Optional, genutzt, wenn vorhanden: needrestart, ubuntu-pro-client, distro-info-data, unattended-upgrades, gpg, fwupd"
faq:
  - q: Installiert es Updates?
    a: "Nein. Es liest nur. Wo eine Karte Befehle nennt, sind sie zum Kopieren in ein Terminal gedacht."
  - q: Heißt eine leere Seite, dass der Server sicher ist?
    a: "Nein. Ein leerer Abschnitt heißt nie „sicher“: Die Seite sagt immer, was sie nicht geprüft hat, was ausgelassen wurde und wie alt ihre Daten sind."
  - q: Welche Systeme prüft es?
    a: "Debian 12 und neuer und Ubuntu 22.04 und neuer. Fedora, RHEL und openSUSE werden noch nicht geprüft, und die Paketquelle bietet das Add-on nur für Debian und Ubuntu an."
  - q: Sendet es Daten irgendwohin?
    a: "Nur wenn du die Netzdaten einrichtest. Dann geht einmal am Tag der Name des Release an die Sicherheitsdaten von Canonical, die Namen ausgewählter Quellpakete an Launchpad und welche aus einer festen Liste von Projekten installiert sind an GitHub."
  - q: Kann ich einen bekannten Befund ausblenden?
    a: "Ja, mit Administratorrechten: Quittiere ihn bis zu einem Tag höchstens 90 Tage im Voraus. Er bleibt auf der Seite und zählt nach diesem Tag wieder, oder sobald er sich auf eine Weise ändert, die zählt. Manche Befunde, etwa ein ausstehender Neustart, lassen sich nicht quittieren."
  - q: Prüft es Container-Images?
    a: "Nein. Image Update Monitor zeigt die Versionen deiner Container."
  - q: Brauche ich es auf jedem Server?
    a: "Ja, auf jedem Server, den du in Cockpit ansiehst, auch hinter einer Cockpit-Bastion. Status Board zeigt den Zustand aller auf einer Seite."
compare: "Software-Updates vergleicht die installierten Pakete mit den Paketquellen. Update Gaps sieht sich an, was dieser Vergleich auslässt, und den Zustand des Systems drumherum. Es ändert von sich aus nichts. Container-Images sind Sache von Image Update Monitor, was von wo erreichbar ist, die von Security Monitor."
alt:
  overview: "Update Gaps in Cockpit: Befunde in sieben Bereichen auf einem Server mit gehaltenen Paketen, Fixes nur mit Ubuntu Pro und einem ausstehenden Neustart"
  upkeep: "Pflege, die schiefging: ein Kernel-Paket, das dpkg halb konfiguriert liegen ließ, und zu wenig Platz in /boot, mit den Befehlen, die es abschließen"
  accepted: "Gehaltene Docker-Pakete, quittiert bis zum Wartungsfenster: weiter sichtbar, im Status nicht mehr gezählt"
primaryAction:
  label: Update Gaps installieren
  href: "#install"
updated: 2026-10-23
---

### Aus der Azentrius-Paketquelle

Für Debian und Ubuntu. Richte die Paketquelle einmal ein:

```sh
curl -fsSLO https://packages.azentrius.com/azentrius-repository.deb
sudo apt install ./azentrius-repository.deb
sudo apt update
```

Installiere dann **Update Gaps** in Cockpit unter **Anwendungen** oder auf der Konsole:

```sh
sudo apt install cockpit-update-gaps
```

Die Updates deines Systems halten es aktuell. Installiere es auf jedem Server, den du in Cockpit ansiehst, und öffne die Seite einmal mit Administratorrechten: Sie prüft den Server dann von selbst. Richte dort die regelmäßige Prüfung ein und, wenn du willst, die Netzdaten.

### Aus den Dateien eines Releases

Jedes [Release](https://github.com/Azentrius/cockpit-update-gaps/releases) enthält das `.deb`, `SHA256SUMS` und einen signierten Build-Nachweis. Prüfe beides vor der Installation:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify cockpit-update-gaps_X.Y.Z-1_all.deb --repo Azentrius/cockpit-update-gaps
sudo apt install ./cockpit-update-gaps_X.Y.Z-1_all.deb
```

Unterstützte Systeme, Einstellungen und Deinstallation: siehe [README](https://github.com/Azentrius/cockpit-update-gaps#install-update-uninstall).
