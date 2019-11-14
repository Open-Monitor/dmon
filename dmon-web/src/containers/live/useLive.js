import { useEffect, useMemo } from 'react';
import io from 'socket.io-client';

import manifest from '../../config/manifest';

export default (appendCb, ips, dependents) => {
  const socket = useMemo(() => io(
    `${manifest.hostMonitor}/live`
  ), [manifest.hostMonitor]); 

  useEffect(() => {    
    socket.on('connect', () => {
      socket.emit('subscribeToLiveTransmission', ips);
      socket.on('liveTransmission', (
        transmissionPacket,
      ) => appendCb(transmissionPacket));
    })
  }, dependents);
}