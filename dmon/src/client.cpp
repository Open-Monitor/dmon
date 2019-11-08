#include <chrono>
#include <iostream>
#include <memory>
#include <random>
#include <string>
#include <thread>

#include <grpc/grpc.h>
#include <grpcpp/channel.h>
#include <grpcpp/client_context.h>
#include <grpcpp/create_channel.h>
#include <grpcpp/security/credentials.h>
#include "../protos/service-guide.grpc.pb.h"

using grpc::Channel;
using grpc::ClientContext;
using grpc::ClientReader;
using grpc::ClientReaderWriter;
using grpc::ClientWriter;
using grpc::Status;

using hostService::HostService;
using hostService::TransmitPacket;
using hostService::TransmitResponse;

TransmitPacket MakeTransmitPacket(long value) {
  TransmitPacket n;
  n.set_memoryused(value);
  n.set_memoryavailable(2);
  n.set_memorytotal(2);
  n.set_cpuusage(2.2);
  n.set_uptime(4.4);
  n.set_version("bob");
  n.set_deviceid("123");
  n.set_inboundbandwith(1);
  n.set_outboundbandwith(1);
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
            MakeTransmitPacket(0),
            MakeTransmitPacket(1),
            MakeTransmitPacket(1),
            MakeTransmitPacket(0)
          };
          for (const TransmitPacket& note : notes) {
            std::cout << "Sending message " << note.memoryused() << std::endl;
            stream->Write(note);
          }
          stream->WritesDone();
      });

      TransmitResponse server_note;
      while (stream->Read(&server_note)) {
        std::cout << "Got message " << server_note.didinsert() << std::endl;
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
      grpc::CreateChannel("localhost:50051", grpc::InsecureChannelCredentials()));
  std::cout << "-------------- RouteChat --------------" << std::endl;
  guide.RouteChat();
  return 0;
}
