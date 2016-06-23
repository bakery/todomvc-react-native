import settings from '../settings/development';
import packageJSON from '../package';
import express from 'express';
import bodyParser from 'body-parser';
import { ParseServer } from 'parse-server';
import Parse from 'parse/node';
import ParseDashboard from 'parse-dashboard';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
const jsonParser = bodyParser.json();
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';


Parse.initialize(settings.parseServerApplicationId, 'js-key', settings.parseServerMasterKey);
Parse.serverURL = settings.parseServerURL;

const api = new ParseServer({
  appId: settings.parseServerApplicationId,
  masterKey: settings.parseServerMasterKey,
  serverURL: settings.parseServerURL,
});

app.use('/parse', api);

app.use(
  '/dashboard',
  ParseDashboard({
    apps: [{
      serverURL: settings.parseServerURL,
      appId: settings.parseServerApplicationId,
      masterKey: settings.parseServerMasterKey,
      appName: packageJSON.name,
    }],
    users: settings.parseServerDashboardUsers
  }, IS_DEVELOPMENT)
);

app.use('/graphql', jsonParser, graphqlHTTP(request => {
  const sessionToken = request.body && request.body.sessionToken;
  const baseOps = {
    schema: schema,
    graphiql: IS_DEVELOPMENT,
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

app.listen(settings.serverPort, function() {
  console.log(`parse-server-example running on port ${settings.serverPort}`);
});
