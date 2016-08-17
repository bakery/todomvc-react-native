#!/usr/bin/env node

import path from 'path';
import { execSync as run } from 'child_process';
import serverSettings from '../../settings/production/server';
import baseSettings from '../../settings/production/base';

const settings = Object.assign(baseSettings, serverSettings);

console.log('deploying jazz with', settings);

run(`heroku config:set APPLICATION_SETTINGS='${JSON.stringify(settings)}'`);
run('git subtree push --prefix server heroku master', {
  cwd: path.resolve('..'),
});
