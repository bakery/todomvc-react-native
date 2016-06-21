/*
 *
 * FilteredTodoList  actions
 *
 */

import {
  TOGGLE_TASK_COMPLETION_REQUEST,
  ADD_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  LOAD_TASKS_REQUEST,
} from './constants';

export function loadTasks () {
  return {
    type: LOAD_TASKS_REQUEST
  };
}

export function toggleTaskCompletion (id) {
  return {
    type: TOGGLE_TASK_COMPLETION_REQUEST,
    payload: {
      id,
    }
  };
}

export function addTask (text) {
  return {
    type: ADD_TASK_REQUEST,
    payload: {
      text,
      id: new Date().getTime().toString(),
      isComplete: false
    }
  };
}

export function deleteTask (id) {
  return {
    type: DELETE_TASK_REQUEST,
    payload: {
      id
    }
  };
}
