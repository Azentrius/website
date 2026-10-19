#!/bin/sh
# Sets up or updates the delivery of azentrius.com on public-host (Ubuntu, nginx, certbot).
#
#   sudo sh deploy/setup.sh            tools, user, folders, units; one sync run
#   sudo sh deploy/setup.sh --nginx    also install deploy/nginx.conf as the site and reload nginx
#
# Idempotent. The certificate for azentrius.com and www.azentrius.com must exist already (certbot
# webroot /var/www/azentrius.com). nginx is only touched with --nginx, and only after a release is
# live, so the site never points at an empty folder.
# SPDX-License-Identifier: Apache-2.0
set -eu
umask 022
cd "$(dirname "$0")/.."

user=azentrius-website
state=/var/lib/azentrius-website
web=/var/www/azentrius-website
site=/etc/nginx/sites-available/azentrius.com

[ "$(id -u)" = 0 ] || { echo "Run as root." >&2; exit 77; }

echo "== tools"
gh attestation verify --help > /dev/null 2>&1 || { echo "gh with attestation support is missing." >&2; exit 1; }

echo "== user and folders"
if ! id "$user" > /dev/null 2>&1; then
    useradd --system --home-dir "$state" --create-home --shell /usr/sbin/nologin "$user"
fi
install -d -m 700 -o "$user" -g "$user" "$state"
install -d -m 755 -o "$user" -g "$user" "$web" "$web/releases"

echo "== files"
install -m 755 deploy/azentrius-website.py /usr/local/bin/azentrius-website
install -m 644 deploy/azentrius-website.service deploy/azentrius-website.timer /etc/systemd/system/

echo "== timer and first run"
systemctl daemon-reload
systemctl enable --now azentrius-website.timer
systemctl start azentrius-website.service || true
journalctl -u azentrius-website.service -n 20 --no-pager -o cat

if [ "${1:-}" = "--nginx" ]; then
    echo "== nginx"
    [ -f "$web/current/index.html" ] || { echo "No release is live yet; nginx left as it is." >&2; exit 1; }
    backup=/var/backups/websites/azentrius.com.nginx-$(date +%Y%m%d-%H%M%S)
    install -d -m 755 /var/backups/websites
    cp -p "$site" "$backup"
    install -m 644 deploy/nginx.conf "$site"
    ln -sf "$site" /etc/nginx/sites-enabled/azentrius.com
    if ! nginx -t -q; then
        cp -p "$backup" "$site"
        echo "nginx -t failed; the previous site is back in place ($backup)." >&2
        exit 1
    fi
    systemctl reload nginx
fi
echo "Done."
