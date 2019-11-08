import manifest from '../../config/manifest';
import {unixNow} from '../helpers';

import {Client} from '@elastic/elasticsearch';

const client = new Client({node: manifest.elastic});

export default async (request) => {
  const insertResp = await client.index({
    index: 'transmissions',
    body: {
      ...request,
      IndexedOn: unixNow(),
    },
  });

  return {
    DidInsert: insertResp.body.result === 'created',
    FrequencyAdjustment: 0,
  };
};

