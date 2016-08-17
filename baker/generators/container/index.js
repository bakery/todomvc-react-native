import BaseGenerator from '../base';

module.exports = BaseGenerator.extend({
  constructor(args, options) {
    BaseGenerator.call(this, args, options);

    this.containerName = options.name;
    this.selectorName = null;
    this.boilerplateName = options.boilerplateName;
    this.addReducer = options.addReducer;
    this.doNotGenerateTests = options.doNotGenerateTests;
  },

  prompting() {
    const done = this.async();
    const prompts = [];

    if (!this.containerName) {
      prompts.push({
        type: 'input',
        name: 'containerName',
        message: 'What should your container be called?',
        default: 'MyNewContainer',
        validate: value => this.namingConventions.componentName.regEx.test(value),
      });
    }

    if (typeof this.addReducer === 'undefined') {
      prompts.push({
        type: 'confirm',
        name: 'addReducer',
        message: 'Do you want a reducer + actions + constants generated?',
        default: true,
      });
    }

    prompts.push({
      type: 'input',
      name: 'selectorName',
      message: 'What is the name for the new selector?',
      default: answers => this.namingConventions.selectorName.clean(answers.containerName),
      validate: value => (/^[$A-Z_][0-9A-Z_$]*$/i).test(value),
      when: answers => answers.containerSelectorName === 'New Selector',
    });

    if (prompts.length === 0) {
      done();
      return;
    }

    this.prompt(prompts, answers => {
      if (answers.containerName) {
        this.containerName = answers.containerName;
      }

      if (typeof this.addReducer === 'undefined') {
        this.addReducer = answers.addReducer;
      }

      done();
    });
  },

  configuring: {
    files() {
      this.containerName = this.namingConventions.componentName.clean(this.containerName);

      this.files = [
        'index.js',
        'test.js',
      ];
    },
  },

  writing: {
    component() {
      this.composeWith('rn:component', {
        options: {
          componentName: this.containerName,
          isContainer: true,
          addReducer: this.addReducer,
          selectorName: this.selectorName,
          boilerplateName: this.boilerplateName,
          doNotGenerateTests: this.doNotGenerateTests,
        },
      }, {
        local: require.resolve('../component'),
      });
    },
  },
});
