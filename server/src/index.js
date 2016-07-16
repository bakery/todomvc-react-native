import settings from '../settings/development';
import packageJSON from '../package';
import express from 'express';
import graphql from './graphql';
import parseServer from './parse-server';

const app = express();
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

console.log('process.env.NODE_ENV is', process.env.NODE_ENV);

parseServer.setup(app, packageJSON.name, settings);
graphql.setup(app, IS_DEVELOPMENT);

app.listen(process.env.PORT || settings.serverPort, function() {
  console.log(`server running on port ${settings.serverPort}`);
});
