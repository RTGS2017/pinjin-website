import os

import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(
    "139.129.26.73",
    username="root",
    password=os.environ["PINJIN_SSH_PASSWORD"],
    timeout=30,
)

cmds = [
    "ss -tlnp",
    "iptables -L INPUT -n -v",
    "iptables -L -n",
    "curl -sI --max-time 5 http://127.0.0.1/",
    "curl -sI --max-time 5 http://139.129.26.73/",
    "ip -4 addr",
    "getenforce || true",
    "systemctl status nginx --no-pager | head -25",
]

for c in cmds:
    print("====", c)
    _stdin, stdout, stderr = client.exec_command(c)
    print(stdout.read().decode() + stderr.read().decode())

client.close()
