import mainNavigation from './navigation/reducer';
import { combineReducers } from 'redux';
import apollo from './apollo';

const applicationReducers = {
  mainNavigation,
  apollo: apollo.reducer(),
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
