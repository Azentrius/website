---
slug: home-assistant-theme
lang: de
title: Azentrius Theme – Home-Assistant-Theme in Tinte und Gold
description: "Open-Source-Theme für Home Assistant in Tinte, Papier und Gold, mit DM Sans. Hell und dunkel folgen deinem Profil. Installation mit HACS oder von Hand."
eyebrow: Theme für Home Assistant
h1: Ein Home-Assistant-Theme in Tinte, Papier und Gold
lead: "Gesetzt in DM Sans, hell oder dunkel, wie dein Profil es sagt. Gerätefarben, Größen und Symbole bleiben, wie Home Assistant sie zeichnet."
summary: Ein Theme für Home Assistant in Tinte, Papier und Gold, gesetzt in DM Sans, für hellen und dunklen Modus.
platforms: ["Home Assistant 2026.10+", "HACS"]
problemTitle: Ein geprüfter Look statt Dutzender Variablen.
problem:
  - "Farben und Schrift kommen aus einem getesteten Designsystem statt aus Dutzenden von Hand gesetzter Variablen."
  - "Der Kontrast jedes Farbpaars ist in beiden Modi geprüft."
  - "Die Schriften kommen von deinem eigenen Home Assistant, nicht vom Server eines anderen."
features:
  - title: Aktionsfarbe
    text: "Tinte im hellen Modus, Gold im dunklen, für Knöpfe, Schalter, Schieberegler, Tabs und den gewählten Eintrag der Seitenleiste."
  - title: Flächen
    text: "Kopfzeile und Seitenleiste liegen auf dem Seitengrund. Karten sind flach, mit dünnem Rand und 16 px Radius; Dialoge haben 24 px."
  - title: Text, Linien und Fokus
    text: "Warme Grautöne für Nebentext und Ränder, ein Fokusring und Links in Bronze oder Gold."
  - title: Status
    text: "Erfolg, Warnung, Fehler und Information in den Farben des Designsystems. Gold ist nie ein Status."
  - title: Schrift
    text: "DM Sans für die Oberfläche, Red Hat Mono für Code, sobald du die Schriften hinzufügst."
keeps:
  title: Was Home Assistant bleibt
  text: "Die Farben der Gerätezustände (Bernstein für ein eingeschaltetes Licht, Orange fürs Heizen, Blau fürs Kühlen und so weiter), Größen und Abstände, Symbole und Texte. Das Theme setzt nur Werte; es fügt keine Inhalte hinzu. In HACS und in deinem Profil heißt es einfach Azentrius."
security:
  - "Dein eigener Home Assistant liefert die Schriften unter /local/ aus; nichts wird von anderswo geladen."
  - "Jedes Release hat SHA256SUMS und einen signierten Build-Nachweis aus dem Release-Workflow des Repositorys."
requirements:
  - "Home Assistant 2026.10 oder neuer (getestet mit 2026.10, Frontend 20260930.4)"
  - "HACS, oder Zugriff auf den Konfigurationsordner für die Installation von Hand"
faq:
  - q: Ändert es die Farben meiner Geräte?
    a: "Nein. Gerätezustände behalten die Farben von Home Assistant."
  - q: Warum heißt es in HACS Azentrius?
    a: "Unter diesem Namen wählst du es in deinem Profil und mit frontend.set_theme. Azentrius Theme ist der Produktname."
  - q: Lädt es Schriften aus dem Internet?
    a: "Nein. Dein eigener Home Assistant liefert sie unter /local/ aus. Ohne sie wird die serifenlose Schrift deines Systems verwendet."
  - q: Kann ich es für alle zum Standard machen?
    a: "Ja, mit der Aktion frontend.set_theme und name: Azentrius. Eine Wahl im Profil hat Vorrang vor dem Standard."
  - q: Funktioniert es im hellen und dunklen Modus?
    a: "Ja. Beide folgen der Einstellung in deinem Profil."
  - q: Geht es nach einem Update kaputt?
    a: "Das kann passieren: Neben den offiziellen Theme-Variablen setzt es neuere, die sich mit einem Frontend-Update ändern können. Es ist mit 2026.10 getestet; melde Probleme bitte als Issue."
alt:
  light: "Analyse-Einstellungen im hellen Modus: eine weiße Karte auf Papier, Schalter in Tinte"
  dark: "Analyse-Einstellungen im dunklen Modus: eine dunkle Karte auf Tinte, Schalter in Gold"
  light-dialog: "Dialog für ein neues Dashboard im hellen Modus, mit Textfeldern und Schaltern"
  dark-dialog: "Dialog für ein neues Dashboard im dunklen Modus, mit Textfeldern und Schaltern"
primaryAction:
  label: Theme installieren
  href: "#install"
notes:
  - "Azentrius Theme ist ein unabhängiges Projekt und nicht mit Home Assistant oder der Open Home Foundation verbunden."
updated: 2026-10-19
---

### Mit HACS

1. Öffne in HACS das Menü, wähle **Benutzerdefinierte Repositories** und füge `https://github.com/Azentrius/home-assistant-theme` mit dem Typ **Theme** hinzu.
2. Lade **Azentrius** herunter.
3. Stelle sicher, dass `configuration.yaml` den Theme-Ordner lädt:

```yaml
frontend:
  themes: !include_dir_merge_named themes
```

4. Führe die Aktion **Home Assistant Frontend: Themes neu laden** aus, oder starte Home Assistant neu, wenn du die Zeile gerade hinzugefügt hast.
5. Wähle **Azentrius** unter **Profil › Theme**.

### Die Schriften

HACS installiert nur die Theme-Datei. Für DM Sans kopierst du `www/azentrius/` aus dem Release-Archiv nach `/config/www/azentrius/`, lädst dessen Skript und startest Home Assistant neu:

```yaml
frontend:
  extra_module_url:
    - /local/azentrius/azentrius.js
```

### Von Hand

Lade das Archiv und `SHA256SUMS` aus dem [neuesten Release](https://github.com/Azentrius/home-assistant-theme/releases/latest), prüfe sie und entpacke das Archiv nach `/config`:

```sh
sha256sum --ignore-missing -c SHA256SUMS
gh attestation verify azentrius-home-assistant-theme-VERSION.zip --repo Azentrius/home-assistant-theme
```
