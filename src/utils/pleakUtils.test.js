import { measureTiming, getMethodType } from './pleakUtils';
import { METHOD_TYPES } from './constants';

jest.mock('fbjs/lib/performanceNow');
const performanceNow = require('fbjs/lib/performanceNow');

describe('pleakUtils', () => {
  describe('measureTiming', () => {
    performanceNow.mockReturnValue(1000);
    it('should return a time measure with a string representing a number in fixed-point notation', () => {
      const measure = measureTiming(567.2);

      expect(performanceNow).toHaveBeenCalled();
      expect(measure).toEqual('432.80000');
    });
  });

  describe('getMethodType', () => {
    it('should return the right method type', () => {
      expect(getMethodType('render')).toEqual(METHOD_TYPES.RENDER);
      expect(getMethodType('componentWillMount')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('UNSAFE_componentWillMount')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('componentDidMount')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('componentDidUpdate')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('componentWillUpdate')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('UNSAFE_componentWillUpdate')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('componentWillReceiveProps')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('UNSAFE_componentWillReceiveProps')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('shouldComponentUpdate')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('getSnapshotBeforeUpdate')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('componentWillUnmount')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('componentDidCatch')).toEqual(
        METHOD_TYPES.LIFECYCLE
      );
      expect(getMethodType('handleClick')).toEqual(
        METHOD_TYPES.COMPONENT_METHOD
      );
    });
  });
});
