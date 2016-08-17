import settings from '../settings/development';
import packageJSON from '../package';
import express from 'express';
import graphql from './graphql';
import parseServer from './parse-server';

const app = express();
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

parseServer.setup(app, packageJSON.name, settings, IS_DEVELOPMENT);
graphql.setup(app, IS_DEVELOPMENT);

app.listen(settings.serverPort, () => {
  console.log(`server running on port ${settings.serverPort}`);
});
