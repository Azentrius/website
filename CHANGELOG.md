# Changelog

## 0.1.3 – 2026-10-19

The homepage shows Image Update Monitor between the facts and the project list.

- **Product preview:** a real screenshot, a short explanation about keeping container updates in
  sight and a link to the project, in English and German.
- **Phones and themes:** a narrow-screen capture shows a complete container card on phones; the
  desktop view shows five rows. Both follow the device's light or dark setting and use optimised WebP.
- **Build checks on Windows:** resolve the output directory as a filesystem path and normalise
  directory separators before comparing page routes.

## 0.1.2 – 2026-10-19

Stellwerk's page explains Codex wherever it explains Claude Code.

- **How a request goes:** the steps, the feature about the app and the question about a hub that is
  not running now cover Codex too. The Codex app shows its card only once Stellwerk has answered, so
  the app takes over after 30 seconds instead of 60.
- **README:** the Codex installation links straight to the README's Codex section.

## 0.1.1 – 2026-10-19

Statements that hold for every project, tables that read on a phone, and the review's other findings.

- **What Azentrius claims:** the start page no longer says "100 % self-hosted", "no SaaS dependencies"
  or "GDPR compliant" for everything; Lautwerk, for one, talks to Claude or OpenAI. It now says what
  holds for every project (open source under Apache-2.0, our own servers in the EU) and that each
  project page names what it needs and talks to. The project overview says the same.
- **Tables on phones:** below 640 px the comparison table and the explanation tables stack into
  blocks with a label for each value, as the design system asks; long row headers wrap.
- **Product names:** every project page shows its styled name above the heading again; Cron Jobs and
  Azentrius Theme get descriptive headings instead of repeating the name.
- **Buttons:** verb and object ("Install Cron Jobs", "Open repository", "Copy code").
- **Stellwerk and Codex:** the heading, the requirements, a question and an installation section with
  how Codex differs (30 seconds on the display, then the app).
- **Shared links:** every page has a preview picture: the top of the project's screenshot, or the
  Azentrius card.

## 0.1.0 – 2026-10-19

The new azentrius.com: one page per project, in English and German.

- **One page per project:** Cron Jobs, Image Update Monitor, Stellwerk, Lautwerk and Azentrius Theme,
  each with what it does, screenshots, security, installation, questions and how it differs. English
  at `/<project>/`, German at `/de/<project>/`.
- **Start page, project overview with a comparison table, legal notice and privacy policy** in both
  languages. The German legal texts are the binding ones.
- **Findable:** title, description, canonical address and hreflang on every page, structured data
  (organisation, website, software, breadcrumbs), a sitemap with both languages and `robots.txt`.
- **Self-contained:** fonts, styles and the one script are files on azentrius.com. No inline scripts or
  styles, so a strict Content Security Policy fits (see `deploy/`). The only other address is
  analytics.azentrius.com, our own Plausible.
- **Release and delivery:** a release is a `tar.gz` of the built site with `SHA256SUMS` and a signed
  build provenance from this repository's release workflow. public-host checks both and switches to a
  new release by itself (`deploy/`).
