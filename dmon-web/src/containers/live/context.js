import {createContext} from 'react';

import INITIAL_TRANSMISSION_STATE from './initial_state';

export default createContext({
  transmissionPackets: INITIAL_TRANSMISSION_STATE,
  colors: [],  
});