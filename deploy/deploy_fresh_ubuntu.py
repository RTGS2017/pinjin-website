"""DEPRECATED: ECS bootstrap + deploy. Prefer GitHub Pages (see README).

Bootstrap + deploy to a fresh Ubuntu server (single SSH attempt).
"""
from __future__ import annotations

import io
import os
import tarfile
from pathlib import Path

import paramiko

HOST = os.environ.get("PINJIN_SSH_HOST", "139.129.26.73")
USER = os.environ.get("PINJIN_SSH_USER", "root")
PASSWORD = os.environ.get("PINJIN_SSH_PASSWORD", "")
ROOT = Path(__file__).resolve().parents[1]
LOCAL_DIST = ROOT / "dist"
REMOTE_ARCHIVE = "/root/pinjin-dist.tar.gz"
BOOTSTRAP = Path(__file__).resolve().parent / "bootstrap_fresh_ubuntu.sh"


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


def make_tar_bytes(dist: Path) -> bytes:
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as tar:
        for path in dist.rglob("*"):
            if path.is_file():
                tar.add(path, arcname=str(path.relative_to(dist)).replace("\\", "/"))
    return buf.getvalue()


def main() -> None:
    if not LOCAL_DIST.exists():
        raise SystemExit(f"dist not found: {LOCAL_DIST}")
    if not PASSWORD:
        raise SystemExit("Set PINJIN_SSH_PASSWORD")
    if not BOOTSTRAP.exists():
        raise SystemExit(f"missing {BOOTSTRAP}")

    print("SSH connect (single attempt)...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
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

    print("packing dist...")
    payload = make_tar_bytes(LOCAL_DIST)
    print(f"upload archive ({len(payload) // 1024} KB)...")
    sftp = client.open_sftp()
    with sftp.file(REMOTE_ARCHIVE, "wb") as f:
        f.write(payload)
    with sftp.file("/root/bootstrap_fresh_ubuntu.sh", "w") as f:
        f.write(BOOTSTRAP.read_text(encoding="utf-8"))
    sftp.close()

    run(client, "chmod +x /root/bootstrap_fresh_ubuntu.sh")
    code = run(client, "bash /root/bootstrap_fresh_ubuntu.sh /root/pinjin-dist.tar.gz")
    client.close()
    if code != 0:
        raise SystemExit("bootstrap failed")
    print("DEPLOY_OK")
    print("Site: http://139.129.26.73/")


if __name__ == "__main__":
    main()
