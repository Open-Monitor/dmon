import grpc from 'grpc';

const protoLoader = require('@grpc/proto-loader');

export default (path) => {
  const packageDefinition = protoLoader.loadSync(
      path,
      {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });

  return grpc.loadPackageDefinition(
      packageDefinition,
  ).hostService;
};
