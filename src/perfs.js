import performanceNow from 'fbjs/lib/performanceNow';

import { isNotAvoidedProperty, isPropertyValid } from './utils';
import { getContext, resetContext } from './context';

const measureTiming = ({ start }) => performanceNow() - start;

const createPerfLogger = ({ name, property, context }) => timing =>
  console.log({ event: { name, property }, metrics: { timing }, context });

export const captureComponentPerfs = (
  instance,
  { identifier, excludes = ['constructor'], debug = false } = {}
) => {
  const name =
    identifier ||
    instance.constructor.displayName ||
    instance.constructor.name ||
    'Component';

  const properties = [
    ...Object.getOwnPropertyNames(instance).filter(isNotAvoidedProperty),
    ...Object.getOwnPropertyNames(Object.getPrototypeOf(instance)),
  ];

  properties.filter(isPropertyValid(instance, excludes)).forEach(property => {
    const fn = instance[property];

    instance[property] = () => {
      const start = performanceNow();
      const result = fn.call(instance, arguments);

      const context = { ...getContext() };
      const log = createPerfLogger({ name, property, context });

      resetContext();

      return result && result.then // check if result is Promise
        ? result.then(
            res =>
              debug ? (log(measureTiming({ start }).toFixed(5)), res) : res
          )
        : debug ? (log(measureTiming({ start }).toFixed(5)), result) : result;
    };
  });
};
