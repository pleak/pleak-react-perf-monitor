import { NativeModules, Platform } from 'react-native';

const { PleakDeviceInfo } = NativeModules;

const isWeb = () => !PleakDeviceInfo && Platform.OS === 'web';

const USER_AGENT = isWeb()
  ? window.navigator.userAgent
  : PleakDeviceInfo.userAgent;
const DEVICE_MODEL = isWeb() ? undefined : PleakDeviceInfo.model;
const DEVICE_BRAND = isWeb() ? undefined : PleakDeviceInfo.brand;
const APP_ID = isWeb() ? window.location.hostname : PleakDeviceInfo.bundleId;
const APP_VERSION = isWeb() ? undefined : PleakDeviceInfo.appVersion;
const SYSTEM_NAME = isWeb() ? undefined : PleakDeviceInfo.systemName;
const SYSTEM_VERSION = isWeb() ? undefined : PleakDeviceInfo.systemVersion;

export const getUserAgent = () => USER_AGENT;
export const getDeviceModel = () => DEVICE_MODEL;
export const getDeviceBrand = () => DEVICE_BRAND;
export const getAppId = () => APP_ID;
export const getAppVersion = () => APP_VERSION;
export const getSystemName = () => SYSTEM_NAME;
export const getSystemVersion = () => SYSTEM_VERSION;
