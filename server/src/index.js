import packageJSON from '../package';
import express from 'express';
import delay from 'express-delay';
import graphql from './graphql';
import parseServer from './parse-server';

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
const serverPort = process.env.PORT || settings.serverPort;

// XX: delay all the responses
app.use(delay(0));

parseServer.setup(app, packageJSON.name, settings);
graphql.setup(app);

app.listen(serverPort);
