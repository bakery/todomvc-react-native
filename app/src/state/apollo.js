/* eslint no-param-reassign: off */

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { getCurrentUser } from '../api/auth';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:8000/graphql' });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    getCurrentUser().then(user => {
      req.options.headers.authorization = user && user.getSessionToken();
      next();
    }, error => {
      next();
    });
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

export default client;
