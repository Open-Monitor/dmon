import json
import requests
import subprocess
import os, sys, stat

releases_url = "https://api.github.com/repos/Open-Monitor/dmon/releases"

def get_running():
    with open('version.txt', 'r') as f:
        running_release = f.readline().strip('\n')
    return running_release

def download(url, release):
    print("downloading")
    print(url)
    r = requests.get(url, allow_redirects=True)
    #open('client', 'wb').write(r.content)
    #os.chmod('client', 0o775)
    with open('version.txt', 'w') as f:
        f.write(str(release))
    try:
        running_client = subprocess.check_output(["pidof", './client'])
        print(running_client)
    except CalledProcessError:
        pass
    #subprocess.call(['sudo', 'kill', ''])
    #subprocess.Popen(['./client', '136.60.227.124:50486'])



def check_releases():
    rel = requests.get(releases_url).json()
    current_release = rel[0]['id']
    running_release = get_running()
    if (running_release != current_release):
        download(rel[1]['assets'][0]['browser_download_url'], current_release)


if __name__ == "__main__":
    check_releases()
