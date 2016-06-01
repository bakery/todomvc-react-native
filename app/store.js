import { createStore, compose } from 'redux';
import { fromJS } from 'immutable';
import createReducer from './reducers';
import devTools from 'remote-redux-devtools';

function configureStore(initialState = fromJS({})) {
  const createStoreWithMiddleware = compose(devTools())(createStore);
  return createStoreWithMiddleware(createReducer(), initialState);
}

module.exports = configureStore;
