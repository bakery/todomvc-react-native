import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { LOAD_TASKS_REQUEST, LOAD_TASKS_ERROR, LOAD_TASKS_SUCCESS } from '../state/action-types';
import { loadAllTodos } from '../api/todos';
import { getCurrentUser } from '../api/auth';

function* runLoadTodos(action) {
  try {
    yield call(getCurrentUser);
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
