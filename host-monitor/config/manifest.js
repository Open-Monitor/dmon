const manifest = (env) => ({
  grpc: ({
    dev: 'localhost:50051',
    prod: 'localhost:50051',
  })[env],
});

export default manifest(
    process.env.NODE_ENV,
);
