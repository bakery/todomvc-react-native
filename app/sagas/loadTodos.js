import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { LOAD_TASKS_REQUEST } from '../components/TodoList/constants';
import { loadAllTodos } from '../api/todos';

function* runLoadTodos(action) {
  console.log('@@@ loading todos');
  // XX: some random delay
  // yield delay(Math.floor(Math.random() * 5000));
  // yield put({
  //   type: LOAD_PRODUCTS_SUCCESS,
  //   payload: {}
  // });
  console.log('@@ calling', loadAllTodos);
  const todos = yield call(loadAllTodos);
  console.log('@@ got todos', todos);
}

export function* loadTodos() {
  console.log('@@@ running todos saga');
  yield* takeEvery(LOAD_TASKS_REQUEST, runLoadTodos);
}
