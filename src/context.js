import { isObject } from './utils';

const BASE_CONTEXT = {};

const globalRef = global || window;
globalRef.__PLEAK_CONTEXT__ = BASE_CONTEXT;

export const resetContext = () => {
  globalRef.__PLEAK_CONTEXT__ = BASE_CONTEXT;
};

export const getContext = () => globalRef.__PLEAK_CONTEXT__;

export const setContext = context => {
  isObject(context)
    ? (globalRef.__PLEAK_CONTEXT__ = context)
    : console.error('[PLEAK] Context should be an object');
};
