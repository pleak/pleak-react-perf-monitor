import fetch from 'isomorphic-fetch';

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

    this.batchedPayloads = [];
  }

  pushPayload = payload => {
    this.batchedPayloads = [...this.batchedPayloads, payload];
  };

  clearPayloads = () => {
    this.batchedPayloads = [];
  };

  publishEvents = () => {
    const { protocol, host, appId, publicKey } = this.parsedUrl;
    const url = `${protocol}://${host}/collect/${appId}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: publicKey,
      },
      body: JSON.stringify({
        events: this.batchedPayloads,
      }),
    });
  };

  run = () => {
    this.batchInterval = setInterval(() => {
      if (this.batchedPayloads.length > 0 && this.publish) {
        if (this.debug) {
          console.info('[PLEAK] Publishing events', this.batchedPayloads);
        }
        this.publishEvents();
      }
      this.clearPayloads();
    }, this.interval);
  };
}
