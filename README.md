# azentrius.com

The website of Azentrius: one page per project, in English and German, built with
[Astro](https://astro.build/) into plain static files.

- English without a prefix (`/stellwerk/`), German under `/de/` with the same slugs (`/de/stellwerk/`).
- Every page has its counterpart in the other language, linked by `hreflang` and the language switch.
- No inline scripts or styles: fonts, styles and the one script for the copy buttons are files on the
  site, so a strict Content Security Policy fits.
- The only other address a page talks to is analytics.azentrius.com, our own Plausible.

## Working on it

Node.js 24 (`.nvmrc`; 22.22 or newer works).

```sh
npm ci
npm run dev        # http://localhost:4321
npm run build      # versions from GitHub, astro build, then the checks
npm run preview    # serves dist/
```

`npm run build` ends with `scripts/check-dist.mjs`, which fails the build when a page of a pair is
missing, a canonical or `hreflang` link is wrong, a title is longer than 60 or a description longer
than 155 characters, a page has an inline script, inline style or event handler, an internal link or
anchor leads nowhere, the sitemap does not list exactly the indexable pages, or a project that is not
public yet is named anywhere.

## Where things are

| Path | What |
| --- | --- |
| `src/content/tools/{en,de}/<slug>.md` | A project page: frontmatter with every section's text, the installation in Markdown below it. The schema is in `src/content.config.ts`. |
| `src/content/legal/{en,de}/` | Legal notice and privacy policy. The German versions are binding. |
| `src/data/tools.ts` | The projects: names, category, status, license, screenshots. |
| `src/data/routes.mjs` | Every page pair by key; canonical, `hreflang`, language switch and sitemap use it. |
| `src/data/versions.json` | The latest release of each project; `npm run versions` updates it from GitHub. |
| `src/i18n/ui.ts` | Labels of the interface in both languages. |
| `src/components/`, `src/layouts/` | The page templates. |
| `src/styles/site.css` | The site's own styles, from the design system's tokens only. |
| `vendor/design-system/` | `tokens.css` and `bundle.css` from the Azentrius Design System, with the commit they come from. `npm run design` writes `src/styles/tokens.css` and `src/styles/theme.css` from them. |
| `public/fonts/` | DM Sans, DM Serif Display and Red Hat Mono, with their licenses. |
| `deploy/` | How the server takes each release: the sync service and its units, the nginx site, `setup.sh`. |

### A new project page

1. Add the project to `TOOL_SLUGS` in `src/data/routes.mjs`, to the `slug` list in
   `src/content.config.ts` and to `TOOLS` in `src/data/tools.ts`, with its screenshots under
   `src/assets/screenshots/<slug>/`.
2. Write `src/content/tools/en/<slug>.md` and `src/content/tools/de/<slug>.md`.
3. `npm run build`.

### A new version of a project

Nothing to do in the texts: `npm run build` reads the latest releases from GitHub. Commit the updated
`src/data/versions.json` with the next change, so a build without network shows the same.

## Releases

Actions › **release** › Run workflow, on `main`, after giving the version in `package.json` a dated
section in `CHANGELOG.md` (`## 0.1.0 – 2026-10-20`). The workflow builds and checks the site and
publishes `azentrius-website-VERSION.tar.gz` with `SHA256SUMS` and a signed build provenance:

```sh
sha256sum -c SHA256SUMS
gh attestation verify azentrius-website-VERSION.tar.gz --repo Azentrius/website
```

`npm run pack` makes the same archive locally; the same `dist/` gives the same archive.

### Open facts for the legal text update

The text review of 2026-10-19 corrects the analytics description, email processing, objection rights
and product claims in both languages. Before publishing this update, resolve the following facts:

- Add the operator's additional rapid contact channel to both legal notices, where § 5 DDG applies.
  No phone number or contact form has been invented.
- Confirm the retention period or actual deletion criteria for Plausible event and session records
  and add them to both privacy pages. Rotation of the daily salt does not delete those records.
- Verify the existing claims about anonymised server logs and a maximum retention of 14 days against
  the active log format, rotation, error logs and analytics proxy logs. The repository only refers to
  the server's `anonymized` format; it does not define it or the global retention settings.
- Confirm the email provider, any forwarding/other recipients and processing locations, then add
  them to the recipient section. Public MX records point to Hetzner, but do not establish the full
  processing chain. The newly drafted email deletion criteria must also match actual handling.
- Assess the actual Plausible setup under § 25 TDDDG and the GDPR, including scroll depth and active
  time measurement. Cookie-free operation alone does not resolve this question. The existing
  Art. 6 (1) (f) GDPR basis has not been independently approved by this text update.

The review does not change server configuration or publish a release. Its source references are
[Plausible's data policy](https://plausible.io/data-policy), the
[DSK guidance on digital services](https://www.datenschutzkonferenz-online.de/media/oh/OH_Digitale_Dienste.pdf)
and [CJEU C-298/07](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=celex%3A62007CJ0298).

## License

The code is licensed under the [Apache License 2.0](LICENSE). The texts of the website and the
Azentrius marks are not; see [NOTICE](NOTICE) for these and for the fonts and design tokens included.
