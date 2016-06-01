/*
 *
 * FilteredTodoList  actions
 *
 */

import {
  TOGGLE_TASK_COMPLETION,
} from './constants';

export function toggleTaskCompletion (id) {
  return {
    type: TOGGLE_TASK_COMPLETION,
    payload: {
      id,
    }
  };
}
