var argv = require('minimist')(process.argv.slice(2));
var yeoman = require('yeoman-environment');
var env = yeoman.createEnv();
var supportedCommands = ['generate','generate:app'];

function runCommand() {
  if (argv._.length !== 0) {
    var command = argv._[0];

    if (supportedCommands.indexOf(command) === -1) {
      return;
    }

    switch (command) {
      case 'generate':
        env.lookup(function () {
          env.run('rn:list');
        });
        break;
      case 'generate:app':
        env.lookup(function () {
          env.run('rn', {baker: 'baker'});
        });
        break;
    }
  }
}

runCommand();
