import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { LOAD_TASKS_REQUEST, LOAD_TASKS_ERROR, LOAD_TASKS_SUCCESS } from '../components/TodoList/constants';
import { loadAllTodos } from '../api/todos';

function* runLoadTodos(action) {
  try {
    const response = yield call(loadAllTodos);
    yield put({
      type: LOAD_TASKS_SUCCESS,
      payload: {
        todos: response.todos,
      }
    });
  } catch (error) {
    yield put({
      type: LOAD_TASKS_ERROR,
      payload: {
        error,
      }
    });
  }
}

export function* loadTodos() {
  yield* takeEvery(LOAD_TASKS_REQUEST, runLoadTodos);
}
