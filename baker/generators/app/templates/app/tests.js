/* eslint no-param-reassign: "off", prefer-arrow-callback: "off" */

require('babel-register')({
  presets: ['es2015', 'react-native'],
});
require('react-native-mock/mock');

global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

function testSetup(root) {
  root.expect = root.chai.expect;

  beforeEach(function be() {
    // Using these globally-available Sinon features is preferrable, as they're
    // automatically restored for you in the subsequent `afterEach`
    root.sandbox = root.sinon.sandbox.create();
    root.sinon = root.sinon;
    root.stub = root.sandbox.stub.bind(root.sandbox);
    root.spy = root.sandbox.spy.bind(root.sandbox);
    root.mock = root.sandbox.mock.bind(root.sandbox);
    root.useFakeTimers = root.sandbox.useFakeTimers.bind(root.sandbox);
    root.useFakeXMLHttpRequest = root.sandbox.useFakeXMLHttpRequest.bind(root.sandbox);
    root.useFakeServer = root.sandbox.useFakeServer.bind(root.sandbox);
  });

  afterEach(function ae() {
    delete root.stub;
    delete root.spy;
    root.sandbox.restore();
  });
}

testSetup(global);
