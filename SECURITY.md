# Security Policy

## Reporting a vulnerability

Please do **not** open a public issue for security problems.

Report them privately through GitHub instead:
[Report a vulnerability](https://github.com/Azentrius/website/security/advisories/new)
(tab **Security → Report a vulnerability** in this repository), or write to
[support@azentrius.com](mailto:support@azentrius.com).

Please include what is affected (page, address, release), steps to reproduce and the impact you expect.

We aim to acknowledge reports within 7 days. This is a small project, so a fix may take longer; we will
keep you informed and credit you in the advisory unless you prefer to stay anonymous.

Problems in one of the projects belong to that project's repository; each has its own security policy.

## What the website is

A static site: HTML, CSS, fonts, images and one small script for the copy buttons. There are no forms,
no accounts and no server-side code. The only third-party request is the Plausible script from
analytics.azentrius.com, which we host ourselves.

- No inline scripts or styles and no event handler attributes; `npm run check` fails the build if one
  appears. That allows a Content Security Policy without `unsafe-inline` (see `deploy/nginx.conf`).
- Every release is built by `.github/workflows/release.yml` from a commit on `main`, with
  `SHA256SUMS` and a signed build provenance, so anyone can check where a release comes from:
  `gh attestation verify azentrius-website-VERSION.tar.gz --repo Azentrius/website`.
