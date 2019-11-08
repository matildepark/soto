import { api } from '/api';
import { store } from '/store';


export class Subscription {
  start() {
    if (api.authTokens) {
      this.initializesoto();
    } else {
      console.error("~~~ ERROR: Must set api.authTokens before operation ~~~");
    }
  }

  initializesoto() {
    api.bind('/primary', 'PUT', api.authTokens.ship, 'soto',
      this.handleEvent.bind(this),
      this.handleError.bind(this));
  }

  handleEvent(diff) {
      console.log(diff.data)
}

  handleError(err) {
    console.error(err);
    api.bind('/primary', 'PUT', api.authTokens.ship, 'soto',
      this.handleEvent.bind(this),
      this.handleError.bind(this));
  }
}

export let subscription = new Subscription();
