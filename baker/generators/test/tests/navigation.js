import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const expect = chai.expect;
const navigationGeneratorModule = path.join(__dirname, '../../navigation');
const appDirectory = 'app';
const componentName = 'Navigation';
const boilerplateName = 'navigation/Cards';

describe('generator-rn:navigation', () => {
  let _generator = null;

  before(done => {
    helpers.run(navigationGeneratorModule)
      .withPrompts({
        componentName,
        boilerplateName,
      })
      .on('ready', generator => {
        _generator = generator;
      })
      .on('end', done);
  });

  it('is defined', () => {
    expect(_generator).to.be.ok;
  });

  it('creates a container', () => {
    assert.file([
      'index.js',
      'styles.js',
      'reducer.js',
    ].map(f => `${appDirectory}/components/${componentName}/${f}`));
  });

  it('does not include tests', () => {
    assert.noFile(`${appDirectory}/components/${componentName}/index.test.js`);
    assert.noFile(`${appDirectory}/components/${componentName}/actions.test.js`);
    assert.noFile(`${appDirectory}/components/${componentName}/reducer.test.js`);
  });
});
