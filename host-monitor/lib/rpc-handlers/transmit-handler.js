import manifest from '../../config/manifest';
import {Types} from '../../logger';

import {unixNow, ElasticClient} from '../helpers';
import {CLIENT_CREATED} from '../constants/elastic';
import {liveSocketPool} from '../../lib/bridge';

export default async ({raw, marshalCb}) => {
  manifest.logger(Types.LOG, request);

  // writes to an open socket if found
  liveSocketPool.writeSocket(
      request.IP, request,
  );

  const elasticResp = await ElasticClient.index(
      'transmission',
      {
        ...marshalCb(raw),
        IndexedOn: unixNow(),
      },
  );

  return {
    DidInsert: elasticResp === CLIENT_CREATED,
    FrequencyAdjustment: 2000, // todo: actually compute this.
  };
};
