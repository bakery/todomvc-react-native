import App from './components/App';
import React, { Component } from 'react';
import configureStore from './store';
import sagas from './sagas';
import Parse from 'parse/react-native';
import Settings from './settings';
import { ApolloProvider } from 'react-apollo';
import apollo from './state/apollo';

const settings = Settings.load();

Parse.initialize(settings.parseServerApplicationId);
Parse.serverURL = settings.parseServerURL;

const store = configureStore();
sagas.forEach(saga => store.runSaga(saga));

function setup() {
  class Root extends Component {
    render() {
      return (
        <ApolloProvider store={store} client={apollo} immutable={true}>
          <App />
        </ApolloProvider>
      );
    }
  }

  return Root;
}

module.exports = setup;
