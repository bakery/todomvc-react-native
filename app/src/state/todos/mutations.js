import { graphql } from 'react-apollo';
import { getFragmentDefinitions } from 'apollo-client';
import gql from 'graphql-tag';
import update from 'react-addons-update';
import { TodoFields } from './fragments';

const toggleCompletionMutation = gql`
  mutation toggleTodoCompletion($id: ID!) {
    toggleTodoCompletion(id: $id) {
      ...TodoFields
    }
  }
`;

export const withToggleMutation = graphql(toggleCompletionMutation, {
  options: () => ({
    fragments: getFragmentDefinitions(TodoFields),
  }),
  props: ({ mutate }) => ({
    toggleTodoCompletion: ({ todo }) => mutate({
      variables: { id: todo.id },
      optimisticResponse: {
        __typename: 'Mutation',
        toggleTodoCompletion: Object.assign({
          __typename: 'Todo',
        }, todo, {
          isComplete: !todo.isComplete,
        }),
      },
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
      ...TodoFields
    }
  }
`;

export const withDeleteMutation = graphql(deleteMutation, {
  options: () => ({
    fragments: getFragmentDefinitions(TodoFields),
  }),
  props: ({ mutate }) => ({
    deleteTodo: ({ todo }) => mutate({
      variables: { id: todo.id },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteTodo: Object.assign({
          __typename: 'Todo',
        }, todo),
      },
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
      ...TodoFields
    }
  }
`;

export const withCreateMutation = graphql(createMutation, {
  options: () => ({
    fragments: getFragmentDefinitions(TodoFields),
  }),
  props: ({ mutate }) => ({
    addTodo: ({ text }) => mutate({
      variables: { text },
      optimisticResponse: {
        __typename: 'Mutation',
        addTodo: {
          __typename: 'Todo',
          createdAt: new Date().getTime(),
          id: Math.floor(Math.random() * 1000).toString(),
          text,
          isComplete: false,
        },
      },
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
