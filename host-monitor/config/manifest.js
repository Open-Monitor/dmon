const manifest = (env) => ({
  grpc: ({
    dev: '192.168.1.101:50486',
    prod: '192.168.1.101:50486',
  })[env],
  elastic: ({
    dev: 'http://localhost:9200',
    prod: 'http://localhost:9200',
  })[env],
});

export default manifest(
    process.env.NODE_ENV,
);
