import App from './components/App';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import sagas from './sagas';
import Parse from 'parse/react-native';
import { AsyncStorage } from 'react-native';
import Settings from './settings';

const settings = Settings.load();

Parse.initialize(settings.parseServerApplicationId);
Parse.serverURL = settings.parseServerURL;

const store = configureStore();
sagas.forEach(saga => store.runSaga(saga));

// if (__DEV__) {
//  AsyncStorage.clear();
// }

function setup() {
  class Root extends Component {
    render() {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

module.exports = setup;
