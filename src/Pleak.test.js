import { Pleak } from './Pleak';

jest.mock('fbjs/lib/performanceNow');
const performanceNow = require('fbjs/lib/performanceNow');

jest.mock('./utils/deviceUtils.js', () => ({
  getSystemPayload: jest.fn(),
}));
const { getSystemPayload } = require('./utils/deviceUtils');

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

  const pleak = new Pleak();

  beforeEach(() => {
    pleak.context.resetContext();
    pleak.context.resetGlobalContext();
  });

  describe('createPayload', () => {
    it('should return a payload', () => {
      expect(
        pleak.createPayload({
          name: 'App',
          property: 'componentDidMount',
          timing: '12.20000',
          context: { user: 'Bob' },
        })
      ).toEqual({
        event: {
          name: 'App',
          property: 'componentDidMount',
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
