import BaseGenerator from '../base';
import _ from 'lodash';

module.exports = BaseGenerator.extend({
  constructor(args, options) {
    BaseGenerator.call(this, args, options);

    if (!options || !options.container) {
      // XX: reducer generator is currently only meant
      // to be used through composeWith
      this.env.error('container option is required in reducer generator');
      return;
    }

    this.container = options.container;
    this.reducerName = this.namingConventions.reducerName.clean(this.container);
    this.boilerplateName = options.boilerplateName || 'Vanila';
    this.doNotGenerateTests = options.doNotGenerateTests;
  },

  configuring: {
    files() {
      this.files = [
        'actions.js.hbs',
        'constants.js.hbs',
        'reducer.js.hbs',
      ];

      if (!this.doNotGenerateTests) {
        this.files = [
          'actions.test.js.hbs',
          'reducer.test.js.hbs',
          ...this.files,
        ];
      }
    },

    boilerplate() {
      this.boilerplate = this._renderBoilerplate(this.boilerplateName);
    },
  },

  writing: {
    everything() {
      this.runBoilerplateBeforeHook(this.boilerplateName);

      this.files.forEach(f => this.template(f,
        `${this.appDirectory}/components/${this.container}/${this._dropHBSExtension(f)}`));

      this.runBoilerplateAfterHook(this.boilerplateName);
    },

    updateRootReducersModule() {
      const reducersModulePath = `${this.appDirectory}/reducers.js`;
      let reducersModuleContent;
      let reducersModule;

      if (this._fileExists(this.destinationPath(reducersModulePath))) {
        reducersModuleContent = this._readFile(reducersModulePath);
      } else {
        reducersModuleContent = this.read(this.templatePath('reducers.js.hbs'));
      }

      try {
        // reducersModule = esprima.parse(reducersModuleContent, this.esprimaOptions);
        reducersModule = this.parseJSSource(reducersModuleContent);
      } catch (e) {
        const path = this.destinationPath(reducersModulePath);
        this.env.error(`There seems to be an issue with your reducers module (${path})`, e);
        return;
      }

      // add import statement to the top of the
      // reducers module including new reducer
      reducersModule.body = [{
        type: 'ImportDeclaration',
        specifiers: [
          {
            type: 'ImportDefaultSpecifier',
            local: {
              type: 'Identifier',
              name: `${this.reducerName}`,
            },
            imported: {
              type: 'Identifier',
              name: `${this.reducerName}`,
            },
          },
        ],
        source: {
          type: 'Literal',
          value: `./components/${this.container}/reducer`,
          raw: `'./components/${this.container}/reducer'`,
        },
      }, ...reducersModule.body];

      // add new reducer to the module export
      // find top level var called applicationReducers
      // add new reducer to init.properties

      const applicationReducersVar = _.find(reducersModule.body,
        d => d.type === 'VariableDeclaration' && d.declarations[0].id.name === 'applicationReducers'
      );

      if (applicationReducersVar) {
        applicationReducersVar.declarations[0].init.properties.push({
          type: 'Property',
          key: {
            type: 'Identifier',
            name: this.reducerName,
          },
          computed: false,
          value: {
            type: 'Identifier',
            name: this.reducerName,
          },
          kind: 'init',
          method: false,
          shorthand: false,
        });
      } else {
        // XX: this should not happen normally
        // unless applicationReducers got moved somewhere, deleted
        this.env.error('Your reducers.js module is missing applicationReducers var');
        return;
      }

      try {
        this.generateJSFile(reducersModule, reducersModulePath);
      } catch (e) {
        console.error('error generating reducers.js', e);
      }
    },
  },
});
