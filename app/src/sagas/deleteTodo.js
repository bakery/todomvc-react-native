import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { DELETE_TASK_REQUEST, DELETE_TASK_ERROR } from '../state/action-types';
import { deleteTodo as _deleteTodo } from '../api/todos';

function* runDeleteTodo(action) {
  try {
    yield call(_deleteTodo, action.payload.id);
  } catch (error) {
    yield put({
      type: DELETE_TASK_ERROR,
      payload: {
        error,
        id: action.payload.id
      }
    });
  }
}

export function* deleteTodo() {
  yield* takeEvery(DELETE_TASK_REQUEST, runDeleteTodo);
}
