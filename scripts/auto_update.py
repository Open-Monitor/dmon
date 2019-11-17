import argparse
import json
import subprocess
import os
import requests

releases_url = "https://api.github.com/repos/Open-Monitor/dmon/releases"


def get_running():
    with open('version.txt', 'r') as f:
        running_release = f.readline().strip('\n')
    return running_release


def update_running(release):
    with open('version.txt', 'w') as f:
        f.write(str(release))


def try_kill(r):
    try:
        running_client = subprocess.check_output(["pidof", './client'])
        running_client = running_client.decode("utf-8").replace("\n", "")
        subprocess.call(['kill', running_client])
        open('client', 'wb').write(r.content)
        return True
    except Exception as e:
        return False
    return False

def download(url, release, ip):
    print("Dowloading new release...")
    print(url);
    update_running(release)

    req = requests.get(url, allow_redirects=True)
    was_killed = try_kill(req)

    os.chmod('client', 0o775)
    if was_killed:
        print("Old process was killed, now restarting...")
    try:
        subprocess.Popen(['nohup', './client', ip])
    except Exception as e:
        print("Failed to start:", str(e))


def check_releases(ip):
    rel = requests.get(releases_url).json()
    current_release = rel[0]['id']
    running_release = get_running()
    if running_release != current_release:
        download(rel[0]['assets'][0]['browser_download_url'],
                 current_release, ip)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--ip', type=str,
        help="Enter ip and port of target ex. 100.100.100.10:50486")
    args = parser.parse_args()
    print(args.ip)
    check_releases(args.ip)
