import todos from './todos/reducer';
import mainNavigation from './navigation/reducer';
import { combineReducers } from 'redux-immutable';

const applicationReducers = {
  mainNavigation,
  todos,
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
