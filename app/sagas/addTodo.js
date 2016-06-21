import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR
} from '../components/TodoList/constants';
import { addTodo as _addTodo } from '../api/todos';

function* runAddTodo(action) {
  console.log('@@ adding todo');
  try {
    const response = yield call(_addTodo, action.payload.text);
    console.log('@@ added todo', response);
    yield put({
      type: ADD_TASK_SUCCESS,
      payload: {
        todo: response.addTodo,
        clientId: action.payload.id
      }
    });
  } catch (error) {
    console.error(error);
    // yield put({
    //   type: LOAD_TASKS_ERROR,
    //   payload: {
    //     error,
    //   }
    // });
  }
}

export function* addTodo() {
  console.log('@@@ running todos saga');
  yield* takeEvery(ADD_TASK_REQUEST, runAddTodo);
}
