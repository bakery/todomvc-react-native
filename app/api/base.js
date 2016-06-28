import { Lokka } from 'lokka';
import HttpTransport from 'lokka-transport-http';
import { getCurrentUser } from './auth';

class GraphQLClient {
  constructor(url) {
    this.url = url;
  }

  query(q) {
    return this.setupTransport().then(transport => {
      return new Lokka({ transport }).query(q);
    });
  }

  mutate(q) {
    return this.setupTransport().then(transport => {
      return new Lokka({ transport }).mutate(q);
    });
  }

  setupTransport() {
    return getCurrentUser().then((currentUser) => {
      const headers = {
        'Authorization': currentUser ? currentUser.getSessionToken() : null
      };
      return new HttpTransport(this.url, { headers });
    }, (error) => {
      throw new Error(`Parse Authentication error: ${error.message}`);
    });
  }
}

export default GraphQLClient;
