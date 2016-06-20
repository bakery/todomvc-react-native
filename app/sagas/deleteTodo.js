import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { DELETE_TASK } from '../components/TodoList/constants';
import { deleteTodo as _deleteTodo } from '../api/todos';

function* runDeleteTodo(action) {
  console.log('@@ deleting todo');
  try {
    const response = yield call(_deleteTodo, action.payload.id);
    console.log('@@ deleted todo', response);
    // yield put({
    //   type: LOAD_TASKS_SUCCESS,
    //   payload: {
    //     todos: response.todos,
    //   }
    // });
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

export function* deleteTodo() {
  yield* takeEvery(DELETE_TASK, runDeleteTodo);
}
