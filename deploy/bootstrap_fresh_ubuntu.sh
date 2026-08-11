#!/usr/bin/env bash
# Fresh Ubuntu bootstrap for Pinjin static site
# Usage (on server):
#   sudo bash bootstrap_fresh_ubuntu.sh /path/to/pinjin-dist.tar.gz
set -euo pipefail

ARCHIVE="${1:-/root/pinjin-dist.tar.gz}"
WEB_ROOT="/var/www/pinjin/dist"

if [[ ! -f "$ARCHIVE" ]]; then
  echo "Archive not found: $ARCHIVE"
  echo "Upload pinjin-dist.tar.gz first, then rerun."
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y nginx curl

mkdir -p "$WEB_ROOT"
rm -rf "${WEB_ROOT:?}/"*
tar -xzf "$ARCHIVE" -C "$WEB_ROOT"

cat >/etc/nginx/sites-available/pinjin <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/pinjin/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    error_page 404 /index.html;
}
EOF

ln -sfn /etc/nginx/sites-available/pinjin /etc/nginx/sites-enabled/pinjin
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl restart nginx

# Open firewall if ufw exists
if command -v ufw >/dev/null 2>&1; then
  ufw allow 80/tcp || true
  ufw allow 22/tcp || true
fi

curl -sI http://127.0.0.1/ | head -15
curl -sI http://127.0.0.1/products | head -10
echo "BOOTSTRAP_OK"
echo "Open security group TCP 80 if site not reachable from Internet."
