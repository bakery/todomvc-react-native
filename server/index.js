require('dotenv').config();

import express from 'express';
import path from 'path';
import { ParseServer } from 'parse-server';
import Parse from 'parse/node';
import ParseDashboard from 'parse-dashboard';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT;
const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_HOST = process.env.SERVER_HOST;
const APP_ID = process.env.APP_ID;
const MASTER_KEY = process.env.MASTER_KEY;
const DATABASE_URI = process.env.DATABASE_URI;

Parse.initialize(process.env.APP_ID);
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`;
Parse.masterKey = MASTER_KEY;
Parse.Cloud.useMasterKey();


var api = new ParseServer({
  databaseURI: DATABASE_URI,
  cloud: path.resolve(__dirname, 'cloud/index.js'),
  appId: APP_ID,
  masterKey: MASTER_KEY,
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

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(SERVER_PORT, function() {
  console.log(`parse-server-example running on port ${SERVER_PORT}`);
});
