import { Lokka } from 'lokka';
// import { Transport } from 'lokka-transport-http';
import { Transport as ParseGraphQLTransport } from './parse-transport';

const client = new Lokka({ transport: new ParseGraphQLTransport('http://localhost:8000/graphql') });

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
