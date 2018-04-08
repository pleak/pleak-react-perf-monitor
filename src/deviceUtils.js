import { NativeModules, Platform } from 'react-native';

const { PleakDeviceInfo } = NativeModules;

const isWeb = () => !PleakDeviceInfo && Platform.OS === 'web';

const USER_AGENT = isWeb()
  ? window.navigator.userAgent
  : PleakDeviceInfo.userAgent;
const DEVICE_MODEL = isWeb() ? undefined : PleakDeviceInfo.model;
const DEVICE_BRAND = isWeb() ? undefined : PleakDeviceInfo.brand;

export const getUserAgent = () => USER_AGENT;
export const getDeviceModel = () => DEVICE_MODEL;
export const getDeviceBrand = () => DEVICE_BRAND;
