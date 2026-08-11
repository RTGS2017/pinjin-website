import json
import os
import urllib.request

import paramiko

PASSWORD = os.environ["PINJIN_SSH_PASSWORD"]


def remote(cmd: str) -> str:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect("139.129.26.73", username="root", password=PASSWORD, timeout=30)
    _stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode() + stderr.read().decode()
    client.close()
    return out


print("==== metadata endpoints")
print(
    remote(
        "for base in "
        "http://10.10.10.10/latest/meta-data "
        "http://100.100.100.200/latest/meta-data; do "
        "echo BASE:$base; "
        "curl -s --max-time 3 $base/instance-id; echo; "
        "curl -s --max-time 3 $base/region-id; echo; "
        "curl -s --max-time 3 $base/public-ipv4; echo; "
        "curl -s --max-time 3 $base/eipv4; echo; "
        "curl -s --max-time 3 $base/ram/security-credentials/; echo; "
        "done"
    )
)

print("==== which aliyun")
print(remote("which aliyun || echo NO_ALIYUN_CLI; which aws || echo NO_AWS"))
