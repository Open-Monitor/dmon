import manifest from '../../config/manifest';

import { Client } from '@elastic/elasticsearch';
import { CLIENT_FAILED } from '../constants/elastic';

const client = new Client({ node: manifest.elastic });

export const index = async (index, request) => {
  try {
    const resp = await client.index({
      index: index,
      body: {
        ...request,
      },
    });

    return resp.body.result;
  } catch (e) {
    // manifest.logger('error', e);
    return CLIENT_FAILED;
  }
};
