import uuid from 'uuid';

import {liveSocketPool} from '../bridge';

export default async (socket) => {
  const connectionInstance = uuid.v4();
  socket.on('subscribeToLiveTransmission', async (ips) => {
    liveSocketPool.register(
        connectionInstance,
        (data) => {
          socket.emit(
              'liveTransmission',
              data,
          );
        });
  });

  socket.on(
      'disconnect',
      () => liveSocketPool.unregister(connectionInstance),
  );
};
