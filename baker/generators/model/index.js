import BaseGenerator from '../base';
import changeCase from 'change-case';

module.exports = BaseGenerator.extend({
  constructor(args, options) {
    BaseGenerator.call(this, args, options);

    this.modelName = options.modelName;
  },

  prompting() {
    const prompts = [];

    if (!this.modelName) {
      prompts.push({
        type: 'input',
        name: 'modelName',
        message: 'What should your model be called?',
        default: 'Todo',
        validate: value => this.namingConventions.modelName.regEx.test(value),
      });
    }

    if (prompts.length !== 0) {
      const done = this.async();
      this.prompt(prompts, answers => {
        if (!this.modelName) {
          this.modelName = answers.modelName;
        }
        done();
      });
    }
  },

  writing: {
    serverModel() {
      this.template('server/models/index.js.hbs',
        `${this.serverDirectory}/models/${this.modelName}.js`);
    },

    updateGraphQLSchemaFile() {
      const graphQLSchemaModulePath = `${this.serverDirectory}/graphql/schema.js`;
      let schemaModuleContent;
      let schemaModule;

      if (this._fileExists(this.destinationPath(graphQLSchemaModulePath))) {
        schemaModuleContent = this._readFile(graphQLSchemaModulePath);
      } else {
        schemaModuleContent = this.read(this.templatePath('schema.js.hbs'));
      }

      try {
        schemaModule = this.parseJSSource(schemaModuleContent);
      } catch (e) {
        const path = this.destinationPath(graphQLSchemaModulePath);
        this.env.error(`There seems to be an issue with your reducers module (${path})`, e);
        return;
      }

      // add import statement for the new model
      schemaModule.body = [{
        type: 'ImportDeclaration',
        specifiers: [
          {
            type: 'ImportDefaultSpecifier',
            local: {
              type: 'Identifier',
              name: `${this.modelName}`,
            },
            imported: {
              type: 'Identifier',
              name: `${this.modelName}`,
            },
          },
        ],
        source: {
          type: 'Literal',
          value: `../models/${this.modelName}`,
          raw: `'../models/${this.modelName}'`,
        },
      }, ...schemaModule.body];

      // include schema of a newly created model in graphql/schema module
      const queriesDeclaration = schemaModule.body.find(
        i => i.type === 'VariableDeclaration' && i.declarations &&
          i.declarations[0] && i.declarations[0].id.name === 'queries'
      );

      if (!queriesDeclaration) {
        // eslint-disable-next-line max-len
        this.env.error(`Your ${this.serverDirectory}/graphql/schema.js module is missing queries const`);
      }

      queriesDeclaration.declarations[0].init.properties.push({
        type: 'Property',
        key: {
          type: 'Identifier',
          name: changeCase.camelCase(this.modelName),
        },
        computed: false,
        value: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: this.modelName,
          },
          property: {
            type: 'Identifier',
            name: 'RootQuery',
          },
        },
        kind: 'init',
        method: false,
        shorthand: false,
      });

      // include mutations of a newly created model in graphql/schema module
      const mutationsDeclaration = schemaModule.body.find(
        i => i.type === 'VariableDeclaration' && i.declarations &&
          i.declarations[0] && i.declarations[0].id.name === 'mutations'
      );

      if (!mutationsDeclaration) {
        // eslint-disable-next-line max-len
        this.env.error(`Your ${this.serverDirectory}/graphql/schema.js module is missing mutations const`);
      }

      mutationsDeclaration.declarations[0].init.elements.push({
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: this.modelName,
        },
        property: {
          type: 'Identifier',
          name: 'Mutations',
        },
      });

      try {
        this.generateJSFile(schemaModule, graphQLSchemaModulePath);
      } catch (e) {
        console.error(`error generating ${this.serverDirectory}/graphql/schema.js`, e);
      }
    },
  },
});
