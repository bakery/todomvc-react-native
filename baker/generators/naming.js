import changeCase from 'change-case';

const namingConventions = {
  componentName: {
    regEx: /^[A-Z][0-9A-Z]*$/i,
    clean: name => changeCase.pascal(name),
  },

  reducerName: {
    clean: name => changeCase.camelCase(name),
  },

  selectorName: {
    clean: componentName => `select${changeCase.pascalCase(componentName)}`,
  },

  sagaName: {
    regEx: /^[A-Z][0-9A-Z]*$/i,
    clean: name => changeCase.camelCase(name),
  },

  modelName: {
    regEx: /^[A-Z][0-9A-Z]*$/i,
    clean: name => changeCase.pascal(name),
  },
};

export default namingConventions;
