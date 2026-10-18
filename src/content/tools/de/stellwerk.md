---
slug: stellwerk
lang: de
title: Stellwerk – Claude-Code-Freigaben am Tischdisplay erteilen
description: "Lokales Tischdisplay für Claude Code und Codex: alle Sitzungen im Blick, Freigaben mit vollständiger Eingabe, erlauben oder ablehnen am zweiten Bildschirm."
eyebrow: Ein Stellwerk für deine KI-Agenten
h1: Claude-Code-Freigaben auf dem zweiten Bildschirm erteilen
lead: "Jede laufende Sitzung von Claude Code und Codex auf einem breiten zweiten Bildschirm. Freigabeanfragen zeigen ihre vollständige Eingabe und lassen sich direkt dort erlauben oder ablehnen; die App arbeitet weiter, und wer zuerst entscheidet, gilt."
summary: Ein lokales Tischdisplay für Sitzungen von Claude Code und Codex und ihre Freigabeanfragen, für einen breiten zweiten Bildschirm.
platforms: ["Windows 10 & 11", "Claude Code", "Codex"]
problemTitle: Lange Läufe halten an einem Fenster, das du nicht siehst.
problem:
  - "Lange Agentenläufe bleiben an einer Freigabeanfrage hängen, deren Fenster gerade verdeckt ist."
  - "Mehrere Sitzungen gleichzeitig sind schwer im Blick zu behalten."
  - "Automatische Freigaben sparen Klicks, kosten aber Kontrolle."
features:
  - title: Jede Sitzung im Blick
    text: "Name, Projekt und Status jeder Sitzung, die Zahl laufender Subagenten und wie voll ihr Kontext ist. Das Dringendste zuerst."
  - title: Anfragen mit vollständiger Eingabe
    text: "Ein Shell-Befehl vollständig, eine Dateiänderung mit Pfad und Inhalt, ein MCP-Aufruf mit Server, Werkzeug und Parametern. Erlauben, ablehnen oder der App überlassen."
  - title: Die App arbeitet wie bisher
    text: "Die Claude-App zeigt gleichzeitig ihre eigene Karte; wer zuerst entscheidet, gilt. Nach 60 Sekunden ohne Entscheidung geht die Anfrage zurück an die App."
  - title: Was auf dich wartet
    text: "Fragen und Eingaben, auf die die Agenten in der App warten, stehen in einer Liste, mit der Wartezeit."
  - title: Wenn du möchtest
    text: "Offene Pull Requests mit ihren Actions-Läufen, Auslastung und Temperatur der Hardware, deine Uptime-Kuma-Monitore und wie viel der Limits deiner Pläne verbraucht ist."
  - title: Nur lokal
    text: "Der Hub lauscht auf 127.0.0.1 und nirgends sonst. Das Display lädt nichts aus dem Internet."
explainer:
  title: Wie eine Anfrage läuft
  head: ["Schritt", "Was passiert"]
  rows:
    - ["1", "Claude Code bittet um eine Freigabe und schickt die Anfrage über einen Hook an den Stellwerk-Hub."]
    - ["2", "Das Display zeigt sie als Karte; die Claude-App zeigt gleichzeitig ihre eigene."]
    - ["3", "Wer zuerst entscheidet, Display oder App, gilt."]
    - ["4", "Ohne Entscheidung am Display innerhalb von 60 Sekunden geht die Anfrage zurück an die App. Läuft der Hub nicht, fragt Claude Code einfach in der App."]
security:
  - "Feste Adresse 127.0.0.1, dazu eine Regel der Windows-Firewall als zweite Schicht."
  - "Jede Hook-Anfrage braucht ein Token; das Display meldet sich an, bevor es etwas bekommt."
  - "Nichts wird automatisch erlaubt: keine Regeln, kein „immer erlauben“."
  - "Verbindungen zu anderen Rechnern nur zu api.github.com und deinem Uptime Kuma, jeweils erst, wenn du es einrichtest."
requirements:
  - "Windows 10 oder 11"
  - "Node.js 24 (LTS)"
  - "Claude Code: die Claude-Desktop-App oder die Kommandozeile"
  - "Microsoft Edge oder ein anderer Chromium-Browser für das Display"
faq:
  - q: Funktioniert es mit der Claude-Desktop-App?
    a: "Ja, mit Claude Code in der Desktop-App und auf der Kommandozeile. Die App zeigt ihre eigene Karte, und die erste Entscheidung gilt."
  - q: Was passiert, wenn der Hub nicht läuft?
    a: "Claude Code fragt einfach in der App, ohne Fehlermeldungen."
  - q: Kann es Anfragen automatisch erlauben?
    a: "Nein. Es gibt keine Regeln und kein „immer erlauben“."
  - q: Welches Display brauche ich?
    a: "Es ist für 1920×720 gemacht und bereit für Touch; ein Faktor skaliert alle Größen für andere Bildschirme."
  - q: Läuft es unter macOS oder Linux?
    a: "Noch nicht: nur Windows 10 und 11."
  - q: Sendet es Daten ins Internet?
    a: "Nein, außer an api.github.com für Pull Requests und an dein eigenes Uptime Kuma, jeweils nur, wenn du es einrichtest."
compare: "Andere Werkzeuge bringen Freigaben aufs Handy oder per Push, manche mit automatischer Freigabe. Stellwerk bleibt auf deinem Schreibtisch und auf deinem Rechner und gibt nichts von selbst frei."
alt:
  display: "Das Stellwerk-Display in 1920×720: Sitzungen mit Füllstand ihres Kontexts, daneben die wartenden Anfragen, Uptime-Kuma-Monitore, Uhr, Hub, Hardware und Verbrauch der Pläne"
primaryAction:
  label: Herunterladen
  href: "https://github.com/Azentrius/stellwerk/releases/latest"
notes:
  - "Stellwerk ist ein unabhängiges Projekt und nicht mit Anthropic oder OpenAI verbunden. Claude Code und Codex benennen, womit Stellwerk zusammenarbeitet."
  - "Das Stellwerk-Zeichen ist eine Marke von Azentrius und steht nicht unter der Apache-Lizenz."
updated: 2026-10-19
---

### Aus einem Release

Lade `stellwerk-VERSION.zip` und `SHA256SUMS` aus dem [neuesten Release](https://github.com/Azentrius/stellwerk/releases/latest). In PowerShell, mit der heruntergeladenen Version:

```powershell
(Get-FileHash stellwerk-VERSION.zip).Hash    # muss der Zeile in SHA256SUMS entsprechen
gh attestation verify stellwerk-VERSION.zip --repo Azentrius/stellwerk
Expand-Archive stellwerk-VERSION.zip -DestinationPath .
cd stellwerk-VERSION
npm ci --omit=dev
npm link
```

### Claude Code verbinden

1. Starte den Hub: `stellwerk serve`. Beim ersten Start legt er das Token für die Hooks an.
2. Verbinde Claude Code: `stellwerk hooks install`. Es zeigt, was es zu deinen Einstellungen hinzufügt, und fragt vor dem Schreiben.
3. Starte die Claude-Desktop-App und alle Terminals neu, in denen Claude Code läuft.
4. Einmal als Administrator: `stellwerk install` legt die Firewall-Regel an.
5. Öffne das Display auf dem zweiten Bildschirm. Damit alles mit Windows startet: `stellwerk autostart install`.

Das [README](https://github.com/Azentrius/stellwerk#installation) beschreibt Codex, Pull Requests, Hardwarewerte und Uptime Kuma.
