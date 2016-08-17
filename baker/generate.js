import 'babel-polyfill';
import yeoman from 'yeoman-environment';

const argv = require('minimist')(process.argv.slice(2));
const env = yeoman.createEnv();
const generators = [
  'app', 'component', 'container', 'list', 'reducer', 'navigation',
];
const supportedCommands = ['app'];

generators.forEach(g => env.register(`./baker/generators/${g}`, `rn:${g}`));

function defaultCommand() {
  env.run('rn:list');
}

function setupApp() {
  const ops = { baker: 'baker' };
  if (argv._.length >= 2) {
    ops.name = argv._[1];
  }

  if (argv.server) {
    Object.assign(ops, { addServer: true });
  }

  env.run('rn', ops);
}

function runCommand() {
  if (argv._.length !== 0) {
    const command = argv._[0];

    if (supportedCommands.indexOf(command) === -1) {
      return;
    }

    switch (command) {
      case 'app':
        setupApp();
        break;
      default:
        defaultCommand();
    }
  } else {
    defaultCommand();
  }
}

runCommand();
