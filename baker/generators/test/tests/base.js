/* eslint no-unused-vars: 0, no-unused-expressions:0 */

import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const expect = chai.expect;

describe('base generator', () => {
  let _generator = null;

  before(done => {
    helpers.run(path.join(__dirname, '../../base.js'))
      .on('ready', generator => { _generator = generator; })
      .on('end', done);
  });

  it('is defined', () => {
    expect(_generator).to.be.ok;
  });

  it('has appDirectory attribute', () => {
    expect(_generator.appDirectory).to.be.ok;
  });
});
