import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';

const toggleCompletionMutation = gql`
  mutation toggleTodoCompletion($id: ID!) {
    toggleTodoCompletion(id: $id) {
      id, isComplete, text, createdAt
    }
  }
`;

export const withToggleMutation = graphql(toggleCompletionMutation, {
  props: ({ mutate }) => ({
    toggleTodoCompletion: ({ id }) => mutate({
      variables: { id },
      updateQueries: {
        todos: (prev, { mutationResult }) => {
          const updatedTodo = mutationResult.data.toggleTodoCompletion;
          return update(prev, {
            todos: {
              $set: [
                ...prev.todos.filter(t => t.id !== updatedTodo.id),
                updatedTodo,
              ],
            },
          });
        },
      },
    }),
  }),
});

const deleteMutation = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id, isComplete, text, createdAt
    }
  }
`;

export const withDeleteMutation = graphql(deleteMutation, {
  props: ({ mutate }) => ({
    deleteTodo: ({ id }) => mutate({
      variables: { id },
      updateQueries: {
        todos: (prev, { mutationResult }) => {
          const deletedTodo = mutationResult.data.deleteTodo;
          return update(prev, {
            todos: {
              $set: prev.todos.filter(t => t.id !== deletedTodo.id),
            },
          });
        },
      },
    }),
  }),
});

const createMutation = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      id, isComplete, text, createdAt
    }
  }
`;

export const withCreateMutation = graphql(createMutation, {
  props: ({ mutate }) => ({
    addTodo: ({ text }) => mutate({
      variables: { text },
      updateQueries: {
        todos: (prev, { mutationResult }) => {
          const newTodo = mutationResult.data.addTodo;
          return update(prev, {
            todos: {
              $unshift: [newTodo],
            },
          });
        },
      },
    }),
  }),
});
