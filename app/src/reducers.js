import todos from './components/TodoList/reducer';
import mainNavigation from './components/MainNavigation/reducer';
import { combineReducers } from 'redux-immutable';
// XX: Do not rename this variable if you want reducer generator
// to keep working properly (and you do want that, right?)
const applicationReducers = {
  mainNavigation: mainNavigation,
  todos: todos
};
export default function createReducer() {
  return combineReducers(applicationReducers);
}
