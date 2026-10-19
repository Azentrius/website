# Changelog

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
