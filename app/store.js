import { applyMiddleware, compose, createStore, } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import devTools from 'remote-redux-devtools';

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState = fromJS({})) {
  let middlewares = [
    sagaMiddleware
  ];

  let enhancers = [
    applyMiddleware(...middlewares)
  ];

  if (__DEV__) {
    enhancers.push(devTools());
  }

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;

  return store;
}

module.exports = configureStore;
