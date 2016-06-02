/*
 *
 * FilteredTodoList  actions
 *
 */

import {
  TOGGLE_TASK_COMPLETION,
  ADD_TASK,
  DELETE_TASK,
} from './constants';

export function toggleTaskCompletion (id) {
  return {
    type: TOGGLE_TASK_COMPLETION,
    payload: {
      id,
    }
  };
}

export function addTask (text) {
  return {
    type: ADD_TASK,
    payload: {
      text,
    }
  };
}

export function deleteTask (id) {
  return {
    type: DELETE_TASK,
    payload: {
      id
    }
  };
}
