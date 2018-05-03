import performanceNow from 'fbjs/lib/performanceNow';
import uuid from 'uuid/v4';
import { isNotAvoidedProperty, isPropertyValid } from './utils';
import { measureTiming, getMethodType } from './utils/pleakUtils';
import { PleakContext } from './PleakContext';
import { PleakBatchPublisher } from './PleakBatchPublisher';
import { getSystemPayload } from './utils/deviceUtils';

export class Pleak {
  constructor({
    debug = false,
    interval = 5000,
    environment = process.env.NODE_ENV,
  } = {}) {
    this.debug = debug;
    this.environment = environment;

    this.system = getSystemPayload();

    this.context = new PleakContext();
    this.batchPublisher = new PleakBatchPublisher({ debug, interval });

    this.batchPublisher.run();
  }

  setContext = context => this.context.setContext(context);

  setGlobalContext = context => this.context.setGlobalContext(context);

  createPayload = ({ component, method, timing, context, timestamp }) => ({
    event: {
      uuid: uuid(),
      component,
      method,
      timestamp,
      environment: this.environment,
      type: getMethodType(method),
    },
    system: this.system,
    metrics: { timing },
    context,
  });

  processResult = ({
    result,
    component,
    method,
    timing,
    context,
    timestamp,
  }) => {
    const payload = this.createPayload({
      component,
      method,
      timing,
      context,
      timestamp,
    });

    this.batchPublisher.pushPayload(payload);

    if (this.debug) console.info('[PLEAK] Event', payload);

    return result;
  };

  captureComponentPerfs = (
    instance,
    { identifier, excludes = ['constructor'] } = {}
  ) => {
    const component =
      identifier ||
      instance.constructor.displayName ||
      instance.constructor.name ||
      'Component';

    const properties = [
      ...Object.getOwnPropertyNames(instance).filter(isNotAvoidedProperty),
      ...Object.getOwnPropertyNames(Object.getPrototypeOf(instance)),
    ];

    properties.filter(isPropertyValid(instance, excludes)).forEach(method => {
      const fn = instance[method];

      instance[method] = () => {
        const timestamp = Date.now();
        const start = performanceNow();
        const result = fn.call(instance, arguments);

        const context = this.context.getContextPayload();
        this.context.resetContext();

        if (result && result.then) {
          return result.then(res =>
            this.processResult({
              result: res,
              component,
              method,
              timing: measureTiming(start),
              context,
              timestamp,
            })
          );
        }

        return this.processResult({
          result,
          component,
          method,
          timing: measureTiming(start),
          context,
          timestamp,
        });
      };
    });
  };
}
