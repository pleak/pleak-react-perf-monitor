// eslint-disable-next-line
import { NativeModules, Platform } from 'react-native';

const { PleakDeviceInfo } = NativeModules;

const isWeb = () => !PleakDeviceInfo && Platform.OS === 'web';

const USER_AGENT = isWeb()
  ? window.navigator.userAgent
  : PleakDeviceInfo.userAgent;
const DEVICE_MODEL = isWeb() ? undefined : PleakDeviceInfo.model;
const DEVICE_BRAND = isWeb() ? undefined : PleakDeviceInfo.brand;
const DEVICE_UNIQUE_ID = isWeb() ? undefined : PleakDeviceInfo.deviceUniqueId;
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
