import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
  TOGGLE_TASK_COMPLETION_REQUEST,
  TOGGLE_TASK_COMPLETION_SUCCESS,
  TOGGLE_TASK_COMPLETION_ERROR,
} from '../state/action-types';
import { toggleTodoCompletion as _toggleTodoCompletion } from '../api/todos';

function* runToggleTodoCompletion(action) {
  try {
    yield call(_toggleTodoCompletion, action.payload.id);
    yield put({
      type: TOGGLE_TASK_COMPLETION_SUCCESS,
      payload: {
        id: action.payload.id,
      },
    });
  } catch (error) {
    yield put({
      type: TOGGLE_TASK_COMPLETION_ERROR,
      payload: {
        error,
        id: action.payload.id,
      },
    });
  }
}

export function* toggleTodoCompletion() {
  yield* takeEvery(TOGGLE_TASK_COMPLETION_REQUEST, runToggleTodoCompletion);
}
