import 'babel-polyfill';
import yeoman from 'yeoman-generator';
import _ from 'lodash';
import changeCase from 'change-case';
import fs from 'fs';
import Handlebars from 'handlebars';
import esprima from 'esprima';
import escodegen from 'escodegen';
import escodegenOptions from './escodegen';
import esprimaOptions from './esprima';
import namingConventions from './naming';
import shell from 'shelljs';

module.exports = yeoman.Base.extend({
  constructor(...args) {
    yeoman.Base.apply(this, args);

    // eslint-disable-next-line global-require
    const boilerplates = require('./boilerplates');
    this.runBoilerplateHook = boilerplates.runBoilerplateHook;
    this.runBoilerplateBeforeHook = boilerplates.runBoilerplateBeforeHook;
    this.runBoilerplateAfterHook = boilerplates.runBoilerplateAfterHook;

    this.appDirectory = 'app';
    this.serverDirectory = 'server';
    this.settingsDirectory = 'settings';
    this.platforms = ['ios', 'android'];
    this.namingConventions = namingConventions;
    this.Handlebars = Handlebars;
    // XX: navigation generator needs these to
    // list available navigation boilerplates
    // since they are explicitly excluded from component generator
    this.navigationBoilerplates = [
      'navigation/Cards',
      'navigation/Tabs',
    ];

    this.Handlebars.registerHelper('uppercaseFirst', text => changeCase.upperCaseFirst(text));
    this.Handlebars.registerHelper('pascalCase', text => changeCase.pascalCase(text));
    this.Handlebars.registerHelper('camelCase', text => changeCase.camelCase(text));
    this.Handlebars.registerHelper('constantCase', text => changeCase.constantCase(text));

    this.template = (source, destination, data) => {
      // XX: override Yo's standard template method to use Handlebars templates
      const template = Handlebars.compile(this.read(source));
      const content = template(_.extend({}, this, data || {}));
      this.write(destination, content);
    };

    this.parseJSSource = content => {
      let tree = esprima.parse(content, esprimaOptions);
      tree = escodegen.attachComments(tree, tree.comments, tree.tokens);
      return tree;
    };

    this.generateJSFile = (ast, path) => {
      const content = escodegen.generate(ast, escodegenOptions);
      this.write(path, content);
    };
  },

  _fileExists(fullFilePath) {
    try {
      fs.statSync(fullFilePath);
      return true;
    } catch (e) {
      return false;
    }
  },

  _readFile(fullFilePath) {
    return fs.readFileSync(fullFilePath).toString();
  },

  _dropHBSExtension(fileName) {
    const parts = fileName.split('.hbs');
    return parts.length === 2 ? parts[0] : fileName;
  },

  _listAvailableBoilerPlates() {
    const excludeBoilerplates = [...this.navigationBoilerplates];
    const boilerplatesPath = this.templatePath('./boilerplates');

    const boilerplates = _.uniq(
      shell.find(boilerplatesPath).filter(file => file.match(/\.js.hbs$/i))
        .map(file => (/\/([a-zA-Z0-9\/]+)(\.ios|\.android)?\.js\.hbs$/ig).exec(
          file.split(boilerplatesPath)[1])[1]
        )
    );

    return boilerplates.filter(b => excludeBoilerplates.indexOf(b) === -1);
  },

  _renderBoilerplate(boilerplate, platform) {
    let template;
    try {
      // see if there's a boiler plate for this specific platorm
      template = this.read(`./boilerplates/${boilerplate}.${platform}.js.hbs`);
    } catch (e) {
      template = this.read(`./boilerplates/${boilerplate}.js.hbs`);
    }

    return Handlebars.compile(template)(this);
  },

  _isBoilerplatePlatformSpecific(boilerplate) {
    try {
      this.platforms.forEach(platform => {
        fs.statSync(this.templatePath(`./boilerplates/${boilerplate}.${platform}.js.hbs`));
      });
      return true;
    } catch (e) {
      return false;
    }
  },

  dummyMethod() {
    // XX: keep this here so tests can run against base generator
  },
});
