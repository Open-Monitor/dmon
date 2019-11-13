import manifest from '../../config/manifest';
import {Types} from '../../logger';

import {unixNow, ElasticClient} from '../helpers';
import {CLIENT_CREATED} from '../constants/elastic';
import {liveSocketPool} from '../../lib/bridge';

export default async (request) => {
  manifest.logger(Types.LOG, request);
  const updatedRequest = {
    ...request,
    IndexedOn: unixNow(),
  };

  // writes to an open socket if found
  liveSocketPool.writeSocket(
      request.IP, updatedRequest,
  );
  console.log(updatedRequest);

  const elasticResp = await ElasticClient.index(
      'transmission',
      updatedRequest,
  );

  return {
    DidInsert: elasticResp === CLIENT_CREATED,
    FrequencyAdjustment: 2000, // todo: actually compute this.
  };
};
