/*
 *
 * FilteredTodoList  actions
 *
 */

import {
  TOGGLE_TASK_COMPLETION,
  ADD_TASK,
  DELETE_TASK,
  LOAD_TASKS_REQUEST,
} from './constants';

export function loadTasks () {
  return {
    type: LOAD_TASKS_REQUEST
  };
}

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
