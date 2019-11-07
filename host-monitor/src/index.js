import grpc from 'grpc';
import {loadProto} from './helpers';

const PROTO_PATH = __dirname + '/../proto/service-guide.proto';
const protoDescriptor = loadProto(PROTO_PATH);

const server = new grpc.Server();

server.addService(protoDescriptor.HostService.service, {
  transmit: function(call, callback) {
    return {didInsert: true, frequencyAdjustment: 0};
  },
});

server.bind('localhost:50051',
    grpc.ServerCredentials.createInsecure());
console.log('Server running at http://localhost:50051');
server.start();
