# Deploying azentrius.com

azentrius.com runs on public-host with nginx. The server takes every new release of this repository
by itself, the same way `packages.azentrius.com` takes its packages
([Azentrius/packages](https://github.com/Azentrius/packages), `server/`).

## How a release gets live

1. A release is made with `.github/workflows/release.yml`: `azentrius-website-VERSION.tar.gz`,
   `SHA256SUMS` and a signed build provenance.
2. Every 15 minutes `azentrius-website.timer` runs `azentrius-website sync`. It takes the latest
   release only if
   - the SHA-256 of the archive matches `SHA256SUMS` and the digest GitHub reports, and
   - `gh attestation verify` confirms that `.github/workflows/release.yml` of `Azentrius/website`
     built it.
3. It unpacks the archive to `/var/www/azentrius-website/releases/VERSION/` (only files and folders
   inside the one top folder are accepted) and switches the link `/var/www/azentrius-website/current`
   to it in one step. nginx serves `current`; nothing reloads.
4. The newest three releases stay.

The service runs as the user `azentrius-website`, may write only `/var/www/azentrius-website` and
`/var/lib/azentrius-website`, and needs no GitHub token: releases and attestations of a public
repository are public.

## Commands on the server

```sh
sudo systemctl start azentrius-website      # look for a new release now
journalctl -u azentrius-website -n 20       # what it did
azentrius-website list                      # unpacked releases, * is live
sudo -u azentrius-website azentrius-website use 0.1.0    # go back to an earlier release
```

## Files

| File | Installed as |
| --- | --- |
| `azentrius-website.py` | `/usr/local/bin/azentrius-website` |
| `azentrius-website.service`, `azentrius-website.timer` | `/etc/systemd/system/` |
| `nginx.conf` | `/etc/nginx/sites-available/azentrius.com` |
| `setup.sh` | sets up or updates all of it: `sudo sh deploy/setup.sh`, with `--nginx` also the site |

`nginx.conf` keeps what the site had before: HTTP to HTTPS, www to the bare name, the certificate,
Strict-Transport-Security and the folder for certificate renewal (`/var/www/azentrius.com`, certbot
webroot). New are the root, a Content Security Policy without `unsafe-inline`, caching, the 404 page
and redirects from the previous site's `/impressum.html`, `/datenschutz.html` and `/sitemap.xml`.
