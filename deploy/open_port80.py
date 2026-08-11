import os
import re

import paramiko

PASSWORD = os.environ["PINJIN_SSH_PASSWORD"]


def remote(cmd: str) -> tuple[int, str]:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect("139.129.26.73", username="root", password=PASSWORD, timeout=60)
    _stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode() + stderr.read().decode()
    code = stdout.channel.recv_exit_status()
    client.close()
    return code, out


def main() -> None:
    code, out = remote("aliyun configure list 2>&1; echo '---'; aliyun ecs DescribeInstances --RegionId cn-qingdao --InstanceIds '[\"i-m5e1uvqmocb3pqznb7lz\"]' 2>&1 | head -c 4000")
    print(out)

    code, out = remote(
        "aliyun ecs DescribeInstances --RegionId cn-qingdao "
        "--InstanceIds '[\"i-m5e1uvqmocb3pqznb7lz\"]' 2>&1"
    )
    print("==== describe")
    print(out[:5000])

    # Extract security group ids
    sgs = re.findall(r'"SecurityGroupId"\s*:\s*"([^"]+)"', out)
    print("SGs:", sgs)

    for sg in sorted(set(sgs)):
        print("==== authorize", sg)
        code, out = remote(
            "aliyun ecs AuthorizeSecurityGroup --RegionId cn-qingdao "
            f"--SecurityGroupId {sg} "
            "--IpProtocol tcp --PortRange 80/80 "
            "--SourceCidrIp 0.0.0.0/0 "
            "--Description 'Pinjin website HTTP' 2>&1"
        )
        print(code, out)


if __name__ == "__main__":
    main()
