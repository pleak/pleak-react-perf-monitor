import performanceNow from 'fbjs/lib/performanceNow';
import { isNotAvoidedProperty, isPropertyValid } from './utils';
import { measureTiming, createPayload } from './utils/pleakUtils';
import { getContextPayload, resetContext } from './context';

export class Pleak {
  captureComponentPerfs = (
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

        const context = { ...getContextPayload() };
        resetContext();

        if (result && result.then) {
          return result.then(res => {
            const payload = createPayload({
              name,
              property,
              timing: measureTiming(start).toFixed(5),
              context,
            });

            if (debug) console.info(payload);

            return res;
          });
        }

        const payload = createPayload({
          name,
          property,
          timing: measureTiming(start).toFixed(5),
          context,
        });

        if (debug) console.info(payload);

        return result;
      };
    });
  };
}
