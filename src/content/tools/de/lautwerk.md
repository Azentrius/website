---
slug: lautwerk
lang: de
title: "Lautwerk: KI-Sprachchat mit eigenem API-Schlüssel"
description: "Experimentelle Open-Source-App für Android: Sprachchat mit Claude und OpenAI über eigene API-Schlüssel. Chats und Schlüssel bleiben verschlüsselt."
eyebrow: Eine Stimme für deine KI
h1: Sprachgespräche mit Claude und OpenAI über eigene Schlüssel
lead: "Eine experimentelle Android-App: Sprich mit Claude oder OpenAI über deinen eigenen API-Schlüssel. Chats und Schlüssel bleiben verschlüsselt auf deinem Telefon, ohne einen Server von uns dazwischen."
summary: Eine experimentelle Android-App für Sprachgespräche mit Claude und OpenAI über eigene API-Schlüssel.
platforms: ["Android 10+", "Claude", "OpenAI"]
notice: "Prototyp. Nicht für die Nutzung während der Fahrt. Nicht bei Google Play."
problemTitle: Dein Schlüssel, dein Telefon, dein Gespräch.
problem:
  - "Viele Sprachassistenten leiten jedes Gespräch über einen eigenen Dienst. Lautwerk spricht mit dem Anbieter, den du wählst, über deinen eigenen API-Schlüssel und speichert Schlüssel und Chats verschlüsselt auf dem Gerät."
features:
  - title: Sprachgespräche mit zwei Anbietern
    text: "Claude und OpenAI hinter einem Sprachablauf: die Spracherkennung von Android, das Modell des Anbieters und die Sprachausgabe von Android."
  - title: Eigene Schlüssel, verschlüsselt
    text: "API-Schlüssel werden mit dem Android Keystore verschlüsselt gespeichert und verlassen das Telefon nur in Richtung des Anbieters."
  - title: Verschlüsselter Verlauf mit Suche
    text: "Frühere Gespräche bleiben verschlüsselt auf dem Gerät und lassen sich durchsuchen."
  - title: Chat als Text exportieren
    text: "Jedes Gespräch lässt sich als einfacher Text exportieren."
  - title: Deutsch und Englisch
    text: "Die App folgt der Sprache des Systems und dem Azentrius-Design."
keeps:
  title: Der Android-Auto-Prototyp
  text: "Ein minimaler Fahrzeugbildschirm, gebaut mit der Car App Library und getestet in der Desktop Head Unit (DHU), Googles Emulator für Fahrzeugbildschirme. Es gibt keine freigegebene Android-Auto-Kategorie dafür, und er ist nicht für die Nutzung während der Fahrt gedacht."
security:
  - "Schlüssel und Chats werden verschlüsselt auf dem Gerät gespeichert."
  - "Es gibt keinen Azentrius-Server dazwischen: Der erkannte Text geht nur an den Anbieter, den du wählst."
  - "Spracherkennung und Sprachausgabe sind die deines Android-Systems."
requirements:
  - "Android 10 oder neuer"
  - "Ein API-Schlüssel von Anthropic (Claude) oder OpenAI"
  - "Zum Bauen: Android Studio mit JDK 17, SDK Platform Android 17 (API 37) und Build Tools 36.0.0"
faq:
  - q: Kann ich es im Auto nutzen?
    a: "Nein. Es ist ein Prototyp, getestet in der Desktop Head Unit, und nicht für die Nutzung während der Fahrt gedacht."
  - q: Gibt es die App bei Google Play?
    a: "Nein."
  - q: Wohin gehen meine API-Schlüssel?
    a: "Sie bleiben verschlüsselt auf dem Gerät. Anfragen gehen nur an den Anbieter, den du wählst."
  - q: Welche Anbieter werden unterstützt?
    a: "Claude und OpenAI."
  - q: Wie installiere ich sie?
    a: "Baue sie aus dem Quellcode mit Android Studio. Fertige APKs gibt es nicht."
alt:
  icon: "Das App-Symbol von Lautwerk: eine Sprechblase mit Punkt, in Gold auf Tinte"
primaryAction:
  label: Aus dem Quellcode bauen
  href: "#install"
notes:
  - "Android und Android Auto sind Marken von Google LLC. Lautwerk ist ein unabhängiges Projekt."
updated: 2026-10-19
---

### Aus dem Quellcode bauen

1. Klone [Azentrius/lautwerk](https://github.com/Azentrius/lautwerk) und öffne es in Android Studio.
2. Stelle das Gradle-JDK auf **JDK 17** und installiere **SDK Platform Android 17 (API 37)** und **Build Tools 36.0.0**, falls sie fehlen.
3. Baue die Telefon-App, die Variante `app:debug`:

```sh
./gradlew :app:assembleDebug
```

4. Installiere die APK auf deinem Telefon, öffne die Einstellungen, wähle einen Anbieter und gib deinen API-Schlüssel ein.

Das [README](https://github.com/Azentrius/lautwerk#readme) des Repositorys erklärt die Module, den Android-Auto-Prototyp und die Testberichte.
