import todos from './todos/reducer';
import mainNavigation from './navigation/reducer';
import { combineReducers } from 'redux-immutable';
// XX: Do not rename this variable if you want reducer generator
// to keep working properly (and you do want that, right?)
const applicationReducers = {
  mainNavigation: mainNavigation,
  todos: todos,
};
export default function createReducer() {
  return combineReducers(applicationReducers);
}
