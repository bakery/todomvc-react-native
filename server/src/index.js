import packageJSON from '../package';
import express from 'express';
import graphql from './graphql';
import parseServer from './parse-server';

function loadSettings() {
  // try loading local settings inside shared settings directory
  try {
    return require('../../settings/development/base');
  } catch(e) {
    return process.env;
  }
};

const settings = loadSettings();
const app = express();
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

console.log('process.env.NODE_ENV is', process.env.NODE_ENV);
console.log('process.env.PORT is', process.env.PORT);

parseServer.setup(app, packageJSON.name, settings);
graphql.setup(app, IS_DEVELOPMENT);

app.listen(settings.serverPort, function() {
  console.log(`server running on port ${settings.serverPort}`);
});
