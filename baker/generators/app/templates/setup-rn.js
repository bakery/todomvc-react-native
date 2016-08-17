#!/usr/bin/env node

/* eslint no-var: "off" */

// XX: Not really a template
// usage: node setup-rn.js /path/to/project/root projectName

var path = require('path');
var clipath = path.resolve(process.argv[2],
  'node_modules',
  'react-native',
  'cli.js'
);
var cli = require(clipath);
cli.init(process.argv[2], process.argv[3]);
