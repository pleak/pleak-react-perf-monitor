import performanceNow from 'fbjs/lib/performanceNow';
import { isNotAvoidedProperty, isPropertyValid } from './utils';
import { measureTiming } from './utils/pleakUtils';
import { PleakContext } from './PleakContext';
import { getSystemPayload } from './utils/deviceUtils';

export class Pleak {
  constructor({ debug = false } = {}) {
    this.debug = debug;

    this.system = getSystemPayload();

    this.context = new PleakContext();
  }

  setContext = context => this.context.setContext(context);

  setGlobalContext = context => this.context.setGlobalContext(context);

  createPayload = ({ name, property, timing, context }) => ({
    event: { name, property },
    system: this.system,
    metrics: { timing },
    context,
  });

  send = ({ result, name, property, timing, context }) => {
    const payload = this.createPayload({
      name,
      property,
      timing,
      context,
    });

    if (this.debug) console.info(payload);

    return result;
  };

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

        const context = this.context.getContextPayload();
        this.context.resetContext();

        if (result && result.then) {
          return result.then(res =>
            this.send({
              result: res,
              name,
              property,
              timing: measureTiming(start),
              context,
            })
          );
        }

        return this.send({
          result,
          name,
          property,
          timing: measureTiming(start),
          context,
        });
      };
    });
  };
}
