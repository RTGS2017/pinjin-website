"""DEPRECATED: ECS/Nginx remote deploy. Prefer GitHub Pages (see README)."""
import os
from pathlib import Path

import paramiko

HOST = os.environ.get("PINJIN_SSH_HOST", "139.129.26.73")
USER = os.environ.get("PINJIN_SSH_USER", "root")
PASSWORD = os.environ.get("PINJIN_SSH_PASSWORD", "")
LOCAL_DIST = Path(__file__).resolve().parents[1] / "dist"
LOCAL_CONF = Path(__file__).resolve().parent / "pinjin.conf"
REMOTE_DIST = "/var/www/pinjin/dist"
REMOTE_CONF = "/etc/nginx/conf.d/pinjin.conf"

NGINX_CONF = r"""# Managed for Pinjin static site
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    include /etc/nginx/conf.d/*.conf;
}
"""


def run(client: paramiko.SSHClient, cmd: str) -> int:
    print(">>", cmd)
    _stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode()
    err = stderr.read().decode()
    code = stdout.channel.recv_exit_status()
    if out:
        print(out)
    if err:
        print(err)
    print("exit", code)
    return code


def upload_dir(sftp: paramiko.SFTPClient, local_dir: Path, remote_dir: str) -> None:
    for root, _dirs, files in os.walk(local_dir):
        rel = os.path.relpath(root, local_dir)
        remote_root = (
            remote_dir if rel == "." else f"{remote_dir}/{rel.replace(os.sep, '/')}"
        )
        try:
            sftp.stat(remote_root)
        except FileNotFoundError:
            sftp.mkdir(remote_root)
        for name in files:
            local_path = os.path.join(root, name)
            remote_path = f"{remote_root}/{name}"
            print("put", local_path, "->", remote_path)
            sftp.put(local_path, remote_path)


def main() -> None:
    if not LOCAL_DIST.exists():
        raise SystemExit(f"dist not found: {LOCAL_DIST}")
    if not PASSWORD:
        raise SystemExit("Set PINJIN_SSH_PASSWORD environment variable before deploy.")

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    # 只连一次，避免重试打满 sshd MaxStartups / 触发防护
    print("SSH connect (single attempt)...")
    try:
        client.connect(
            HOST,
            username=USER,
            password=PASSWORD,
            timeout=90,
            banner_timeout=120,
            auth_timeout=90,
            allow_agent=False,
            look_for_keys=False,
        )
    except Exception as exc:  # noqa: BLE001
        raise SystemExit(f"SSH connect failed: {exc}") from exc

    run(client, "cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak.pinjin || true")
    run(client, f"rm -rf {REMOTE_DIST} && mkdir -p {REMOTE_DIST}")

    sftp = client.open_sftp()
    with sftp.file("/etc/nginx/nginx.conf", "w") as f:
        f.write(NGINX_CONF)
    with sftp.file(REMOTE_CONF, "w") as f:
        f.write(LOCAL_CONF.read_text(encoding="utf-8"))
    upload_dir(sftp, LOCAL_DIST, REMOTE_DIST)
    sftp.close()

    if run(client, "nginx -t") != 0:
        raise SystemExit("nginx -t failed")
    run(client, "systemctl reload nginx")
    run(client, "curl -sI http://127.0.0.1/ | head -20")
    run(client, "curl -sI http://127.0.0.1/products | head -20")
    run(client, "ls -la /var/www/pinjin/dist")
    client.close()
    print("DEPLOY_OK")


if __name__ == "__main__":
    main()
