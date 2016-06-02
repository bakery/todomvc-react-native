import { createStore, compose } from 'redux';
import { fromJS } from 'immutable';
import createReducer from './reducers';
import devTools from 'remote-redux-devtools';

function configureStore(initialState = fromJS({})) {
  if (__DEV__) {
    const createStoreWithMiddleware = compose(devTools())(createStore);
    return createStoreWithMiddleware(createReducer(), initialState);
  } else {
    return createStore(createReducer(), initialState);
  }
}

module.exports = configureStore;
