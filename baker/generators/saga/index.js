import BaseGenerator from '../base';
import _ from 'lodash';

module.exports = BaseGenerator.extend({
  constructor(args, options) {
    BaseGenerator.call(this, args, options);

    this.boilerplateName = options.boilerplateName;
  },

  prompting() {
    const done = this.async();
    const prompts = [{
      type: 'input',
      name: 'sagaName',
      message: 'What should your saga be called?',
      default: 'talkToServer',
      validate: value => this.namingConventions.sagaName.regEx.test(value),
    }];

    if (!this.boilerplateName) {
      prompts.push({
        type: 'list',
        name: 'boilerplateName',
        message: 'Which boilerplate do you want to use?',
        default: 'Vanila',
        choices: () => this._listAvailableBoilerPlates(),
      });
    }

    this.prompt(prompts, answers => {
      this.sagaName = this.namingConventions.sagaName.clean(answers.sagaName);

      if (typeof this.boilerplateName === 'undefined') {
        this.boilerplateName = answers.boilerplateName;
      }

      done();
    });
  },

  writing: {
    sagaFile() {
      this.runBoilerplateBeforeHook(this.boilerplateName);

      this.template('saga.js.hbs', `${this.appDirectory}/sagas/${this.sagaName}.js`,
        Object.assign(this, {
          boilerplate: this._renderBoilerplate(this.boilerplateName),
        })
      );

      this.runBoilerplateAfterHook(this.boilerplateName);
    },

    updateSagasIndex() {
      const sagasIndex = this.destinationPath(`${this.appDirectory}/sagas/index.js`);
      let sagasIndexContent;
      let sagasModule;

      if (this._fileExists(sagasIndex)) {
        sagasIndexContent = this._readFile(sagasIndex);
      } else {
        sagasIndexContent = this._readFile(this.templatePath('index.js'));
      }

      try {
        sagasModule = this.parseJSSource(sagasIndexContent);
      } catch (e) {
        console.error('error is', e);
        this.env.error(`There seems to be an issue with your sagas module (${sagasIndex})`, e);
        return;
      }

      // add import statement to the top of the
      // sagas index module to include new saga
      sagasModule.body = [{
        type: 'ImportDeclaration',
        specifiers: [
          {
            type: 'ImportSpecifier',
            local: {
              type: 'Identifier',
              name: this.sagaName,
            },
            imported: {
              type: 'Identifier',
              name: this.sagaName,
            },
          },
        ],
        source: {
          type: 'Literal',
          value: `./${this.sagaName}`,
          raw: `'./${this.sagaName}'`,
        },
      }, ...sagasModule.body];

      const sagasList = _.find(sagasModule.body, d =>
        d.type === 'VariableDeclaration' && d.declarations[0].id.name === 'sagas'
      );

      if (!sagasList) {
        this.env.error(
          // eslint-disable-next-line max-len
          `There seems to be an issue with your sagas module (${sagasIndex}) - cannot find list of sagas`
        );
        return;
      }

      sagasList.declarations[0].init.elements.push({
        type: 'Identifier',
        name: this.sagaName,
      });

      try {
        this.generateJSFile(sagasModule, sagasIndex);
      } catch (e) {
        console.error('error generating sagas/index.js', e);
      }
    },
  },
});
