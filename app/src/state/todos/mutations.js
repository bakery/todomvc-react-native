import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';

const toggleCompletionMutation = gql`
  mutation toggleTodoCompletion($id: ID!) {
    toggleTodoCompletion(id: $id) {
      id, isComplete, text
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
      id, isComplete, text
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
