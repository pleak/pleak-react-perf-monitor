export class PleakBatchPublisher {
  constructor({ debug = false, interval = 5000 } = {}) {
    this.debug = debug;
    this.interval = interval;

    this.batchedPayloads = [];
  }

  pushPayload = payload => {
    this.batchedPayloads = [...this.batchedPayloads, payload];
  };

  clearPayloads = () => {
    this.batchedPayloads = [];
  };

  run = () => {
    this.batchInterval = setInterval(() => {
      if (this.batchedPayloads.length > 0) {
        if (this.debug)
          console.info('[PLEAK] Publishing events', this.batchedPayloads);
      }
      this.clearPayloads();
    }, this.interval);
  };
}
