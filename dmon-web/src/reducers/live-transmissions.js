import INITIAL_STATE, { PUSH_PACKET, APPLY_IP, APPLY_COLOR } from '../constants/live-transmission';
import { generateRgb, updateTransmissionPacket } from '../helpers';

const PACKET_KEYS = Object.keys(INITIAL_STATE.packetInfo);

export default (state, { type, payload }) => ({
  [type]: () => {
    console.error(`Error: Live Transmission Reducer: Type "${type}" not specified.`)
  },
  [PUSH_PACKET]: () => ({
    ...state,
    packetInfo: {
      // this func handles the shifting as well
      ...updateTransmissionPacket(state.packetInfo, payload, PACKET_KEYS),
    },
  }),
  [APPLY_COLOR]: () => state.colors[payload.IP] === undefined ? ({
    ...state,
    colors: {
      ...state.colors,
      // food for thought, might want to have rgb spaces that we can use
      // e.g space for neon or dull colors.
      [payload.IP]: generateRgb(),
    },
  }) : state,
  [APPLY_IP]: () => ~~state.ips.indexOf(payload.IP) ? ({
    ...state,
    ips: [
      ...state.ips,
      payload.IP,
    ]
  }) : state,  
})[type]();