---
slug: lautwerk
lang: en
title: Lautwerk – voice box for Claude and OpenAI, your own key
description: "Experimental open-source Android app for voice conversations with Claude and OpenAI on your own API keys. Chats and keys stay encrypted on the device."
eyebrow: A voice box for your AI
h1: Voice conversations with Claude and OpenAI on your own keys
lead: "An experimental Android app: talk to Claude or OpenAI with your own API key. Chats and keys stay encrypted on your phone, with no server of ours in between."
summary: An experimental Android app for voice conversations with Claude and OpenAI on your own API keys.
platforms: ["Android 10+", "Claude", "OpenAI"]
notice: "Prototype. Not for use while driving. Not on Google Play."
problemTitle: Your key, your phone, your conversation.
problem:
  - "Many voice assistants route every conversation through a service of their own. Lautwerk talks to the provider you choose, with your own API key, and keeps keys and chats encrypted on the device."
features:
  - title: Voice conversations with two providers
    text: "Claude and OpenAI behind one voice flow: Android's speech recognition, the provider's model and Android's text-to-speech."
  - title: Your own keys, encrypted
    text: "API keys are stored encrypted with the Android Keystore and never leave the phone except to the provider."
  - title: Encrypted history with search
    text: "Past conversations stay on the device, encrypted, and can be searched."
  - title: Export a chat as text
    text: "Any conversation can be exported as plain text."
  - title: German and English
    text: "The app follows the language of the system and the Azentrius design."
keeps:
  title: The Android Auto prototype
  text: "A minimal car screen built with the Car App Library and tested in the Desktop Head Unit (DHU), Google's emulator for car screens. There is no approved Android Auto category for it, and it is not meant for use while driving."
security:
  - "Keys and chats are stored encrypted on the device."
  - "There is no Azentrius server in between: the recognised text goes only to the provider you choose."
  - "Speech recognition and text-to-speech are those of your Android system."
requirements:
  - "Android 10 or newer"
  - "An API key from Anthropic (Claude) or OpenAI"
  - "To build: Android Studio with JDK 17, SDK Platform Android 17 (API 37) and Build Tools 36.0.0"
faq:
  - q: Can I use it in my car?
    a: "No. It is a prototype, tested in the Desktop Head Unit, and not meant for use while driving."
  - q: Is it on Google Play?
    a: "No."
  - q: Where do my API keys go?
    a: "They stay encrypted on the device. Requests go only to the provider you choose."
  - q: Which providers are supported?
    a: "Claude and OpenAI."
  - q: How do I install it?
    a: "Build it from the source with Android Studio. There are no ready-made APKs."
alt:
  icon: "The Lautwerk app icon: a speech bubble with a dot, in gold on ink"
primaryAction:
  label: Build from source
  href: "#install"
notes:
  - "Android and Android Auto are trademarks of Google LLC. Lautwerk is an independent project."
updated: 2026-10-19
---

### Build from source

1. Clone [Azentrius/lautwerk](https://github.com/Azentrius/lautwerk) and open it in Android Studio.
2. Set the Gradle JDK to **JDK 17** and install **SDK Platform Android 17 (API 37)** and **Build Tools 36.0.0** if they are missing.
3. Build the phone app, the variant `app:debug`:

```sh
./gradlew :app:assembleDebug
```

4. Install the APK on your phone, open the settings, choose a provider and enter your API key.

The repository explains the modules, the Android Auto prototype and the test reports in its [README](https://github.com/Azentrius/lautwerk#readme).
