---
slug: cockpit-host-settings
lang: de
title: "Host Settings: Nachricht bei Warnung oder Gefahr (Cockpit)"
description: "Cockpit-Add-on je Server: eine Nachricht per ntfy, E-Mail oder beidem, wenn ein Azentrius-Add-on eine Warnung oder Gefahr findet und wenn sie behoben ist."
eyebrow: Cockpit-Add-on
h1: Eine Nachricht, wenn ein Add-on auf einem Server Aufmerksamkeit braucht
lead: "Was Cron Jobs, Image Update Monitor, Update Gaps, Security Monitor und andere Add-ons mit Status-Vertrag auf demselben Server melden, bewertet Host Settings wie das Status Board und schickt eine Nachricht per ntfy, E-Mail oder beidem, wenn ein Befund zur Warnung oder Gefahr wird und wenn er wieder in Ordnung ist."
summary: Eine Nachricht per ntfy, E-Mail oder beidem, wenn ein Befund eines Azentrius-Add-ons zur Warnung oder Gefahr wird und wenn er wieder in Ordnung ist.
platforms: ["Cockpit", "Debian & Ubuntu", "Fedora & RHEL"]
problemTitle: Eine Seite hilft nur, solange jemand hinsieht.
problem:
  - "Jedes Add-on zeigt seine Befunde auf seiner eigenen Seite. Das Status Board bringt sie auf eine Seite, lädt aber nur, solange seine Seite offen ist, und benachrichtigt niemanden."
  - "Eine Nachricht für jeden Zustand wäre nur Rauschen. Wichtig ist die Änderung: ein Befund, der zur Warnung oder Gefahr wird, und der Moment, in dem er wieder in Ordnung ist."
  - "Ein ntfy-Topic, das ohne Anmeldung offen ist, lässt jeden, der seinen Namen kennt, mitlesen, was auf deinem Server nicht stimmt."
features:
  - title: Änderungen, keine Zustände
    text: "Eine Nachricht, wenn ein Befund zur Warnung oder Gefahr wird, wenn aus einer Gefahr eine Warnung wird und wenn er wieder in Ordnung ist oder nicht mehr gemeldet wird. Auch ein zweiter Befund in einem Add-on, das schon eine Warnung zeigt, wird gemeldet."
  - title: Ruhe, wenn sich nichts ändert
    text: "Dieselbe Änderung desselben Befunds kommt höchstens einmal pro Stunde, und mehrere Änderungen eines Laufs kommen als eine Nachricht. Der erste Lauf nach dem Einrichten schickt eine Zusammenfassung dessen, was die Add-ons dann melden."
  - title: ntfy, E-Mail oder beides
    text: "Jeder ntfy-Server, mit Token oder ohne: Eine Gefahr kommt mit hoher Priorität, eine Warnung mit der normalen, „wieder in Ordnung“ mit niedriger. E-Mails gehen an den eigenen Mailserver des Servers auf localhost:25."
  - title: Verbindung prüfen
    text: "Die Seite prüft den Weg zu ntfy: Der Server antwortet, die Verbindung ist verschlüsselt, das Token darf senden, und das Topic ist für jeden ohne Anmeldung gesperrt, zum Lesen und auf Wunsch auch zum Senden."
  - title: Befehle für den ntfy-Server
    text: "Der Benutzer, sein Schreibrecht auf das Topic und das Token, das dieser Server braucht, fertig zum Kopieren. Den ntfy-Server selbst richtet Host Settings nicht ein."
  - title: Der eigene Zustand im Status Board
    text: "Ob Nachrichten eingerichtet sind, ob die letzte hinausging, ob das Topic gesperrt ist und wann der Notifier zuletzt lief: Das Status Board zeigt es, das Menü von Cockpit als Symbol."
explainer:
  title: Wann eine Nachricht kommt
  intro: "Host Settings prüft selbst nichts: Es meldet nur, was die Add-ons auf seinem Server berichten, alle 5 Minuten. Als Problem zählen nur Warnungen und Gefahren."
  head: ["Was passiert", "Nachricht"]
  rows:
    - ["Ein Befund wird zur Warnung oder Gefahr", "Ja; bei ntfy kommt eine Gefahr mit hoher Priorität"]
    - ["Aus einer Gefahr wird eine Warnung", "Ja"]
    - ["Ein Befund ist wieder in Ordnung oder wird nicht mehr gemeldet", "Ja, „wieder in Ordnung“, bei ntfy mit niedriger Priorität"]
    - ["Ein Eintrag ist älter, als sein Add-on erlaubt", "Ja: Er zählt als Warnung"]
    - ["Der Status eines Add-ons lässt sich nicht lesen", "Ja: Das Add-on selbst zählt als Warnung"]
    - ["Dieselbe Änderung desselben Befunds innerhalb einer Stunde", "Nein, nicht vor Ablauf der Stunde"]
    - ["Der erste Lauf nach dem Einrichten", "Eine Zusammenfassung dessen, was die Add-ons dann melden"]
security:
  - "Der Notifier läuft nie als root: Er läuft als eigener Systembenutzer, von systemd gehärtet, und darf nur seinen Zustand schreiben."
  - "Ein Status-Befehl läuft nur, wenn er unter /usr/lib/cockpit-NAME/ liegt und er und seine Ordner root gehören und niemand sonst sie ändern kann."
  - "Das ntfy-Token geht von der Seite über die Standardeingabe an das Hilfsprogramm, liegt in einer Datei, die nur root lesen kann, und erreicht den Notifier als systemd-Credential. Den Server verlässt es nur als Header einer Anfrage an den eingerichteten ntfy-Server; Weiterleitungen werden nicht verfolgt. Die Seite zeigt es nie."
  - "Eine Nachricht enthält nur, was die Add-ons melden, ihre Namen und den Namen des Servers. Was ein Add-on meldet, erreicht die Seite und die Nachrichten als Text, gekürzt und von Steuer- und Richtungszeichen bereinigt."
  - "Die Seite ändert nur über ihre Dialoge etwas, mit Administratorrechten. Senden ohne Anmeldung wird nur versucht, wenn du auf „Verbindung prüfen“ klickst; nimmt das Topic es an, ist genau diese Nachricht die Warnung."
  - "Die Seite lädt nichts aus dem Netz: Schriften und Symbole bringt sie selbst mit."
requirements:
  - "Cockpit 264 oder neuer"
  - "Python 3.8 oder neuer, systemd 247 oder neuer und ss (iproute2)"
  - "Für E-Mail: ein Mailserver, der auf localhost:25 Mail annimmt, etwa postfix oder exim"
  - "Für ntfy: ein ntfy-Server, den dieser Server erreicht"
  - "Add-ons mit Status-Vertrag, etwa Cron Jobs, Image Update Monitor, Update Gaps und Security Monitor"
faq:
  - q: Prüft es den Server selbst?
    a: "Nein. Es meldet nur, was die Add-ons auf seinem eigenen Server berichten, bewertet wie im Status Board. Einstellungen der anderen Add-ons hält es nicht; jedes behält seine eigenen."
  - q: Brauche ich es auf jedem Server?
    a: "Auf jedem Server, der Nachrichten schicken soll: Es liest nur die Add-ons seines eigenen Servers."
  - q: Richtet es den ntfy-Server ein?
    a: "Nein. Die Seite zeigt die Befehle, die der ntfy-Server für Benutzer, Topic und Token dieses Servers braucht; du führst sie dort aus. Mit auth-default-access: deny-all auf diesem Server und einem Token für den Benutzer dieses Servers kann niemand sonst sein Topic lesen oder dorthin senden."
  - q: Was, wenn der Server aus ist oder ntfy nicht erreicht?
    a: "Solange der Server aus ist, kommt nichts, und solange er den ntfy-Server oder seinen Mailserver nicht erreicht, nichts auf diesem Weg. Eine Nachricht, die über keinen Kanal hinausging, wird beim nächsten Lauf erneut geschickt, und das Status Board auf dem Host, der die anderen erreicht, zeigt einen Server, der nicht antwortet, als nicht erreichbar. Ging eine Nachricht nicht hinaus, sagt das der eigene Eintrag von Host Settings im Status Board."
  - q: Warum braucht E-Mail einen Mailserver auf localhost:25?
    a: "Der Notifier übergibt seine Mail an den eigenen Mailserver des Servers, etwa postfix oder exim, der sie zustellt oder weiterleitet. Ein sendmail-Befehl allein (nullmailer, msmtp, dma) wird nicht genutzt: Die Sandbox des Notifiers ignoriert das setgid-Bit, das postdrop von postfix braucht."
  - q: Wird jeder offene Port einzeln gemeldet?
    a: "In 0.1.0 nicht: Es vergleicht jeden Eintrag eines Add-ons als Ganzes, ein weiterer zum Internet offener Port gibt also keine neue Nachricht, solange dieser Eintrag schon eine Gefahr ist. Ab dem Release nach 0.1.0 wird jeder Befund, den ein Add-on hinter einem Eintrag auflistet, etwa jeder aus dem Internet erreichbare Port, einzeln gemeldet, und erneut, wenn er wiederkommt."
  - q: Was ist mit den Einstellungen von Cockpit selbst?
    a: "Host Settings hat bisher einen Reiter, Benachrichtigungen. Ein zweiter für die Einstellungen von Cockpit in /etc/cockpit/cockpit.conf ist geplant."
compare: "Das Status Board zeigt den Zustand aller Hosts, solange seine Seite offen ist, und benachrichtigt niemanden. Host Settings läuft auf jedem Server, auch wenn niemand hinsieht, und meldet die Änderungen über ntfy oder E-Mail. Es prüft selbst nichts: Was es meldet, kommt von Cron Jobs, Image Update Monitor, Update Gaps, Security Monitor und den anderen Add-ons mit Status-Vertrag."
alt:
  overview: "Host Settings in Cockpit: die regelmäßige Prüfung, der letzte Lauf und die letzte Nachricht, verschickt per E-Mail und ntfy, darunter ntfy mit der letzten Prüfung der Verbindung"
  ntfy: "ntfy: Server, Topic und Token, die letzte Prüfung der Verbindung und die Befehle, die der ntfy-Server für diesen Server braucht"
  check-dialog: "Verbindung prüfen: erreichbar, verschlüsselt, die Testnachricht angenommen, gesperrt für Lesen und Senden ohne Anmeldung, das Token darf nur schreiben"
  addons: "Die Add-ons des Servers, wie der Notifier sie zuletzt gelesen hat: eine Gefahr bei Cron Jobs, eine Warnung bei Update Gaps, ein Status, der sich nicht lesen lässt"
primaryAction:
  label: Host Settings installieren
  href: "#install"
updated: 2026-10-25
---

Installiere es auf jedem Server, der Nachrichten schicken soll.

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

Installiere dann **Host Settings** in Cockpit unter **Anwendungen** oder auf der Konsole:

```sh
sudo apt install cockpit-host-settings    # Debian, Ubuntu
sudo dnf install cockpit-host-settings    # Fedora, RHEL
```

Die Updates deines Systems halten es aktuell. Die regelmäßige Prüfung bleibt aus, bis sie eingerichtet ist: Öffne die Seite mit Administratorrechten, richte ntfy, E-Mail oder beides ein, dann die regelmäßige Prüfung. Ihr erster Lauf schickt die Zusammenfassung.

### Aus den Dateien eines Releases

Jedes [Release](https://github.com/Azentrius/cockpit-host-settings/releases) enthält `.deb`, `.rpm`, `SHA256SUMS` und einen signierten Build-Nachweis. Prüfe beides vor der Installation:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify cockpit-host-settings_X.Y.Z-1_all.deb --repo Azentrius/cockpit-host-settings
sudo apt install ./cockpit-host-settings_X.Y.Z-1_all.deb    # oder: sudo dnf install ./cockpit-host-settings-X.Y.Z-1.noarch.rpm
```

ntfy Schritt für Schritt einrichten, Fehlersuche und Deinstallation: siehe [README](https://github.com/Azentrius/cockpit-host-settings#setting-up).
