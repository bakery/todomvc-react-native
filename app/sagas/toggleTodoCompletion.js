import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
  TOGGLE_TASK_COMPLETION_REQUEST,
  TOGGLE_TASK_COMPLETION_ERROR,
} from '../components/TodoList/constants';
import { toggleTodoCompletion as _toggleTodoCompletion } from '../api/todos';

function* runToggleTodoCompletion(action) {
  try {
    yield call(_toggleTodoCompletion, action.payload.id);
  } catch (error) {
    console.error(error);
    yield put({
      type: TOGGLE_TASK_COMPLETION_ERROR,
      payload: {
        error,
        id: action.payload.id
      }
    });
  }
}

export function* toggleTodoCompletion() {
  yield* takeEvery(TOGGLE_TASK_COMPLETION_REQUEST, runToggleTodoCompletion);
}
