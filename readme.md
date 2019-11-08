# Open Monitor 
Open Monitor is a server infrastructure tool used to monitor server instances. 

### Startup

#### Elastic-Search (Docker)
To start, please first by downloading docker on your respectful system. After docker is installed, run `./docker-elastic-build.sh` in your terminal. After, elastic search should be successfully dockerized. 

#### Host-Monitor
Before starting the host monitor service, please have an elastic search instance running. 

To run the host monitor, please ensure that nodeJs is installed on your machine. After, run `npm i` to install all of the dependencies required to run the service, then `npm start` to start the service. 

### Usage
### Deployment Model
View deployment model [here](./docs/deployment-model.md)

### Contributing
