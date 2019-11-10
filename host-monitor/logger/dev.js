import * as Types from './types';

export default (type, action) => ({
  [Types.WARING]: () => console.warn(action),
  [Types.LOG]: () => console.log(action),
  [Types.WARING]: () => console.warn(action),
})[type];
