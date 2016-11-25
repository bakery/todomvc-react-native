import packageJSON from '../package';
import express from 'express';
import graphql from './graphql';
import parseServer from './parse-server';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import myGraphQLSchema from './graphql/schema';

function loadSettings() {
  // try loading local settings inside shared settings directory
  try {
    return Object.assign({},
      // eslint-disable-next-line global-require
      require('../../settings/development/base'),
      // eslint-disable-next-line global-require
      require('../../settings/development/server')
    );
  } catch (e) {
    return JSON.parse(process.env.APPLICATION_SETTINGS);
  }
}

const settings = loadSettings();
const app = express();
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const serverPort = process.env.PORT || settings.serverPort;

parseServer.setup(app, packageJSON.name, settings);
graphql.setup(app);
// app.listen(serverPort, function() {
//   console.log(`server running on port ${serverPort}`);
// });

//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(serverPort);
