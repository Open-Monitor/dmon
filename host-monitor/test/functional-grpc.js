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

const ips = ['31', '51', '513241'];

const makeRequest = (client, data) => {
  const call = client.transmit();
  call.on('data', (p) => {
    data.push(p);
  });

  call.on('end', () => {
    if (data.length !== TRANSMIT_PACKETS.length) {
      console.log('[Fail]: Func Test Failed');
    }

    console.log('[Success] Func Test Passed');
  });

  call.on('error', (err) => {
    console.log('error occured: ', err);
  });

  for (let i = 0; i < TRANSMIT_PACKETS.length; i++) {
    call.write({
      MemoryUsed: Math.random() * 200,
      MemoryAvailable: Math.random() * 200,
      MemoryTotal: Math.random() * 200,
      hostName: ips[~~(Math.random() * 2)],
      CpuUsage: 4.0,
      UpTime: 5.0,
      DeviceID: 'example_device',

      Version: 'basic',
      IP: ips[~~(Math.random() * 2)],
    });
  }

  call.end();

}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const doThings = async () => {
  while(true) {
    const client = createGrpcClient(manifest.grpc);
    const data = [];
    
    makeRequest(client, data);
    
    console.log('request completed!');
  
    await sleep(1000)
  }
}

doThings();