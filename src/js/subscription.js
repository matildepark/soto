import { api } from '/api';
import { store } from '/store';

import urbitOb from 'urbit-ob';


export class Subscription {
  start() {
    if (api.authTokens) {
      this.initializesoto();
    } else {
      console.error("~~~ ERROR: Must set api.authTokens before operation ~~~");
    }
  }

  initializesoto() {
    api.bind('/sole', 'PUT', api.authTokens.ship, 'dojo',
      this.handleEvent.bind(this),
      this.handleError.bind(this));
  }

  handleEvent(diff) {
    console.log(diff.data);
  }

  handleError(err) {
    console.error(err);
    api.bind('/sole', 'PUT', api.authTokens.ship, 'dojo',
      this.handleEvent.bind(this),
      this.handleError.bind(this));
  }
}

export let subscription = new Subscription();
