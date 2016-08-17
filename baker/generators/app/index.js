/* eslint max-len: "off" */
/* globals which: false */

import BaseGenerator from '../base';
import yosay from 'yosay';
import 'shelljs/global';
import fs from 'fs';
import fsExtra from 'fs-extra';

module.exports = BaseGenerator.extend({
  constructor(args, options) {
    BaseGenerator.call(this, args, options);

    this.applicationName = this.options.name;
    this.addServer = this.options.addServer;
  },

  initializing() {
    // XX: check if current directory has smth resembling a bootstrapped RN application
    if (this._currentDirectoryHasRNApp()) {
      this._abortSetup();
    }

    if (!this._checkIfRNIsInstalled()) {
      this.env.error('No React Native found: start by installing it https://facebook.github.io/react-native/docs/getting-started.html#quick-start');
    }

    this.log(yosay(
      'Welcome to the sublime Reactive Native generator!'
    ));

    this.option('baker');
  },

  prompting() {
    const prompts = [];

    this.applicationName = this.options.name;

    if (!this.applicationName) {
      prompts.push({
        type: 'input',
        name: 'name',
        message: 'What should your app be called?',
        default: 'MyReactApp',
        validate: value => (/^[$A-Z_][0-9A-Z_$]*$/i).test(value),
      });
    }

    if (typeof this.addServer === 'undefined') {
      prompts.push({
        type: 'confirm',
        name: 'addServer',
        message: 'Do you want a Parse Server setup for this app?',
        default: true,
      });
    }

    if (prompts.length !== 0) {
      const done = this.async();
      this.prompt(prompts, answers => {
        if (typeof this.applicationName === 'undefined') {
          this.applicationName = answers.name;
        }

        if (typeof this.addServer === 'undefined') {
          this.addServer = answers.addServer;
        }

        done();
      });
    }
  },

  makeSureDestinationDirectoryIsNotOccupiedAlready() {
    // check to see if destination directory is empty or not
    // if it's empty -> go ahead and do the thing
    // if not empty -> create a folder and use it as cwd
    // except if this.options.baker is on

    const filesInDestinationDirectory = fs.readdirSync(this.destinationPath('.'));
    if (filesInDestinationDirectory.length !== 0 && !this.options.baker) {
      fs.mkdirSync(this.destinationPath(this.applicationName));
      this.destinationRoot(this.destinationPath(this.applicationName));
    }
  },

  writing: {
    packageJSON() {
      const packageJSONPath = this.destinationPath('package.json');
      const packageJSON = {
        name: this.applicationName,
        engines: {
          node: '>=4.3',
        },
        scripts: {
          'build-ios': 'node node_modules/react-native/local-cli/cli.js bundle --entry-file index.ios.js --bundle-output iOS/main.jsbundle --platform "ios" --assets-dest ./  --dev false --reset-cache',
          'build-android': 'node node_modules/react-native/local-cli/cli.js bundle --entry-file index.android.js --bundle-output iOS/main.jsbundle --platform "android" --assets-dest ./  --dev false --reset-cache',
          ios: 'node node_modules/react-native/local-cli/cli.js run-ios',
          android: 'node node_modules/react-native/local-cli/cli.js run-android',
          'test:app': `./node_modules/mocha/bin/mocha ${this.appDirectory}/tests.js ./app/**/*.test.js`,
        },
        dependencies: {
          react: '~15.2.0',
          'react-native': '^0.29.0',
          'react-redux': '^4.4.5',
          redux: '^3.5.2',
          immutable: '^3.8.1',
          'redux-immutable': '^3.0.6',
          reselect: '^2.5.1',
          'react-native-navigation-redux-helpers': '^0.3.0',
          'redux-saga': '^0.11.0',
        },
        devDependencies: {
        },
      };

      if (this.addServer) {
        Object.assign(packageJSON.dependencies, {
          express: '^4.13.4',
          graphql: '^0.6.0',
          parse: '1.8.5',
          'parse-dashboard': '^1.0.13',
          'parse-graphql-client': '^0.2.0',
          'parse-graphql-server': '^0.3.0',
          'parse-server': '^2.2.11',
        });

        Object.assign(packageJSON.devDependencies, {
          'babel-watch': '^2.0.2',
          'babel-preset-react-native': '^1.9.0',
          'mongodb-runner': '^3.3.2',
          'react-addons-test-utils': '^15.2.1',
          'react-dom': '^15.2.1',
          'react-native-mock': '^0.2.4',
          enzyme: '^2.4.1',
        });

        Object.assign(packageJSON.scripts, {
          mongo: 'node ./node_modules/mongodb-runner/bin/mongodb-runner start --name=dev --purge false',
          server: 'npm run mongo && NODE_ENV=development ./baker/scripts/server.js',
          'server-debug': 'npm run mongo && NODE_ENV=development ./baker/scripts/server.js --debug',
          'server-watch': 'npm run mongo && NODE_ENV=development ./baker/scripts/server.js --watch',
        });
      }

      try {
        fs.statSync(packageJSONPath);

        // merge current package.json in the dest directory with packageJSON
        const originalPackageJSON = fsExtra.readJsonSync(packageJSONPath);

        const json = Object.assign(
          packageJSON, {
            scripts: Object.assign({}, originalPackageJSON.scripts, packageJSON.scripts),
            dependencies: Object.assign({}, originalPackageJSON.dependencies, packageJSON.dependencies),
            devDependencies: Object.assign({}, originalPackageJSON.devDependencies, packageJSON.devDependencies),
          }
        );

        this.conflicter.force = true;
        this.fs.writeJSON(json);
      } catch (e) {
        // no package.json in the target directory
        this.fs.writeJSON(packageJSONPath, packageJSON);
      }
    },

    serverFiles() {
      if (!this.addServer) {
        return;
      }

      this.bulkDirectory('server', this.serverDirectory);
      this.bulkDirectory('settings', this.settingsDirectory);
      this.copy('settings.js', `${this.appDirectory}/settings.js`);

      this.composeWith('model', {
        options: {
          modelName: 'Example',
        },
      }, {
        local: require.resolve('../model'),
      });
    },
  },

  install: {
    setupRN() {
      this.installDependencies({
        bower: false,
        callback: () => {
          this._initRN();
        },
      });
    },
  },

  end() {
    this.conflicter.force = true;

    ['ios', 'android'].forEach(platform => {
      this.template('index.js.hbs', `index.${platform}.js`,
        {
          applicationName: this.applicationName,
        }
      );
    });

    this.bulkDirectory('app', this.appDirectory);
    this.composeWith('component', {
      options: {
        componentName: 'App',
        destinationRoot: this.destinationPath('.'),
        boilerplateName: 'Vanila',
        platformSpecific: false,
      },
    }, {
      local: require.resolve('../component'),
    });
  },

  _checkIfRNIsInstalled() {
    return which('react-native');
  },

  _initRN() {
    this.spawnCommandSync('node', [
      this.templatePath('setup-rn.js'),
      this.destinationRoot(),
      this.applicationName,
    ]);
  },

  _currentDirectoryHasRNApp() {
    try {
      ['android', 'ios', 'index.ios.js', 'index.android.js'].forEach(f => fs.statSync(this.destinationPath(f)));
      return true;
    } catch (e) {
      return false;
    }
  },

  _abortSetup() {
    this.env.error('Yo! Looks like you are trying to run the app generator in a directory that already has a RN app.');
  },
});
