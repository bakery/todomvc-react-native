require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import { ParseServer } from 'parse-server';
import Parse from 'parse/node';
import ParseDashboard from 'parse-dashboard';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
const jsonParser = bodyParser.json();

const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT;
const SERVER_PORT = process.env.PORT;
const APP_ID = process.env.PARSE_SERVER_APPLICATION_ID;
const MASTER_KEY = process.env.PARSE_SERVER_MASTER_KEY;
const SERVER_URL = process.env.PARSE_SERVER_URL;

Parse.initialize(APP_ID, 'js-key', MASTER_KEY);
Parse.serverURL = SERVER_URL;

const api = new ParseServer({
  appId: APP_ID,
  masterKey: MASTER_KEY,
  serverURL: SERVER_URL,
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.use(
  '/dashboard',
  ParseDashboard({
    apps: [{
      serverURL: '/parse',
      appId: APP_ID,
      masterKey: MASTER_KEY,
      appName: 'F8-App-2016',
    }],
    users: [{ user: 'admin', pass: 'admin' }]
  }, IS_DEVELOPMENT)
);

app.use('/graphql', jsonParser, graphqlHTTP(request => {
  const sessionToken = request.body && request.body.sessionToken;
  const baseOps = {
    schema: schema,
    graphiql: true,
    context: {}
  };

  if (!sessionToken) {
    return baseOps;
  } else {
    return new Parse.Query(Parse.Session).equalTo('sessionToken', sessionToken).first({ useMasterKey: true }).then(session => {
      return session && session.get('user').fetch();
    }, error => {
      console.error('error authenticating graphql request', error);
      return baseOps;
    }).then(user => {
      if (user) {
        return Object.assign(baseOps, {
          context: { user, sessionToken }
        });
      } else {
        return baseOps;
      }
    });
  }
}));

app.listen(SERVER_PORT, function() {
  console.log(`parse-server-example running on port ${SERVER_PORT}`);
});
