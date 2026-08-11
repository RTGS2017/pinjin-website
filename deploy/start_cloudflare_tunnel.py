import os
import time

import paramiko

PASSWORD = os.environ.get("PINJIN_SSH_PASSWORD", "Xx18322766509")


def main() -> None:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect("139.129.26.73", username="root", password=PASSWORD, timeout=60)

    def run(cmd: str, timeout: int = 120) -> tuple[int, str]:
        print(">>", cmd)
        _stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
        out = stdout.read().decode() + stderr.read().decode()
        code = stdout.channel.recv_exit_status()
        print(out[-2000:] if len(out) > 2000 else out)
        return code, out

    run(
        "if [ ! -x /usr/local/bin/cloudflared ]; then "
        "curl -L --max-time 120 -o /tmp/cloudflared.tgz "
        "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.tgz "
        "&& tar -xzf /tmp/cloudflared.tgz -C /tmp "
        "&& mv /tmp/cloudflared /usr/local/bin/cloudflared "
        "&& chmod +x /usr/local/bin/cloudflared; fi; "
        "cloudflared --version"
    )

    # Stop previous tunnel if any
    run("pkill -f 'cloudflared tunnel' || true")

    # Start quick tunnel in background, log to file
    run(
        "nohup /usr/local/bin/cloudflared tunnel --url http://127.0.0.1:80 "
        "--no-autoupdate > /var/log/cloudflared-pinjin.log 2>&1 & echo $!"
    )

    url = None
    for _ in range(30):
        time.sleep(2)
        _code, out = run(
            "grep -Eo 'https://[a-zA-Z0-9.-]+\\.trycloudflare\\.com' "
            "/var/log/cloudflared-pinjin.log | tail -1 || true",
            timeout=30,
        )
        candidate = out.strip().splitlines()[-1].strip() if out.strip() else ""
        if candidate.startswith("https://"):
            url = candidate
            break

    print("TUNNEL_URL=", url)
    run("tail -n 40 /var/log/cloudflared-pinjin.log")
    client.close()
    if not url:
        raise SystemExit("Failed to obtain cloudflare tunnel URL")


if __name__ == "__main__":
    main()
