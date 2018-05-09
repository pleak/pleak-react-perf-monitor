import uuid from 'uuid/v4';
import performanceNow from 'fbjs/lib/performanceNow';
import { Pleak } from './Pleak';
import { getSystemPayload } from './utils/deviceUtils';

jest.mock('uuid/v4');

jest.mock('fbjs/lib/performanceNow');

jest.mock('./utils/deviceUtils.js', () => ({
  getSystemPayload: jest.fn(),
}));

jest.mock('./PleakBatchPublisher.js', () => ({
  PleakBatchPublisher: class {
    run = () => jest.fn();
  },
}));

describe('Pleak', () => {
  const systemPayload = {
    userAgent: 'USER_AGENT',
    brand: 'DEVICE_BRAND',
    model: 'DEVICE_MODEL',
    uniqueId: 'DEVICE_UNIQUE_ID',
    appId: 'APP_ID',
    appVersion: 'APP_VERSION',
    systemName: 'SYSTEM_NAME',
    systemVersion: 'SYSTEM_VERSION',
  };

  performanceNow.mockReturnValue(1000);
  getSystemPayload.mockReturnValue(systemPayload);
  uuid.mockReturnValue('this-should-be-an-uuid');

  const pleak = new Pleak({
    uri: 'https://this-is-a-public-key@getpleak.io/thisisanappid',
    environment: 'test',
  });

  beforeEach(() => {
    pleak.context.resetContext();
    pleak.context.resetGlobalContext();
  });

  describe('createPayload', () => {
    it('should return a payload', () => {
      expect(
        pleak.createPayload({
          component: 'App',
          method: 'componentDidMount',
          timing: '12.20000',
          context: { user: 'Bob' },
          timestamp: 123456789,
        })
      ).toEqual({
        informations: {
          uuid: 'this-should-be-an-uuid',
          component: 'App',
          method: 'componentDidMount',
          timestamp: 123456789,
          environment: 'test',
          type: 'LIFECYCLE',
        },
        system: systemPayload,
        metrics: { timing: '12.20000' },
        context: { user: 'Bob' },
      });
    });
  });

  describe('setContext', () => {
    it('should set the context of the instance', () => {
      const fakeContext = {
        user: 'Bob',
      };

      const contextSpy = jest.spyOn(pleak.context, 'setContext');

      pleak.setContext(fakeContext);
      expect(contextSpy).toHaveBeenCalledWith(fakeContext);
      expect(pleak.context.getContext()).toEqual(fakeContext);
    });
  });

  describe('setGlobalContext', () => {
    it('should set the global context of the instance', () => {
      const fakeGlobalContext = {
        locale: 'en',
      };

      const contextSpy = jest.spyOn(pleak.context, 'setGlobalContext');

      pleak.setGlobalContext(fakeGlobalContext);
      expect(contextSpy).toHaveBeenCalledWith(fakeGlobalContext);
      expect(pleak.context.getGlobalContext()).toEqual(fakeGlobalContext);
    });
  });
});
