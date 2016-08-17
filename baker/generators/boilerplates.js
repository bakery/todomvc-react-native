module.exports = {
  runBoilerplateHook(boilerplate, hookType) {
    try {
      const hookModuleLocation = this.templatePath(`./boilerplates/${boilerplate}__hook.js`);
      // eslint-disable-next-line global-require
      const moduleHook = require(hookModuleLocation);

      switch (hookType) {
        case 'before':
          moduleHook.before(this);
          break;
        case 'after':
          moduleHook.after(this);
          break;
        default:
          throw new Error('Invalid hook type', hookType);
      }
    } catch (e) {
      // no hooks
    }
  },

  runBoilerplateBeforeHook(boilerplate) {
    this.runBoilerplateHook(boilerplate, 'before');
  },

  runBoilerplateAfterHook(boilerplate) {
    this.runBoilerplateHook(boilerplate, 'after');
  },
};
