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
| `src/data/tools.ts` | The projects: names, category, status, license, screenshots or app sign. |
| `src/data/routes.mjs` | Every page pair by key; canonical, `hreflang`, language switch and sitemap use it. |
| `src/data/versions.json` | The latest release of each project; `npm run versions` updates it from GitHub. |
| `src/i18n/ui.ts` | Labels of the interface in both languages. |
| `src/components/`, `src/layouts/` | The page templates. |
| `src/styles/site.css` | The site's own styles, from the design system's tokens only. |
| `vendor/design-system/` | `tokens.css` and `bundle.css` from the Azentrius Design System, with the commit they come from. `npm run design` writes `src/styles/tokens.css` and `src/styles/theme.css` from them. |
| `public/fonts/` | DM Sans, DM Serif Display and Red Hat Mono, with their licenses. |
| `deploy/` | How the server takes each release: the sync service and its units, the nginx site, `setup.sh`. |

### A new project page

1. `src/data/routes.mjs`: the slug in `TOOL_SLUGS`.
2. `src/content.config.ts`: the slug in the `slug` list.
3. `src/data/tools.ts`: the slug in `ToolSlug` and an entry in `TOOLS`, where its place sets the order on
   the site. `name` sets the product name as the design system does: `dot: true` for the gold dot
   ("Cron Jobs."), `suffix` for the part in italics ("Image Update *Monitor*"). Screenshots go under
   `src/assets/screenshots/<slug>/`; a project without any gets its app sign from `src/assets/icons/`
   as `icon`. A new `category` also needs `CATEGORY_ORDER` and the group titles in
   `src/components/ProjectsPage.astro`.
4. `src/data/related.ts`: an entry in `PAIRS`, and the slug in the entries of the projects that
   belong with it.
5. `scripts/versions.mjs`: the repository in `REPOS`; `npm run versions` then adds it to
   `src/data/versions.json`.
6. `src/components/ProjectsPage.astro`: how it is installed (`install`, in both languages). Check
   whether the descriptions of the projects page and of the start page (`HomePage.astro`) and the
   start page's lead still name what there is.
7. Write `src/content/tools/en/<slug>.md` and `src/content/tools/de/<slug>.md`: a title of 10 to 60
   and a description of 50 to 155 characters, an `alt` text for every picture key (`icon` for the
   app sign).
8. `npm run build`. `scripts/check-dist.mjs` then checks the page pair, the lengths and the links.

### A new version of a project

Nothing to do in the texts: `npm run build` reads the latest releases from GitHub. Commit the updated
`src/data/versions.json` with the next change, so a build without network shows the same.

The live site shows the versions its release was built with: it changes only with a new release of
the website (see Releases). A project's new release therefore reaches azentrius.com with the next
website release, not before.

## Releases

Actions › **release** › Run workflow, on `main`, after giving the version in `package.json` a dated
section in `CHANGELOG.md` (`## 0.1.0 – 2026-10-20`). The workflow builds and checks the site and
publishes `azentrius-website-VERSION.tar.gz` with `SHA256SUMS` and a signed build provenance:

```sh
sha256sum -c SHA256SUMS
gh attestation verify azentrius-website-VERSION.tar.gz --repo Azentrius/website
```

`npm run pack` makes the same archive locally; the same `dist/` gives the same archive.

## License

The code is licensed under the [Apache License 2.0](LICENSE). The texts of the website and the
Azentrius marks are not; see [NOTICE](NOTICE) for these and for the fonts and design tokens included.
