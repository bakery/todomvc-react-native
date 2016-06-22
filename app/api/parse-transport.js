/* global fetch */

// XX: this is based on https://github.com/kadirahq/lokka-transport-http
// with some shortcuts to make it work with Parse on React Native

import LokkaTransport from 'lokka/transport';
import Parse from 'parse/react-native';

export class Transport extends LokkaTransport {
  constructor(endpoint, options = {}) {
    if (!endpoint) {
      throw new Error('endpoint is required!');
    }

    super();
    this._httpOptions = {
      auth: options.auth,
      headers: options.headers || {}
    };
    this.endpoint = endpoint;
  }

  _buildOptions(payload) {
    const options = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      // To pass cookies to the server. (supports CORS as well)
      credentials: 'include',
    };

    Object.assign(options.headers, this._httpOptions.headers);
    return options;
  }

  send(query, variables, operationName) {
    return Parse.User.currentAsync().then((currentUser) => {
      const payload = {
        query, variables, operationName,
        sessionToken: currentUser ? currentUser.getSessionToken() : null
      };
      const options = this._buildOptions(payload);

      return fetch(this.endpoint, options).then(response => {
        // 200 is for success
        // 400 is for bad request
        if (response.status !== 200 && response.status !== 400) {
          throw new Error(`Invalid status code: ${response.status}`);
        }

        return response.json();
      }).then(({data, errors}) => {
        if (errors) {
          const message = errors[0].message;
          const error = new Error(`GraphQL Error: ${message}`);
          error.rawError = errors;

          throw error;
        }

        return data;
      });
    }, (error) => {
      throw new Error(`Parse Authentication error: ${error.message}`);
    });
  }
}

export default Transport;
