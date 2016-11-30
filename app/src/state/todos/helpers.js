import _ from 'lodash';

export function sortTodos(todos) {
  return _.sortBy(todos, todo => -todo.createdAt);
}
