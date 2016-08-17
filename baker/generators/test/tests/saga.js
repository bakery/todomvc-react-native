/* eslint no-unused-vars: 0, no-unused-expressions:0 */

import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import fs from 'fs-extra';

const expect = chai.expect;

describe('generator-rn:saga', () => {
  const appDirectory = 'app';
  const sagaName = 'talkToServer';

  describe('without existing saga index file', () => {
    before(done => {
      helpers.run(path.join(__dirname, '../../saga'))
      .withPrompts({
        sagaName,
      })
      .on('end', done);
    });

    it('creates a saga file', () => {
      assert.file([
        `${appDirectory}/sagas/${sagaName}.js`,
      ]);
    });

    it('eports a saga within saga file', () => {
      assert.fileContent(`${appDirectory}/sagas/${sagaName}.js`,
        `export function* ${sagaName}()`
      );
    });

    it('creates sagas index file', () => {
      assert.file(`${appDirectory}/sagas/index.js`);
    });

    it('imports new saga in sagas/index.js', () => {
      assert.fileContent(`${appDirectory}/sagas/index.js`,
        `import { ${sagaName} } from './${sagaName}';`
      );
    });

    it('exports new saga in sagas/index.js', () => {
      assert.fileContent(`${appDirectory}/sagas/index.js`,
        `const sagas = [${sagaName}];`
      );
      assert.fileContent(`${appDirectory}/sagas/index.js`,
        'module.exports = sagas;'
      );
    });
  });

  describe('with boilerplate selected', () => {
    before(done => {
      helpers.run(path.join(__dirname, '../../saga'))
      .withPrompts({
        sagaName,
        boilerplateName: 'MethodCall',
      })
      .on('end', done);
    });

    it('creates a saga file', () => {
      assert.file([
        `${appDirectory}/sagas/${sagaName}.js`,
      ]);
    });

    it('eports a saga within saga file', () => {
      assert.fileContent(`${appDirectory}/sagas/${sagaName}.js`,
        `export function* ${sagaName}()`
      );
    });

    it('creates sagas index file', () => {
      assert.file(`${appDirectory}/sagas/index.js`);
    });

    it('imports new saga in sagas/index.js', () => {
      assert.fileContent(`${appDirectory}/sagas/index.js`,
        `import { ${sagaName} } from './${sagaName}';`
      );
    });

    it('exports new saga in sagas/index.js', () => {
      assert.fileContent(`${appDirectory}/sagas/index.js`,
        `const sagas = [${sagaName}];`
      );
      assert.fileContent(`${appDirectory}/sagas/index.js`,
        'module.exports = sagas;'
      );
    });
  });

  describe('with existing saga index file', () => {
    before(done => {
      helpers.run(path.join(__dirname, '../../saga'))
        .inTmpDir(dir => {
          fs.copySync(
            path.join(__dirname, './fixtures/sagas.index.js.template'),
            path.join(dir, `${appDirectory}/sagas/index.js`)
          );
        })
        .withArguments(['--force'])
        .withPrompts({
          sagaName,
        })
        .on('end', done);
    });

    it('keeps original sagas', () => {
      assert.fileContent(`${appDirectory}/sagas/index.js`,
        'import { anotherSaga } from \'./anotherSaga\';'
      );
    });

    it('adds new saga module', () => {
      assert.file(`${appDirectory}/sagas/${sagaName}.js`);
    });

    it('references new saga module in sagas/index.js', () => {
      assert.fileContent(`${appDirectory}/sagas/index.js`,
        `import { ${sagaName} } from './${sagaName}'`);
    });
  });
});
