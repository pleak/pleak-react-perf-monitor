import performanceNow from 'fbjs/lib/performanceNow';
import { RENDER_METHOD, METHOD_TYPES, LIFECYCLES } from './constants';

export const measureTiming = start => (performanceNow() - start).toFixed(5);

export const getMethodType = method =>
  method === RENDER_METHOD
    ? METHOD_TYPES.RENDER
    : LIFECYCLES.includes(method)
      ? METHOD_TYPES.LIFECYCLE
      : METHOD_TYPES.COMPONENT_METHOD;
