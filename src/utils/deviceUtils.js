import uuid from 'uuid/v4';

let PleakDeviceInfo;

const isWeb = () =>
  window.navigator !== undefined && window.navigator.product !== 'ReactNative';

if (!isWeb()) {
  try {
    // eslint-disable-next-line global-require
    const { NativeModules } = require('react-native');

    // eslint-disable-next-line prefer-destructuring
    PleakDeviceInfo = NativeModules.PleakDeviceInfo;
  } catch (err) {
    throw err;
  }
}

const getPleakCookieId = () => {
  const pleakCookie = document.cookie.replace(
    /(?:(?:^|.*;\s*)_pleak\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  if (pleakCookie.length > 0) {
    return pleakCookie;
  }
  const cookie = uuid();
  document.cookie = `_pleak=${cookie}`;
  return cookie;
};

const USER_AGENT = isWeb()
  ? window.navigator.userAgent
  : PleakDeviceInfo.userAgent;
const DEVICE_MODEL = isWeb() ? undefined : PleakDeviceInfo.model;
const DEVICE_BRAND = isWeb() ? undefined : PleakDeviceInfo.brand;
const DEVICE_UNIQUE_ID = isWeb()
  ? getPleakCookieId()
  : PleakDeviceInfo.deviceUniqueId;
const APP_ID = isWeb() ? window.location.hostname : PleakDeviceInfo.bundleId;
const APP_VERSION = isWeb() ? undefined : PleakDeviceInfo.appVersion;
const SYSTEM_NAME = isWeb() ? undefined : PleakDeviceInfo.systemName;
const SYSTEM_VERSION = isWeb() ? undefined : PleakDeviceInfo.systemVersion;

export const getSystemPayload = () => ({
  userAgent: USER_AGENT,
  brand: DEVICE_BRAND,
  model: DEVICE_MODEL,
  uniqueId: DEVICE_UNIQUE_ID,
  appIdentifierUrl: APP_ID,
  appVersion: APP_VERSION,
  systemName: SYSTEM_NAME,
  systemVersion: SYSTEM_VERSION,
});
