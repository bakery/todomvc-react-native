require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { ParseServer } from 'parse-server';
import Parse from 'parse/node';
import ParseDashboard from 'parse-dashboard';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
const jsonParser = bodyParser.json();

const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT;
const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_HOST = process.env.SERVER_HOST;
const APP_ID = process.env.APP_ID;
const MASTER_KEY = process.env.MASTER_KEY;
const DATABASE_URI = process.env.DATABASE_URI;

Parse.initialize(process.env.APP_ID, 'js-key', MASTER_KEY);
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`;
Parse.masterKey = MASTER_KEY;
Parse.Cloud.useMasterKey();

var api = new ParseServer({
  databaseURI: DATABASE_URI,
  cloud: path.resolve(__dirname, 'cloud/index.js'),
  appId: APP_ID,
  masterKey: MASTER_KEY,
  clientKey: 'js-key',
  fileKey: 'optionalFileKey',
  serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`
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
    graphiql: true
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
