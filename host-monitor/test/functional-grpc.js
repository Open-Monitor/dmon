import manifest from '../config/manifest';

const grpc = require('grpc');
const protoloader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../../protos/service-guide.proto';

const createGrpcClient = (serviceURL) => {
  const protoDescriptor = grpc.loadPackageDefinition(protoloader.loadSync(
      PROTO_PATH,
      {
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
  )).hostService;

  const GrpcInstance = protoDescriptor.HostService;

  return new GrpcInstance(
      serviceURL,
      grpc.credentials.createInsecure(),
  );
};

const TRANSMIT_PACKETS = [{
  MemoryUsed: 11,
  MemoryAvailable: 22,
  MemoryTotal: 33,
  hostName: 'some host',
  CpuUsage: 4.0,
  UpTime: 5.0,

  DeviceID: 'example_device',

  Version: 'basic',
  IP: 'duh2',

  InboundBandwith: 2,
  OutboundBandwith: 9,
}];

const client = createGrpcClient(manifest.grpc);
const data = [];

// todo: add db validation to test.

const call = client.transmit();
call.on('data', (p) => {
  data.push(p);
});

call.on('end', () => {
  console.log(data);
  if (data.length !== TRANSMIT_PACKETS.length) {
    console.log('[Fail]: Func Test Failed');
  }

  console.log('[Success] Func Test Passed');
});

call.on('error', (err) => {
  console.log('error occured: ', err);
});

for (let i = 0; i < TRANSMIT_PACKETS.length; i++) {
  call.write(TRANSMIT_PACKETS[i]);
}

call.end();
