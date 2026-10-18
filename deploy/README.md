# Deploying azentrius.com

**Status: planned, not set up.** The site on the server is still the previous one. This folder
describes how a release is meant to get there; setting it up is a change on public-host and comes
with its own approval.

## How a release gets onto the server

The same way `packages.azentrius.com` takes its packages
([Azentrius/packages](https://github.com/Azentrius/packages), `server/`):

1. A release is made on GitHub with `.github/workflows/release.yml`: `azentrius-website-VERSION.tar.gz`,
   `SHA256SUMS` and a signed build provenance.
2. On public-host, a timer looks for a new release, downloads both files and takes the archive only if
   - its SHA-256 matches `SHA256SUMS` and the digest GitHub reports for the asset, and
   - `gh attestation verify` confirms that `.github/workflows/release.yml` of `Azentrius/website` built
     it.
3. It unpacks the archive to `/var/www/azentrius.com/releases/VERSION/` and switches the symbolic link
   `/var/www/azentrius.com/current` to it in one step. nginx serves `current`; nothing reloads.
4. The last three releases stay. Going back is switching `current` to the previous one.

The service user can write `/var/www/azentrius.com/releases/` and the link, nothing else, and needs no
GitHub token: releases and attestations of a public repository are public.

## nginx

`nginx.conf` holds the lines for the existing `server` block of azentrius.com: the root, caching, the
Content Security Policy and the other headers, the 404 page, and redirects from the previous site's
`/impressum.html` and `/datenschutz.html`. Certificates, `listen`, `server_name`, the
Strict-Transport-Security header and the location for certificate renewal stay as they are.

Before switching, test the policy with `Content-Security-Policy-Report-Only` for a day, and check
`nginx -t` before every reload.

## The switch, in short

1. Backup of `/var/www/azentrius.com` and the nginx site.
2. Install the sync service and timer, run it once: the first release lands in `releases/`.
3. Point `root` at `current` and add the lines from `nginx.conf`; `nginx -t`, reload.
4. Check: every page in both languages, the 404 page, the redirects, the headers, Plausible.
5. Submit `https://azentrius.com/sitemap-index.xml` in Search Console.
