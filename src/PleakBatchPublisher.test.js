import { PleakBatchPublisher } from './PleakBatchPublisher';

jest.mock('isomorphic-fetch');
jest.useFakeTimers();

describe('PleakBatchPublisher', () => {
  describe('payloads management', () => {
    const pleakBatchPublisher = new PleakBatchPublisher();

    beforeEach(() => {
      pleakBatchPublisher.batchedPayloads = [];
    });

    it('should be able to push payloads', () => {
      pleakBatchPublisher.pushPayload({ test: 'payloadTest' });

      expect(pleakBatchPublisher.batchedPayloads).toEqual([
        { test: 'payloadTest' },
      ]);
    });

    it('should be able to clear payloads', () => {
      pleakBatchPublisher.pushPayload({ test: 'payloadTest' });
      pleakBatchPublisher.clearPayloads();

      expect(pleakBatchPublisher.batchedPayloads).toEqual([]);
    });
  });
});
