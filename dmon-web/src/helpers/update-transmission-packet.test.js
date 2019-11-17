import updateTransmissionPacket, { MAX_ITEMS } from './update-transmission-packet';

describe('updateTransmissionPacket helper', () => {
  it('should not exceed set max limit', () => {
    const current = { ice: { ip: [] }}
    for(let i = 0; i < MAX_ITEMS + 5; i++) {
      current['ice']['ip'].push({ ip: 'ip'})
    }

    const updatedPacket = updateTransmissionPacket(current,
      {IP: 'ip'},
      ['ice']
    );
    expect(updatedPacket.ice.ip.length).toEqual(MAX_ITEMS);
  });
});