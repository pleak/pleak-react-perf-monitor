import { isObject } from './utils';

const BASE_CONTEXT = {};

const PLEAK_CONTEXT = Symbol('PLEAK_CONTEXT');
const PLEAK_GLOBAL_CONTEXT = Symbol('PLEAK_GLOBAL_CONTEXT');

export class PleakContext {
  constructor() {
    this[PLEAK_CONTEXT] = BASE_CONTEXT;
    this[PLEAK_GLOBAL_CONTEXT] = BASE_CONTEXT;
  }

  getContext = () => ({
    ...this[PLEAK_CONTEXT],
  });

  getGlobalContext = () => ({
    ...this[PLEAK_GLOBAL_CONTEXT],
  });

  getContextPayload = () => ({
    ...this.getContext(),
    ...this.getGlobalContext(),
  });

  resetContext = () => {
    this[PLEAK_CONTEXT] = BASE_CONTEXT;
  };

  resetGlobalContext = () => {
    this[PLEAK_GLOBAL_CONTEXT] = BASE_CONTEXT;
  };

  setContext = context => {
    isObject(context)
      ? (this[PLEAK_CONTEXT] = context)
      : console.error('[PLEAK] Context should be an object');
  };

  setGlobalContext = context => {
    isObject(context)
      ? (this[PLEAK_GLOBAL_CONTEXT] = context)
      : console.error('[PLEAK] Global context should be an object');
  };
}
