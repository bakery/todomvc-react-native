import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { TOGGLE_TASK_COMPLETION } from '../components/TodoList/constants';
import { toggleTodoCompletion as _toggleTodoCompletion } from '../api/todos';

function* runToggleTodoCompletion(action) {
  console.log('@@ toggling todo');
  try {
    const response = yield call(_toggleTodoCompletion, action.payload.id);
    console.log('@@ toggled todo', response);
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

export function* toggleTodoCompletion() {
  console.log('@@@ running todos saga');
  yield* takeEvery(TOGGLE_TASK_COMPLETION, runToggleTodoCompletion);
}
