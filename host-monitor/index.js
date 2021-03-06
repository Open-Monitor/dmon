import grpc from 'grpc';
import io from 'socket.io';

import manifest from './config/manifest';
import {loadProto} from './lib/utils';
import {transmitHandler} from './lib/rpc-handlers';
import {liveWebSocketHandler} from './lib/ws-handlers';

const ws = io();
const PROTO_PATH = __dirname + '/../protos/service-guide.proto';
const protoDescriptor = loadProto(PROTO_PATH);

const server = new grpc.Server();

const bidirectionalHandler = (handler) => (call) => {
  const resolvedHandlers = [];
  call.on('data', async (transmitPacket) => {
    resolvedHandlers.push(new Promise(async (res) => {
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

server.addService({
  ...protoDescriptor.HostService.service,
  Transmit: {
    ...protoDescriptor.HostService.service.Transmit,
    requestDeserialize: (raw) => ({
      raw,
      request: protoDescriptor
          .HostService
          .service
          .Transmit
          .requestDeserialize(raw),
    }),
  },
}, {
  transmit: bidirectionalHandler(transmitHandler),
});

server.bind(manifest.grpc, grpc.ServerCredentials.createInsecure());
server.start();

console.log(`gRPC Server running at ${manifest.grpc}`);

ws.of('/live').on('connection', liveWebSocketHandler);

console.log(`ws server started on port ${4020}`);
ws.listen(4020);
