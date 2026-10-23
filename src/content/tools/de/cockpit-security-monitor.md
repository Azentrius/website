---
slug: cockpit-security-monitor
lang: de
title: "Security Monitor: was ist von wo erreichbar (Cockpit)"
description: "Cockpit-Add-on: welche Ports Internet, VPN oder privates Netz erreichen, auch Docker-Ports an UFW vorbei, wer sich anmeldet und was Container schwächt."
eyebrow: Cockpit-Add-on
h1: Was von wo erreichbar ist, wer hereinkommt, was die Container schwächt
lead: "Für jeden Port: ob eine neue Verbindung aus dem Internet, dem VPN, dem privaten Netz oder nur vom Server selbst hereinkommt, für IPv4 und IPv6, und welche Regel entscheidet. Es liest UFW, nftables und iptables und die Ports, die Docker an UFW vorbei weiterleitet."
summary: Je Port, von wo er erreichbar ist und welche Regel entscheidet, dazu SSH, Anmeldungen, Container-Härtung, CrowdSec und fail2ban.
platforms: ["Cockpit", "Debian 12+", "Ubuntu 22.04+"]
problemTitle: UFW ist an, und der Port ist trotzdem offen.
problem:
  - "Docker leitet die Ports, die es veröffentlicht, an UFW vorbei: Eine Regel, die den Port sperrt, erreicht den Container dahinter nicht."
  - "Die Firewall-Seite von Cockpit zeigt weder UFW noch die Ports, die Docker daran vorbei weiterleitet."
  - "Ein fail2ban-Jail, das nur bei INPUT sperrt, erreicht keinen Port, den Docker an einen Container weiterleitet."
features:
  - title: Erreichbarkeit je Port
    text: "Jeder lauschende Socket und jeder Port, den Docker veröffentlicht: erreichbar aus dem Internet, dem VPN, dem privaten Netz oder nur von diesem Host, je IPv4 und IPv6, mit der Regel oder Richtlinie, die entscheidet."
  - title: SSH-Konfiguration und Schlüssel
    text: "Die wirksame Konfiguration, wie sshd -T sie ausgibt, und die autorisierten Schlüssel jedes Kontos mit Login-Shell: Typ, Größe, Fingerabdruck, Kommentar und Optionen."
  - title: Anmeldungen der letzten 14 Tage
    text: "Erfolgreiche Anmeldungen mit Quelle, Konto und Methode und fehlgeschlagene Versuche je Quelle, aus dem Journal. Eine Anmeldung von außerhalb des VPN und der privaten Netze ist eine Warnung."
  - title: Container-Härtung
    text: "Der eingebundene Docker-Socket, privilegierte Container, Host-PIDs, zusätzliche Capabilities, beschreibbare Host-Ordner, das Host-Netz und Container, die als root oder ohne no-new-privileges laufen."
  - title: CrowdSec und fail2ban
    text: "Wenn installiert: Dienst, Bouncer und Entscheidungen von CrowdSec; bei fail2ban, was jedes Jail beobachtet, wen es sperrt und wo eine Sperre nicht greift."
  - title: Als erwartet markiert
    text: "Ein Port, der öffentlich sein soll, oder ein Container, der den Docker-Socket braucht, lässt sich mit einer Notiz als erwartet markieren. Er bleibt sichtbar und hebt den Zustand nicht mehr an."
explainer:
  title: Wie es einen Port bewertet
  intro: "„In Ordnung“ heißt, dass in dem, was die Seite prüft, nichts gefunden wurde, nie, dass der Server sicher ist. Was sie nicht lesen kann, ist „Nicht beurteilbar“, nie „In Ordnung“."
  head: ["Port", "Bewertung"]
  rows:
    - ["Eine Datenbank, die Docker-API, Cockpit oder SSH offen zum Internet", "Gefahr"]
    - ["Alles andere, das offen zum Internet ist", "Achtung, bis du es als erwartet markierst"]
    - ["Web (80, 443), WireGuard, der DHCP-Client", "Hinweis"]
    - ["Nur von manchen Adressen erreichbar", "Hinweis"]
    - ["Von der Hetzner Cloud Firewall gesperrt (optional, mit einem Token nur zum Lesen)", "In Ordnung"]
    - ["Von einer Regel entschieden, die die Seite nicht lesen kann", "Nicht beurteilbar"]
security:
  - "Nur lesend: Es ändert keine Firewall-Regel und nichts an CrowdSec oder fail2ban. Die Seite ändert nur die eigene regelmäßige Prüfung und die eigene Liste der als erwartet markierten Befunde."
  - "Die Prüfung läuft als root ohne Netzwerkzugang außer dem Loopback, mit eingeschränkten Capabilities, und schreibt nur ihren eigenen Ordner."
  - "Docker wird nur mit GET gefragt, fail2ban nur, was es ausführt und wen es sperrt."
  - "Das Hetzner-Token nutzt ein eigener Dienstbenutzer; es erreicht nie Code, der als root läuft, und nie den Browser."
  - "Adressen, Benutzernamen und Schlüsselkommentare liegen in einer Datei, die nur root lesen kann. Das Status Board sieht Zahlen, Zustände, Ports und die Namen von Diensten, Containern und Jails."
requirements:
  - "Debian 12 oder neuer oder Ubuntu 22.04 oder neuer, mit systemd"
  - "Cockpit 264 oder neuer"
  - "Python 3.8 oder neuer (nur die Standardbibliothek) und iproute2"
  - "Gelesen, wenn vorhanden: iptables, nftables, UFW, Docker, OpenSSH, CrowdSec, fail2ban"
faq:
  - q: Ändert es Firewall-Regeln?
    a: "Nein. Die Seite sagt, welche Regel fehlt; du setzt sie von Hand."
  - q: Warum ist ein Port offen, obwohl UFW an ist?
    a: "Docker leitet die Ports, die es veröffentlicht, an UFW vorbei. Die Seite folgt dem Paketfilter nach Dockers DNAT und nennt die Regel, die entscheidet."
  - q: Heißt „In Ordnung“, dass der Server sicher ist?
    a: "Nein. Es heißt, dass in dem, was die Seite prüft, nichts gefunden wurde. Jeder Reiter sagt, was er nicht prüft, etwa Firewalls außerhalb des Servers, ausgehende Verbindungen und Schwachstellen in Images."
  - q: Welche Systeme werden unterstützt?
    a: "Debian 12 und neuer und Ubuntu 22.04 und neuer. Fedora, RHEL und openSUSE werden noch nicht unterstützt, und die Paketquelle bietet das Add-on nur für Debian und Ubuntu an."
  - q: Was ist mit Cloud-Firewalls?
    a: "Die Hetzner Cloud Firewall liest es mit einem optionalen API-Token, das nur lesen darf. Andere Cloud-Firewalls, Router und Portweiterleitungen außerhalb des Servers werden nicht geprüft."
  - q: Kann es Sperren von fail2ban aufheben?
    a: "Noch nicht. Es zeigt fail2ban; Jails einrichten und Sperren aufheben folgen in einer späteren Version."
compare: "Die Firewall-Seite von Cockpit zeigt weder UFW noch die Ports, die Docker daran vorbei weiterleitet. Security Monitor folgt jeder Regel, die eine neue Verbindung durchläuft, und sagt, von wo jeder Port erreichbar ist. Es liest nur: Die Seite nennt eine fehlende Regel, du setzt sie. Fehlende Updates sind Sache von Update Gaps, Container-Versionen die von Image Update Monitor."
alt:
  exposure: "Security Monitor in Cockpit: die Übersicht und jeder Port mit seiner Erreichbarkeit, ein Docker-Port an UFW vorbei offen zum Internet"
  ssh: "SSH: die wirksame Konfiguration, wie sshd -T sie ausgibt, jede Einstellung bewertet, darunter die autorisierten Schlüssel"
  containers: "Container: was ihre Grenze zum Host schwächt, vom eingebundenen Docker-Socket bis AppArmor ohne Profil"
  mark-dialog: "Port 8080/tcp mit einer Notiz als erwartet markieren: Die Seite schreibt nur ihre eigene Datei, nie eine Firewall-Regel"
primaryAction:
  label: Security Monitor installieren
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

Installiere dann **Security Monitor** in Cockpit unter **Anwendungen** oder auf der Konsole:

```sh
sudo apt install cockpit-security-monitor
```

Die Updates deines Systems halten es aktuell. Installiere es auf jedem Server, den du in Cockpit ansiehst, und öffne die Seite einmal mit Administratorrechten: Sie prüft den Server dann von selbst. Richte dort die regelmäßige Prüfung ein, damit der Zustand und das Status Board aktuell bleiben.

### Aus den Dateien eines Releases

Jedes [Release](https://github.com/Azentrius/cockpit-security-monitor/releases) enthält das `.deb`, `SHA256SUMS` und einen signierten Build-Nachweis. Prüfe beides vor der Installation:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify cockpit-security-monitor_X.Y.Z-1_all.deb --repo Azentrius/cockpit-security-monitor
sudo apt install ./cockpit-security-monitor_X.Y.Z-1_all.deb
```

Die Hetzner Cloud Firewall, Markierungen von Hand und die Deinstallation: siehe [README](https://github.com/Azentrius/cockpit-security-monitor#install).
