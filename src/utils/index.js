import { AVOIDED_PROPERTIES } from './constants';

export const isNotAvoidedProperty = property =>
  !AVOIDED_PROPERTIES.includes(property);

export const isPropertyValid = (instance, excludes) => property =>
  typeof instance[property] === 'function' && !excludes.includes(property);

export const isObject = obj => typeof obj === 'object' && obj !== null;
