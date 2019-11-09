import grpc from 'grpc';
import {loadProto} from './lib/helpers';
import {transmitHandler} from './lib/rpc-handlers';
import manifest from './config/manifest';
import {activeStateManager} from './lib/bridge';

const PROTO_PATH = __dirname + '/../protos/service-guide.proto';

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
console.log(`gRPC Server running at ${manifest.grpc}`);
server.start();


import io from 'socket.io';
const ws = io();

ws.of('/live').on('connection', async (socket) => {
  socket.on('subscribeToLiveTransmission', async ({transmissionID}) => {
    activeStateManager.register(
        transmissionID,
        (data) => {
          socket.emit(
              'liveTransmission',
              data,
          );
        });
  });
  socket.on('disconnect', () => {
    activeStateManager.unregister();
  });
});

console.log(`ws server started on port ${4020}`);
ws.listen(4020);
