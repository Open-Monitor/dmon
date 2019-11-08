import grpc from 'grpc';
import { loadProto } from './lib/helpers';
import { transmitHandler } from './lib/rpc-handlers';
import manifest from './config/manifest';

const PROTO_PATH = __dirname + '/proto/service-guide.proto';
const protoDescriptor = loadProto(PROTO_PATH);

const server = new grpc.Server();

const bidirectionalHandler = (handler) => {
  return (call) => {
    const resolvedHandlers = [];
    call.on('data', async (transmitPacket) => {
      resolvedHandlers.push(new Promise(async (res, rej) => {
        const handlerOutput = await handler(
          transmitPacket,
        );
        call.write(handlerOutput);
        res();
      }));
      console.log(transmitPacket);
    });
    call.on('end', async () => {
      await Promise.all(resolvedHandlers);

      call.end();
    });
  };
};

server.addService(protoDescriptor.HostService.service, {
  transmit: bidirectionalHandler(transmitHandler),
});

server.bind(manifest.grpc,
  grpc.ServerCredentials.createInsecure());
console.log(`Server running at ${manifest.grpc}`);
server.start();
