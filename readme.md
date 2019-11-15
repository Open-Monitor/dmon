# Open Monitor
Open Monitor is a server infrastructure tool used to monitor server instances.

### Startup

#### Elastic-Search (Docker)
To start, please first by downloading docker on your respectful system. After docker is installed, run `./docker-elastic-build.sh` in your terminal. After, elastic search should be successfully dockerized.

#### Host-Monitor
Before starting the host monitor service, please have an elastic search instance running.

To run the host monitor, please ensure that nodeJs is installed on your machine. After, run `npm i` to install all of the dependencies required to run the service, then `npm start` to start the service.

#### Client-Monitor
After elastic search and the host-monitor is running, install the client-monitor on the target server.

Edit config.js with the IP address of the target host-server, and run `./client`, or `nohup ./client &` to run the service in the background without ssh interruption.
The client-monitor was compiled on Ubuntu 18.04, and some older versions of Ubuntu 16.04 will require libstdc++ version GLIBCXX_3.4.22 which can be installed by following the instructions [here](https://github.com/lhelontra/tensorflow-on-arm/issues/13#issuecomment-418202182).

### Usage
#### Local Machine
To run on your local machine, start by cloning the repo and getting the host-monitor and web server running.
```
git clone https://github.com/Open-Monitor/dmon.git
cd dmon/

cd /host-monitor
npm i && npm start

cd /dmon-web
npm i && npm start
```
Next you want to start the client-monitor.
```
cd metrics-agent/
./client
```
You should begin to see the web-server receciving information, and graphs will begin to populate.

#### External Machine
Follow the same instructions as above, except you will need to change the IPs in the relevant config files.
The metrics-agent should contain the public IP:PORT of the target host-monitor.

The host-monitor's IP should be it's local IP. You may need to configure your network with port-forwarding.


### Deployment Model
View deployment model [here](./docs/deployment-model.md)

### Contributing
