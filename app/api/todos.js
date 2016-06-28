import Settings from '../settings';
import GraphQLClient from './base';

const settings = Settings.load();
const client = new GraphQLClient(settings.graphqlURL);

export function loadAllTodos() {
  return client.query(`
    {
      todos {
        id, text, isComplete
      }
    }
  `);
}

export function addTodo(text) {
  return client.mutate(`
    {
      addTodo(text:"${text}") {
        id, text, isComplete
      }
    }
  `);
}

export function toggleTodoCompletion(id) {
  return client.mutate(`
    {
      toggleTodoCompletion(id: "${id}") {
        id, text, isComplete
      }
    }
  `);
}

export function deleteTodo(id) {
  return client.mutate(`
    {
      deleteTodo(id: "${id}") {
        id
      }
    }
  `);
}
