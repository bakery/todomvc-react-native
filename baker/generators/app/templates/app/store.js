import { createStore, compose, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import createReducer from './reducers';
import sagas from './sagas';
import createSagaMiddleware from 'redux-saga';
import devTools from 'remote-redux-devtools';

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState = fromJS({})) {
  const enhancers = [
    applyMiddleware(sagaMiddleware),
  ];

  if (__DEV__) {
    enhancers.push(devTools());
  }

  // const createStoreWithMiddleware = compose(...middleware)(createStore);
  // return createStoreWithMiddleware(createReducer(), initialState);
  const store = createStore(createReducer(), initialState, compose(...enhancers));

  sagas.forEach(saga => sagaMiddleware.run(saga));

  return store;
}

module.exports = configureStore;
