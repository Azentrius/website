---
slug: sharewerk
lang: de
title: "Sharewerk: Instagram- und Facebook-Beiträge zum Weitergeben"
description: "Selbst gehostet, mit Web-App für Android: Teile einen Instagram- oder Facebook-Beitrag und bekomm Bilder, Video-Standbilder, Transkript und Text zurück."
eyebrow: Selbst gehostet, für Android
h1: Einen Beitrag teilen, ihn als sauberes Paket zurückbekommen
lead: "Teile einen Instagram- oder Facebook-Beitrag von deinem Android-Telefon an Sharewerk und bekomm jedes Bild eines Karussells, Standbilder und ein Transkript bei Videos und die Bildunterschrift als Text zurück. Gib es dann an eine KI-Chat-App, einen Messenger oder alles andere im Teilen-Menü weiter."
summary: Ein selbst gehosteter Dienst mit Web-App für Android, der aus einem geteilten Beitrag Bilder, Standbilder, ein Transkript und Text macht.
platforms: ["Docker Compose", "Android mit Chrome", "Instagram & Facebook"]
notice: "Ein persönliches Projekt, veröffentlicht, falls es anderen nützt. Ohne Support-Zusage: Es kann jederzeit brechen, wenn Instagram oder Facebook etwas ändern."
problemTitle: Keine Screenshots mehr von jeder Folie.
problem:
  - "Ein Karussell weiterzugeben heißt, von jeder Folie einen Screenshot zu machen, ein Reel, den Bildschirm aufzuzeichnen. Sharewerk holt den Beitrag selbst: seine Bilder, die Bildunterschrift als Text und bei Videos Standbilder und das Gesprochene."
features:
  - title: Aus dem Teilen-Menü
    text: "Aus Chrome installiert, erscheint Sharewerk im Teilen-Menü von Android. Das Telefon schickt nur den Link; Herunterladen und Aufbereiten geschehen auf deinem Server."
  - title: Bilder, die sich lesen lassen
    text: "Jedes Bild als JPEG mit 1568 px an der langen Kante: scharf genug, um Text zu lesen, klein genug, um es schnell zu teilen."
  - title: Videos als Standbilder und Text
    text: "Standbilder bei Szenenwechseln und ein Transkript mit Zeitmarken, erstellt mit ffmpeg und faster-whisper auf deinem Server."
  - title: Der ganze Beitrag in einem Teilen
    text: "Eine post.txt mit Quelle, Autor, Datum, Bildunterschrift und einem Verzeichnis aller Bilder. Android nimmt höchstens 10 Dateien pro Teilen; mehr Bilder werden zu nummerierten Kontaktbögen zusammengefasst."
  - title: Dein Server, deine Anmeldung
    text: "Ein eigenes Zugangstoken, oder keins hinter einem anmeldenden Proxy wie Pomerium, oauth2-proxy oder Authelia. Auf Deutsch und Englisch, hell und dunkel."
  - title: Aktuell gehalten
    text: "Instagram und Facebook ändern sich ständig. Das Image wird jeden Montag mit den neuesten Versionen von gallery-dl und yt-dlp neu gebaut; ein Update ist ein Pull."
keeps:
  title: Cookies, Nutzungsbedingungen und Rechte
  text: "Ausgeloggten Besuchern zeigt Instagram fast nichts, deshalb braucht Sharewerk die Cookies eines angemeldeten Kontos. Nimm ein Zweitkonto: Automatisierter Zugriff auf Instagram und Facebook verstößt gegen die Nutzungsbedingungen von Meta, und so genutzte Konten können gedrosselt oder gesperrt werden. Der Inhalt eines Beitrags gehört seinem Urheber. Sharewerk ist ein Werkzeug für den persönlichen Gebrauch, und du bist dafür verantwortlich, wie du es nutzt."
security:
  - "Die Downloader bekommen nur Links auf einer Liste erlaubter Instagram- und Facebook-Hosts, damit sich der Server nicht für andere oder interne Adressen einspannen lässt."
  - "Der Container läuft als Benutzer ohne root, mit schreibgeschütztem Root-Dateisystem und ohne Linux-Capabilities."
  - "Die Cookie-Datei ist eine angemeldete Sitzung: Behandle sie wie ein Passwort. Nur der Container-Benutzer kann sie lesen."
  - "Ergebnisse werden standardmäßig nach 24 Stunden gelöscht, oder sofort aus der Liste der zuletzt aufbereiteten Beiträge."
  - "Betreib es nie als offenen Dienst für andere: Die Cookies sind deine, und damit auch die Verantwortung für das, was mit ihnen heruntergeladen wird."
  - "Die Container-Images tragen einen signierten Build-Nachweis."
requirements:
  - "Ein Server mit Docker und Docker Compose; 2 CPU-Kerne und 3 GB RAM reichen gut"
  - "Eine Domain mit HTTPS davor: Web-Apps lassen sich nur von sicheren Adressen installieren"
  - "Ein Android-Telefon mit Chrome; das iPhone wird nicht unterstützt"
  - "Für Instagram: die Cookies eines Zweitkontos"
faq:
  - q: Funktioniert es auf dem iPhone?
    a: "Nein. Safari unterstützt die Web Share Target API nicht, deshalb kann eine Web-App nicht im Teilen-Menü von iOS erscheinen."
  - q: Warum braucht es Cookies?
    a: "Ausgeloggten Besuchern zeigt Instagram fast nichts. Nimm ein Zweitkonto, nicht dein Hauptkonto. Facebook-Videos funktionieren oft ohne Cookies."
  - q: Wo wird ein Beitrag verarbeitet?
    a: "Auf deinem Server. Das Telefon schickt nur den Link; der Server lädt den Beitrag herunter, bereitet ihn auf und löscht die Ergebnisse standardmäßig nach 24 Stunden."
  - q: Was tun, wenn Downloads scheitern?
    a: "Meist haben Instagram oder Facebook etwas geändert, und eine neuere Version von gallery-dl oder yt-dlp behebt es. Hol das Image neu: Es wird jede Woche neu gebaut."
  - q: Gibt es eine App zum Herunterladen?
    a: "Nein. Sharewerk ist eine Web-App: Du öffnest deine Sharewerk-Adresse in Chrome und installierst sie über das Menü von Chrome."
alt:
  icon: "Das App-Symbol von Sharewerk: zwei gestapelte Karten, auf der vorderen ein Pfeil nach außen, dazu ein Punkt, in Gold auf Tinte"
primaryAction:
  label: Sharewerk einrichten
  href: "#install"
notes:
  - "Instagram und Facebook sind Marken von Meta Platforms, Inc., Android von Google LLC. Sharewerk ist ein unabhängiges Projekt und nicht mit Meta oder Google verbunden."
  - "Das Sharewerk-Zeichen ist eine Marke von Azentrius und steht nicht unter der Apache-Lizenz."
updated: 2026-10-23
---

### Auf deinem Server

Mit Docker und Docker Compose:

```sh
git clone https://github.com/Azentrius/sharewerk.git
cd sharewerk
cp .env.example .env
sed -i "s/^SHAREWERK_AUTH_TOKEN=.*/SHAREWERK_AUTH_TOKEN=$(openssl rand -hex 32)/" .env
mkdir -p secrets
docker compose up -d
```

Sharewerk lauscht dann auf `127.0.0.1:8080`, aus dem fertigen Image `ghcr.io/azentrius/sharewerk:latest`. Stell einen Reverse-Proxy mit TLS davor, zum Beispiel Caddy:

```caddyfile
sharewerk.example.com {
    reverse_proxy 127.0.0.1:8080
}
```

Das erste Video, das du aufbereitest, lädt das Sprachmodell von Whisper (etwa 500 MB für `small`) in das Datenvolume.

### Cookies für Instagram

Melde dich in einem eigenen Browserprofil bei einem Zweitkonto an, exportiere dessen Cookies im Netscape-Format `cookies.txt` und schließe das Profil, ohne dich abzumelden. Kopiere die Datei auf den Server, leg sie für den Container-Benutzer ab und lösche die Kopie:

```sh
sudo install -o 10001 -g 10001 -m 600 cookies.txt secrets/cookies.txt
shred -u cookies.txt
```

Lösche den Export auch auf deinem Rechner. Meldet Sharewerk „login required“, exportiere die Cookies neu. Das [README](https://github.com/Azentrius/sharewerk#cookies) erklärt jeden Schritt.

### Auf dem Telefon

1. Öffne deine Sharewerk-Adresse in **Chrome** und melde dich mit dem Token aus `.env` an.
2. Wähle im Menü von Chrome **App installieren**.
3. Tippe in Instagram auf **Teilen** und wähle **Sharewerk**. Ist das Paket fertig, tippe auf **Teilen** und wähle die App, an die es gehen soll.

### Aktualisieren

```sh
docker compose pull && docker compose up -d
gh attestation verify oci://ghcr.io/azentrius/sharewerk:latest --repo Azentrius/sharewerk
```

Hinter Pomerium oder einem anderen anmeldenden Proxy, alle Einstellungen und Fehlersuche: siehe [README](https://github.com/Azentrius/sharewerk#readme).
