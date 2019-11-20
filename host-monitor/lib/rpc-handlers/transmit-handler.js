import manifest from '../../config/manifest';
import {Types} from '../../logger';

import {unixNow, ElasticClient, calcFreqAdj} from '../utils';
import {CLIENT_CREATED} from '../constants/elastic';
import {liveSocketPool} from '../../lib/bridge';

export default async ({request}) => {
  manifest.logger(Types.LOG, request);

  // writes to an open socket if found
  liveSocketPool.writeSocket(
      request.IP, request,
  );

  const elasticResp = await ElasticClient.index(
      'transmission',
      {
        ...request,
        IndexedOn: unixNow(),
      },
  );

  return {
    DidInsert: elasticResp === CLIENT_CREATED,
    FrequencyAdjustment: calcFreqAdj(liveSocketPool.nClients), 
  };
};
