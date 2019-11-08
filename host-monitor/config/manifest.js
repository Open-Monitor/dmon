const manifest = (env) => ({
  grpc: ({
    dev: 'localhost:50051',
    prod: 'localhost:50051',
  })[env],
  elastic: ({
    dev: 'http://localhost:9200',
    prod: 'http://localhost:9200',
  })[env],
});

export default manifest(
    process.env.NODE_ENV,
);
