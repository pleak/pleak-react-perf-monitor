import performanceNow from 'fbjs/lib/performanceNow';
import {
  getUserAgent,
  getDeviceModel,
  getDeviceBrand,
  getAppId,
  getSystemVersion,
  getSystemName,
  getAppVersion,
  getDeviceUniqueId,
} from './deviceUtils';

export const measureTiming = start => performanceNow() - start;

export const createPayload = ({ name, property, timing, context }) => ({
  event: { name, property },
  system: {
    userAgent: getUserAgent(),
    brand: getDeviceBrand(),
    model: getDeviceModel(),
    uniqueId: getDeviceUniqueId(),
    appId: getAppId(),
    appVersion: getAppVersion(),
    systemName: getSystemName(),
    systemVersion: getSystemVersion(),
  },
  metrics: { timing },
  context,
});
