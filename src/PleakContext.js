import { isObject } from './utils';

const BASE_CONTEXT = {};

const __PLEAK_CONTEXT__ = Symbol('__PLEAK_CONTEXT__');
const __PLEAK_GLOBAL_CONTEXT__ = Symbol('__PLEAK_GLOBAL_CONTEXT__');

export class PleakContext {
  constructor() {
    this[__PLEAK_CONTEXT__] = BASE_CONTEXT;
    this[__PLEAK_GLOBAL_CONTEXT__] = BASE_CONTEXT;
  }

  getContext = () => ({
    ...this[__PLEAK_CONTEXT__],
  });

  getGlobalContext = () => ({
    ...this[__PLEAK_GLOBAL_CONTEXT__],
  });

  getContextPayload = () => ({
    ...this.getContext(),
    ...this.getGlobalContext(),
  });

  resetContext = () => {
    this[__PLEAK_CONTEXT__] = BASE_CONTEXT;
  };

  resetGlobalContext = () => {
    this[__PLEAK_GLOBAL_CONTEXT__] = BASE_CONTEXT;
  };

  setContext = context => {
    isObject(context)
      ? (this[__PLEAK_CONTEXT__] = context)
      : console.error('[PLEAK] Context should be an object');
  };

  setGlobalContext = context => {
    isObject(context)
      ? (this[__PLEAK_GLOBAL_CONTEXT__] = context)
      : console.error('[PLEAK] Global context should be an object');
  };
}
