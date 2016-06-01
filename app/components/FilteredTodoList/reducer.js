/*
 *
 * FilteredTodoList reducer
 *
 */

import { fromJS } from 'immutable';
import { TOGGLE_TASK_COMPLETION } from './constants';

const initialState = fromJS([
  { text:'t1', id: '1', isComplete: false },
  { text:'t2', id: '2', isComplete: false  },
  { text:'t3', id:'3', isComplete: true  },
  { text:'t4', id:'4', isComplete: false  }
]);

function todos(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TASK_COMPLETION:
      const itemIndex = state.findIndex( i => i.get('id') === action.payload.id);
      if (itemIndex !== -1) {
        return state.update(itemIndex, (i) => i.updateIn(['isComplete'], ic => !ic));
      }
      return state;
    default:
      return state;
  }
}

export default todos;

export function selectTodos(state) {
  return state.get('todos');
}
