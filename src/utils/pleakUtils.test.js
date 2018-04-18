import { measureTiming } from './pleakUtils';

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
});
