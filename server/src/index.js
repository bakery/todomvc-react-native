import packageJSON from '../package';
import express from 'express';
import graphql from './graphql';
import parseServer from './parse-server';

function loadSettings() {
  // try loading local settings inside shared settings directory
  try {
    return require('../../settings/development/base');
  } catch(e) {
    return process.env.APPLICATION_SETTINGS;
  }
};

const settings = loadSettings();
const app = express();
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const serverPort = process.env.PORT || settings.serverPort;

parseServer.setup(app, packageJSON.name, settings);
graphql.setup(app, IS_DEVELOPMENT);

app.listen(serverPort, function() {
  console.log(`server running on port ${serverPort}`);
});
