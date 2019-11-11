import {prodLogger, devLogger} from '../logger';

const manifest = (env) => ({
  grpc: ({
    dev: 'localhost:50486',
    prod: 'localhost:50486',
    dumbshit: '192.168.1.101:50486',
  })[env],
  elastic: ({
    dev: 'http://localhost:9200',
    prod: 'http://localhost:9200',
    dumbshit: 'http://localhost:9200',
  })[env],
  logger: ({
    dev: devLogger,
    prod: prodLogger,
    dumbshit: devLogger,
  })[env],
});

export default manifest(
    process.env.NODE_ENV,
);
