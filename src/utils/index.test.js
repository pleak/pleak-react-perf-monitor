import { isNotAvoidedProperty, isPropertyValid, isObject } from './';

describe('utils', () => {
  describe('isNotAvoidedProperty', () => {
    it('should return true if property is not an avoided property', () => {
      expect(isNotAvoidedProperty('componentDidMount')).toEqual(true);
    });

    it('should return false if property is an avoided property', () => {
      expect(isNotAvoidedProperty('props')).toEqual(false);
    });
  });

  describe('isPropertyValid', () => {
    const instance = new class TestingClass {
      constructor() {
        this.testingProperty = 'test';
      }

      testingMethod() {
        return this.testingProperty;
      }
    }();

    it('should return false if property is not a function', () => {
      expect(isPropertyValid(instance)('testingProperty')).toEqual(false);
    });

    it('should return false if property is a function but is excluded', () => {
      expect(
        isPropertyValid(instance, ['testingMethod'])('testingMethod')
      ).toEqual(false);
    });

    it('should return true if property is a function and is not excluded', () => {
      expect(isPropertyValid(instance)('testingMethod')).toEqual(true);
    });
  });

  describe('isObject', () => {
    it('should return false if parameter is not an object', () => {
      expect(isObject('')).toEqual(false);
      expect(isObject(0)).toEqual(false);
      expect(isObject(null)).toEqual(false);
      expect(isObject(undefined)).toEqual(false);
      expect(isObject(() => {})).toEqual(false);
    });

    it('should return true if parameter is an object', () => {
      expect(isObject({})).toEqual(true);
      expect(isObject([])).toEqual(true);
    });
  });
});
