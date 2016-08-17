/* eslint no-unused-vars: 0, no-unused-expressions:0 */

import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mkdirp from 'mkdirp';
import fs from 'fs-extra';
import mockery from 'mockery';

const expect = chai.expect;
const reducerGeneratorModule = path.join(__dirname, '../../reducer');

describe('generator-rn:reducer', () => {
  const appDirectory = 'app';
  const container = 'Comments';
  const boilerplate = 'Vanila';

  let runBoilerplateBeforeHookSpy;
  let runBoilerplateAfterHookSpy;

  describe('without existing reducers module', () => {
    before(done => {
      runBoilerplateBeforeHookSpy = sinon.spy();
      runBoilerplateAfterHookSpy = sinon.spy();

      mockery.enable();
      mockery.warnOnUnregistered(false);
      mockery.registerMock('./boilerplates', {
        runBoilerplateBeforeHook: runBoilerplateBeforeHookSpy,
        runBoilerplateAfterHook: runBoilerplateAfterHookSpy,
      });

      helpers.run(reducerGeneratorModule)
      .withOptions({
        container,
        boilerplateName: boilerplate,
      }).withPrompts({
        appDirectory,
        container,
      })
      .on('end', done);
    });

    after(() => {
      mockery.deregisterAll();
      mockery.disable();
    });

    it('creates reducer files', () => {
      assert.file([
        'reducer.js',
        'reducer.test.js',
        'actions.js',
        'actions.test.js',
        'constants.js',
      ].map(f => `${appDirectory}/components/${container}/${f}`));
    });

    it('updates root reducers file with new reducer info', () => {
      const reducersModulePath = `${appDirectory}/reducers.js`;
      assert.file(reducersModulePath);
      assert.fileContent(reducersModulePath,
        `import comments from './components/${container}/reducer'`
      );
      assert.fileContent(reducersModulePath,
        'comments: comments'
      );
    });

    it('default exports newly created reducer ', () => {
      const reducerModulePath = `${appDirectory}/components/${container}/reducer.js`;
      assert.fileContent(reducerModulePath,
        'export default comments'
      );
    });

    it('exports a selector for the newly created reducer ', () => {
      const reducerModulePath = `${appDirectory}/components/${container}/reducer.js`;
      assert.fileContent(reducerModulePath,
        'export function selectComments(state) {'
      );
    });

    it('calls boilerplate hooks', () => {
      expect(runBoilerplateBeforeHookSpy.calledOnce).to.be.ok;
      expect(runBoilerplateBeforeHookSpy.calledWith(boilerplate)).to.be.ok;
      expect(runBoilerplateAfterHookSpy.calledOnce).to.be.ok;
      expect(runBoilerplateAfterHookSpy.calledWith(boilerplate)).to.be.ok;
    });
  });
});
