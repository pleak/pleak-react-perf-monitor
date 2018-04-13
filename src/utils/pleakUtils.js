import performanceNow from 'fbjs/lib/performanceNow';

export const measureTiming = start => (performanceNow() - start).toFixed(5);
