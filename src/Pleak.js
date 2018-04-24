import performanceNow from 'fbjs/lib/performanceNow';
import { isNotAvoidedProperty, isPropertyValid } from './utils';
import { measureTiming } from './utils/pleakUtils';
import { PleakContext } from './PleakContext';
import { PleakBatchPublisher } from './PleakBatchPublisher';
import { getSystemPayload } from './utils/deviceUtils';

export class Pleak {
  constructor({ debug = false, interval = 5000 } = {}) {
    this.debug = debug;

    this.system = getSystemPayload();

    this.context = new PleakContext();
    this.batchPublisher = new PleakBatchPublisher({ debug, interval });

    this.batchPublisher.run();
  }

  setContext = context => this.context.setContext(context);

  setGlobalContext = context => this.context.setGlobalContext(context);

  createPayload = ({ name, property, timing, context }) => ({
    event: { name, property },
    system: this.system,
    metrics: { timing },
    context,
  });

  processResult = ({ result, name, property, timing, context }) => {
    const payload = this.createPayload({
      name,
      property,
      timing,
      context,
    });

    this.batchPublisher.pushPayload(payload);

    if (this.debug) console.info('[PLEAK] Event', payload);

    return result;
  };

  captureComponentPerfs = (
    instance,
    { identifier, excludes = ['constructor'] } = {}
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
            this.processResult({
              result: res,
              name,
              property,
              timing: measureTiming(start),
              context,
            })
          );
        }

        return this.processResult({
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
