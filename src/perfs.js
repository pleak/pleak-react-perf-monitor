import performanceNow from 'fbjs/lib/performanceNow';
import { isNotAvoidedProperty, isPropertyValid } from './utils';

const measureTiming = ({ start }) => performanceNow() - start;

const createPerfLogger = ({ name, property, logger }) => timing =>
  logger({ name, property, timing });

export const captureComponentPerfs = (
  instance,
  {
    identifier,
    excludes = ['constructor'],
    debug = false,
    logger = console.log,
  } = {}
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
    const log = createPerfLogger({ name, property, logger });

    instance[property] = () => {
      const start = performanceNow();
      const result = fn.call(instance, arguments);

      return result && result.then // check if result is Promise
        ? result.then(
            res =>
              debug ? (log(measureTiming({ start }).toFixed(5)), res) : res
          )
        : debug ? (log(measureTiming({ start }).toFixed(5)), result) : result;
    };
  });
};
