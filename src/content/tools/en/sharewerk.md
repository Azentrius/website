---
slug: sharewerk
lang: en
title: "Sharewerk: Instagram and Facebook posts, ready to share"
description: "Self-hosted, with an Android web app: share an Instagram or Facebook post and get its images, video key frames, transcript and caption back."
eyebrow: Self-hosted, for Android
h1: Share a post, get it back as a clean pack
lead: "Share an Instagram or Facebook post from your Android phone to Sharewerk and get back every image of a carousel, key frames and a transcript for videos, and the caption as text. Then pass it on to an AI chat app, a messenger or anything else in the share menu."
summary: A self-hosted service with an Android web app that turns a shared post into images, key frames, a transcript and its text.
platforms: ["Docker Compose", "Android with Chrome", "Instagram & Facebook"]
notice: "A personal project, published in case it is useful. No support promise: it may break whenever Instagram or Facebook change something."
problemTitle: No more screenshots of every slide.
problem:
  - "Passing on a carousel means a screenshot of every slide, and a reel a screen recording. Sharewerk fetches the post itself: its pictures, its caption as text and, for videos, key frames and what is said."
features:
  - title: From the share menu
    text: "Installed from Chrome, Sharewerk appears in Android's share menu. The phone only sends the link; downloading and processing happen on your server."
  - title: Images that read well
    text: "Every image as JPEG with a long edge of 1568 px: sharp enough to read text, small enough to share fast."
  - title: Videos as frames and text
    text: "Key frames at scene changes and a timestamped transcript, made with ffmpeg and faster-whisper on your server."
  - title: The whole post in one share
    text: "A post.txt with source, author, date, caption and an index of all pictures. Android takes at most 10 files per share; more pictures are combined into numbered contact sheets."
  - title: Your server, your login
    text: "An access token of its own, or none behind an authenticating proxy such as Pomerium, oauth2-proxy or Authelia. English and German, light and dark."
  - title: Kept current
    text: "Instagram and Facebook change constantly. The image is rebuilt every Monday with the newest gallery-dl and yt-dlp, so updating is a pull."
keeps:
  title: Cookies, terms and rights
  text: "Instagram shows almost nothing to logged-out visitors, so Sharewerk needs the cookies of a logged-in account. Use a secondary account: automated access to Instagram and Facebook is against Meta's terms of use, and accounts used this way can be rate-limited or blocked. The content of a post belongs to its author. Sharewerk is a tool for personal use, and you are responsible for how you use it."
security:
  - "The downloaders only receive links on an allowlist of Instagram and Facebook hosts, so the server cannot be made to fetch other or internal addresses."
  - "The container runs as a non-root user with a read-only root filesystem and no Linux capabilities."
  - "The cookie file is a logged-in session: treat it like a password. Only the container user can read it."
  - "Results are deleted after 24 hours by default, or right away from the list of recently prepared posts."
  - "Never run it as an open service for other people: the cookies are yours, and so is the responsibility for what is downloaded with them."
  - "The container images carry a signed build provenance."
requirements:
  - "A server with Docker and Docker Compose; 2 CPU cores and 3 GB RAM are plenty"
  - "A domain with HTTPS in front of it: web apps install only from secure origins"
  - "An Android phone with Chrome; iPhone is not supported"
  - "For Instagram: the cookies of a secondary account"
faq:
  - q: Does it work on an iPhone?
    a: "No. Safari does not implement the Web Share Target API, so a web app cannot appear in the iOS share sheet."
  - q: Why does it need cookies?
    a: "Instagram shows almost nothing to logged-out visitors. Use a secondary account, not your main one. Facebook videos often work without cookies."
  - q: Where is a post processed?
    a: "On your server. The phone only sends the link; the server downloads and processes the post and deletes the results after 24 hours by default."
  - q: What if downloads start failing?
    a: "Usually Instagram or Facebook changed something, and a newer gallery-dl or yt-dlp fixes it. Pull the image again: it is rebuilt every week."
  - q: Is there an app to download?
    a: "No. Sharewerk is a web app: you open your Sharewerk address in Chrome and install it from Chrome's menu."
alt:
  icon: "The Sharewerk app icon: two stacked cards, the front one with an arrow pointing out, and a dot, in gold on ink"
primaryAction:
  label: Set up Sharewerk
  href: "#install"
notes:
  - "Instagram and Facebook are trademarks of Meta Platforms, Inc., Android of Google LLC. Sharewerk is an independent project and not affiliated with Meta or Google."
  - "The Sharewerk sign is a mark of Azentrius and is not licensed under the Apache License."
updated: 2026-10-23
---

### On your server

With Docker and Docker Compose:

```sh
git clone https://github.com/Azentrius/sharewerk.git
cd sharewerk
cp .env.example .env
sed -i "s/^SHAREWERK_AUTH_TOKEN=.*/SHAREWERK_AUTH_TOKEN=$(openssl rand -hex 32)/" .env
mkdir -p secrets
docker compose up -d
```

Sharewerk now listens on `127.0.0.1:8080`, from the prebuilt image `ghcr.io/azentrius/sharewerk:latest`. Put a TLS reverse proxy in front of it, for example Caddy:

```caddyfile
sharewerk.example.com {
    reverse_proxy 127.0.0.1:8080
}
```

The first video you process downloads the Whisper speech model (about 500 MB for `small`) into the data volume.

### Cookies for Instagram

Log in to a secondary account in a browser profile of its own, export its cookies in Netscape `cookies.txt` format and close the profile without logging out. Copy the file to the server, put it in place for the container user and delete the copy:

```sh
sudo install -o 10001 -g 10001 -m 600 cookies.txt secrets/cookies.txt
shred -u cookies.txt
```

Delete the export on your computer as well. When Sharewerk reports “login required”, export the cookies again. The [README](https://github.com/Azentrius/sharewerk#cookies) explains each step.

### On the phone

1. Open your Sharewerk address in **Chrome** and sign in with the token from `.env`.
2. In Chrome's menu, choose **Install app**.
3. In Instagram, tap **Share** and pick **Sharewerk**. When the pack is ready, tap **Share** and pick the app to pass it on to.

### Updating

```sh
docker compose pull && docker compose up -d
gh attestation verify oci://ghcr.io/azentrius/sharewerk:latest --repo Azentrius/sharewerk
```

Behind Pomerium or another authenticating proxy, all settings and troubleshooting: see the [README](https://github.com/Azentrius/sharewerk#readme).
