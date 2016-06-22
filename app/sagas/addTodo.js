import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR
} from '../components/TodoList/constants';
import { addTodo as _addTodo } from '../api/todos';

function* runAddTodo(action) {
  try {
    const response = yield call(_addTodo, action.payload.text);
    yield put({
      type: ADD_TASK_SUCCESS,
      payload: {
        todo: response.addTodo,
        clientId: action.payload.id
      }
    });
  } catch (error) {
    yield put({
      type: ADD_TASK_ERROR,
      payload: {
        error,
        clientId: action.payload.id
      }
    });
  }
}

export function* addTodo() {
  yield* takeEvery(ADD_TASK_REQUEST, runAddTodo);
}
