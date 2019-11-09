import manifest from '../../config/manifest';
import {unixNow} from '../helpers';
import {activeStateManager} from '../../lib/bridge';

import {Client} from '@elastic/elasticsearch';

const client = new Client({node: manifest.elastic});

export default async (request) => {
  const updatedRequest = {
    ...request,
    IndexedOn: unixNow(),
  };

  // checks if a bridge connection is requested
  if (activeStateManager.isRegistered(request.IP)) {
    activeStateManager.writeSocket(
        request.IP, updatedRequest,
    );
  }

  const insertResp = await client.index({
    index: 'transmissions',
    body: {
      ...updatedRequest,
    },
  });

  return {
    DidInsert: insertResp.body.result === 'created',
    FrequencyAdjustment: 1,
  };
};
