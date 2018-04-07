import { NativeModules, Platform } from 'react-native';

const { PleakDeviceInfo } = NativeModules;

const isWeb = () => !PleakDeviceInfo && Platform.OS === 'web';

export const getUserAgent = () =>
  isWeb() ? window.navigator.userAgent : PleakDeviceInfo.userAgent;
