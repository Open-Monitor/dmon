#include <iostream>
#include <string>
#include <thread>
#include <chrono>

#include <functional>

#include <grpc/grpc.h>
#include <grpcpp/channel.h>
#include <grpcpp/client_context.h>
#include <grpcpp/create_channel.h>
#include <grpcpp/security/credentials.h>

#include "service-guide.grpc.pb.h"
#include "../include/networkMon.h"
#include "../include/systemMon.h"

using grpc::Channel;
using grpc::ClientContext;
using grpc::ClientReader;
using grpc::ClientReaderWriter;
using grpc::ClientWriter;
using grpc::Status;

using hostService::HostService;
using hostService::TransmitPacket;
using hostService::TransmitResponse;

TransmitPacket MakeTransmitPacket() {
  NetworkMonitor networkMon = NetworkMonitor();
  SystemMonitor systemMon = SystemMonitor();


  NetworkMonitor::bandwidthStruct bStruct = networkMon.getBandwidth();
  NetworkMonitor::ipStruct ip = networkMon.getIPV4Addr();
  SystemMonitor::versionStruct vStruct = systemMon.getVersion();
  SystemMonitor::memoryStruct mem = systemMon.getMem();
  std::hash<std::string> str_hash;
  std::string deviceID = std::to_string(str_hash(ip.addr.c_str()));
  double x = systemMon.getCpu();
  TransmitPacket n;
  n.set_memoryused(mem.memUsed);
  n.set_memoryavailable(mem.freeMem);
  n.set_memorytotal(mem.totalMem);
  n.set_cpuusage(x);
  n.set_uptime(systemMon.getUptime());
  n.set_version(vStruct.versionTag);
  n.set_ip(ip.addr.c_str());
  n.set_deviceid(deviceID);
  n.set_inboundbandwithbytes(bStruct.r_bytes);
  n.set_outboundbandwithbytes(bStruct.t_bytes);
  n.set_inboundbandwithpackets(bStruct.r_packets);
  n.set_outboundbandwithpackets(bStruct.t_packets);
  return n;
}

class RouteGuideClient {
  public:
    RouteGuideClient(std::shared_ptr<Channel> channel)
      : stub_(HostService::NewStub(channel)) {}

    void RouteChat() {
      ClientContext context;
      std::shared_ptr<ClientReaderWriter<TransmitPacket, TransmitResponse> > stream(
          stub_->Transmit(&context));

        std::thread writer([stream]() {
            std::vector<TransmitPacket> notes{
              MakeTransmitPacket(),
            };
            for (const TransmitPacket& note : notes) {
              std::cout << "Sending message..." << std::endl;
            stream->Write(note);
            }
            stream->WritesDone();
        });

        TransmitResponse server_note;
        while (stream->Read(&server_note)) {
          if (server_note.didinsert() == 1)
            std::cout << "Insertion Complete" << std::endl;
          else
            std::cout << "Insertion Failed" << std::endl;
        }
        writer.join();
        Status status = stream->Finish();
        if (!status.ok()) {
          std::cout << "RouteChat rpc failed." << std::endl;
        }
    }
  private:
    std::unique_ptr<HostService::Stub> stub_;
};
int main(int argc, char** argv) {
  RouteGuideClient guide(
      grpc::CreateChannel("localhost:50486", grpc::InsecureChannelCredentials()));
  std::cout << "-------------- RouteChat --------------" << std::endl;
  while (true) {
    guide.RouteChat();
    std::this_thread::sleep_for(std::chrono::seconds(2));
  }
  return 0;
}
