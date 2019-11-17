import Reducer from './live-transmissions';
import INITIAL_STATE, {
  PUSH_PACKET,
  APPLY_IP,
  APPLY_COLOR,
} from '../constants/live-transmission';

describe('live transmission reducer', () => {
  describe('PUSH_PACKET', () => {
    it('should push a packet to state', () => {
      const exc = Reducer(INITIAL_STATE, {
        type: PUSH_PACKET,
        payload: {
          CpuUsage: '12',
          UpTime: '452',
          IP: 'somnethjing',
          MemoryUsed: '52',
          MemoryAvailable: '52',
          MemoryTotal: '512',
          InboundBandwithBytes: '51',
          OutboundBandwithBytes: '51',
          InboundBandwithPackets: '51',
          OutboundBandwithPackets: '1515',
          hostName: '5151',
          DeviceID: '551',
        }
      });
  
      expect(exc.packetInfo).toEqual({ "CpuUsage": { "somnethjing": ["12"] }, "DeviceID": { "somnethjing": ["551"] }, "InboundBandwithBytes": { "somnethjing": ["51"] }, "InboundBandwithPackets": { "somnethjing": ["51"] }, "MemoryAvailable": { "somnethjing": ["52"] }, "MemoryTotal": { "somnethjing": ["512"] }, "MemoryUsed": { "somnethjing": ["52"] }, "OutboundBandwithBytes": { "somnethjing": ["51"] }, "OutboundBandwithPackets": { "somnethjing": ["1515"] }, "UpTime": { "somnethjing": ["452"] }, "hostName": { "somnethjing": ["5151"] } });
    });
  });  
  describe('APPLY_COLOR', () => {
    it('should apply a color if an ip does not exist', () => {
      const exc = Reducer(INITIAL_STATE, {
        type: APPLY_COLOR,
        payload: {
          IP: 'cool_guy'
        }
      });

      expect(Object.keys(exc.colors)).toEqual(['cool_guy'])
    });
    it('should not apply a color if an ip exists', () => {
      const colors = {['cool_guy']: 'fe'}
      const exc = Reducer({...INITIAL_STATE, colors}, {
        type: APPLY_COLOR,
        payload: {
          IP: 'cool_guy'
        }
      });
      expect(exc.colors).toEqual(colors)
    });
  });
  describe('APPLY_IP', () => {
    it('should add to the list of ips if ip does not exist', () => {
      const exc = Reducer(INITIAL_STATE, {
        type: APPLY_IP,
        payload: {
          IP: 'cool_guy'
        }
      });

      expect(exc.ips).toEqual(["cool_guy"]);
    })
    it('should not add to the list of ips if one exists', () => {
      const exc = Reducer({INITIAL_STATE, ips: ['cool_guy']}, {
        type: APPLY_IP,
        payload: {
          IP: 'cool_guy'
        }
      });

      expect(exc.ips).toEqual(["cool_guy"]);
    });
  });
})