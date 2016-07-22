#!/usr/bin/env node

/* eslint  no-var:"off", no-console:"off", vars-on-top:"off", prefer-arrow-callback:"off" */

var run = require('child_process').execSync;
var argv = require('minimist')(process.argv.slice(2));
var forever = require('forever-monitor');

var options = {
  max: 3,
  command: './node_modules/babel-cli/bin/babel-node.js',
  args: ['--presets', 'es2015', '--plugins', 'transform-object-rest-spread'],
};

if (argv.watch) {
  console.log('watching');
  options.watch = true;
  options.watchDirectory = './src';
}

if (argv.debug) {
  console.log('debugging');
  options.args.push('--debug');
}

var monitor = new (forever.Monitor)('./src', options);

monitor.on('start', function onMonitorStarted() {
  if (argv['test-run']) {
    console.log('testing server...');
    setTimeout(function onAfterServerStared() {
      run('curl localhost:8000');
      monitor.stop();
    }, 30000);
  }
});
monitor.on('stderr', function onServerScriptError(error) {
  console.error(error.toString());
});

monitor.start();
