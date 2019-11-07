const grpc = require('grpc');
const protoloader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../proto/service-guide.proto';

const createGrpcClient = (serviceURL) => {
  const protoDescriptor = grpc.loadPackageDefinition(protoloader.loadSync(
      PROTO_PATH,
      {
        keepCase: true,
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

const TRANSMIT_PACKET = {
  MemoryUsed: 11,
  MemoryAvailable: 22,
  MemoryTotal: 33,

  CpuUsage: 4.0,
  UpTime: 5.0,

  Version: 'basic',
  IP: 'duh',

  InboundBandwith: 2,
  OutboundBandwith: 9,
};

// basic functional test
// will determine if the service is up
describe('host-monitor functional', () => {
  it('should connect to host successfully', () => {
    const client = createGrpcClient('localhost:50051');
    expect(client.transmit(TRANSMIT_PACKET));
  });
});
