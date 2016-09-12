export function selectAllTodos(state) {
  return state.get('todos').get('items');
}

export function selectCompletedTodos(state) {
  return state.get('todos').get('items').filter(todo => todo.get('isComplete'));
}

export function selectActiveTodos(state) {
  return state.get('todos').get('items').filter(todo => !todo.get('isComplete'));
}
