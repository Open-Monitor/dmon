#include <iostream>
#include <string>
#include <thread>
#include <chrono>

#include <grpc/grpc.h>
#include <grpcpp/channel.h>
#include <grpcpp/client_context.h>
#include <grpcpp/create_channel.h>

#include "service-guide.grpc.pb.h"
#include "../include/networkMon.h"
#include "../include/systemMon.h"

#include "../include/json.hpp"
#include <fstream>

using grpc::Channel;
using grpc::ClientContext;
using grpc::ClientReader;
using grpc::ClientReaderWriter;
using grpc::ClientWriter;
using grpc::Status;

using hostService::HostService;
using hostService::TransmitPacket;
using hostService::TransmitResponse;
using json = nlohmann::json;

bool initalized = false;
std::string clientHostName;
std::string ipAddr;
std::string deviceID;
int responsetime;
NetworkMonitor networkMon;
SystemMonitor systemMon;

void initSystemMonitors() {
  networkMon = NetworkMonitor();
  systemMon = SystemMonitor();

  clientHostName = networkMon.getHostName();
  ipAddr = networkMon.getIPV4Addr();
  std::hash<std::string> str_hash;
  deviceID = std::to_string(str_hash(ipAddr));

  initalized = true;
}

TransmitPacket setStatic(TransmitPacket p) {
  p.set_hostname(clientHostName);
  p.set_ip(ipAddr);
  p.set_deviceid(deviceID);
  return p;
}

TransmitPacket setRAM(TransmitPacket p) {
  SystemMonitor::memoryStruct mem = systemMon.getMem();
  p.set_memoryused(mem.memUsed);
  p.set_memoryavailable(mem.freeMem);
  p.set_memorytotal(mem.totalMem);
  return p;
}

TransmitPacket setNetwork(TransmitPacket p) {
  NetworkMonitor::bandwidthStruct bStruct = networkMon.getBandwidth();
  p.set_inboundbandwithbytes(bStruct.r_bytes);
  p.set_outboundbandwithbytes(bStruct.t_bytes);
  p.set_inboundbandwithpackets(bStruct.r_packets);
  p.set_outboundbandwithpackets(bStruct.t_packets);
  return p;
}

TransmitPacket setSystemTelemetry(TransmitPacket p) {
  SystemMonitor::versionStruct vStruct = systemMon.getVersion();
  double cpu = systemMon.getCpu();
  p.set_cpuusage(cpu);
  p.set_version(vStruct.versionTag);
  p.set_uptime(systemMon.getUptime());
  return p;
}


TransmitPacket MakeTransmitPacket() {
  TransmitPacket p;

  p = setStatic(p);
  p = setRAM(p);
  p = setNetwork(p);
  p = setSystemTelemetry(p);

  return p;
}

class ClientMonitor {
  public:
    ClientMonitor(std::shared_ptr<Channel> channel)
      : stub_(HostService::NewStub(channel)) {}

    void Stream() {
      ClientContext context;
      std::shared_ptr<ClientReaderWriter<TransmitPacket, TransmitResponse> > stream(
          stub_->Transmit(&context));
      sendPackets(stream);
      readResponse(stream);
      handleStatus(stream);
    }


    void handleStatus(std::shared_ptr<ClientReaderWriter<TransmitPacket, TransmitResponse>> stream) {
      Status status = stream->Finish();
      if (!status.ok()) {
        std::cout << "Stream rpc failed." << std::endl;
      }
    }


    void sendPackets(std::shared_ptr<ClientReaderWriter<TransmitPacket, TransmitResponse>> stream) {
      std::thread writer([stream]() {
              std::vector<TransmitPacket> notes{
              MakeTransmitPacket(),
          };

          for (const TransmitPacket& note : notes) {
            stream->Write(note);
          }

          stream->WritesDone();
      });
      writer.join();
    }


    void readResponse(std::shared_ptr<ClientReaderWriter<TransmitPacket, TransmitResponse>> stream) {
      TransmitResponse server_note;
      while (stream->Read(&server_note)) {
        if (server_note.didinsert() == 1) {
          std::cout << "Message insertion successful" << std::endl;
          responsetime = server_note.frequencyadjustment();
        } else {
          std::cout << "Message failed insertion (check that elastic search is running)" << std::endl;
          responsetime = server_note.frequencyadjustment();
        }
      }
    }


  private:
    std::unique_ptr<HostService::Stub> stub_;
};




int main(int argc, char** argv) {
  responsetime = 2000;
  std::string hostIP;
  hostIP = argv[1];


  initSystemMonitors();
  if (initalized == false)
    std::cout << "System Monitor failed to Initalize" << std::endl;

  ClientMonitor guide(grpc::CreateChannel(hostIP, grpc::InsecureChannelCredentials()));
  std::cout << "Client Connecting to " << hostIP << std::endl;

  while (true) {
    guide.Stream();
    std::this_thread::sleep_for(std::chrono::milliseconds(responsetime));
  }
}
