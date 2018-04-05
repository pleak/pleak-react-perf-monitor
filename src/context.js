import { isObject } from './utils';

const BASE_CONTEXT = {};

const globalRef = global || window;
globalRef.__PLEAK_CONTEXT__ = BASE_CONTEXT;
globalRef.__PLEAK_GLOBAL_CONTEXT__ = BASE_CONTEXT;

export const resetContext = () => {
  globalRef.__PLEAK_CONTEXT__ = BASE_CONTEXT;
};

export const resetGlobalContext = () => {
  globalRef.__PLEAK_GLOBAL_CONTEXT__ = BASE_CONTEXT;
};

const getContext = () => ({
  ...globalRef.__PLEAK_CONTEXT__,
});

const getGlobalContext = () => ({
  ...globalRef.__PLEAK_GLOBAL_CONTEXT__,
});

export const getContextPayload = () => ({
  ...getContext(),
  ...getGlobalContext(),
});

export const setContext = context => {
  isObject(context)
    ? (globalRef.__PLEAK_CONTEXT__ = context)
    : console.error('[PLEAK] Context should be an object');
};

export const setGlobalContext = context => {
  isObject(context)
    ? (globalRef.__PLEAK_GLOBAL_CONTEXT__ = context)
    : console.error('[PLEAK] Global context should be an object');
};
