import fetch from 'cross-fetch';

export class PleakBatchPublisher {
  constructor({
    parsedUrl = {},
    debug = false,
    publish = true,
    interval = 5000,
  } = {}) {
    this.parsedUrl = parsedUrl;
    this.debug = debug;
    this.publish = publish;
    this.interval = interval;

    const { protocol, host, appId, publicKey } = this.parsedUrl;
    this.url = `${protocol}://${host}/collect/${appId}`;
    this.publicKey = publicKey;

    this.batchedPayloads = [];
  }

  pushPayload = payload => {
    this.batchedPayloads = [...this.batchedPayloads, payload];
  };

  clearPayloads = () => {
    this.batchedPayloads = [];
  };

  publishEvents = () => {
    if (this.batchedPayloads.length > 0 && this.publish) {
      if (this.debug) {
        console.info('[PLEAK] Publishing events', this.batchedPayloads);
      }

      fetch(this.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: this.publicKey,
        },
        body: JSON.stringify({
          events: this.batchedPayloads,
        }),
      });

      this.clearPayloads();
    }
  };

  run = () => {
    this.batchInterval = setInterval(this.publishEvents, this.interval);
  };
}
