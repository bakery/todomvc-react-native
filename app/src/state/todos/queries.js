import { graphql } from 'react-apollo';
import { getFragmentDefinitions } from 'apollo-client';
import gql from 'graphql-tag';
import { sortTodos } from './helpers';
import { TodoFields } from './fragments';


const allTodosQuery = gql`
  query allTodos { 
    todos { ...TodoFields }
  }
`;

const completedTodosQuery = gql`
  query completedTodos { 
    todos(isComplete: true) { ...TodoFields }
  }
`;

const activeTodosQuery = gql`
  query activeTodos { 
    todos(isComplete: false) { ...TodoFields }
  }
`;

const basicQueryConfig = {
  options: {
    fragments: getFragmentDefinitions(TodoFields),
  },
  props: ({ data: { loading, todos } }) => ({
    loading,
    todos: sortTodos(todos),
  }),
};

export const withAllTodos = graphql(allTodosQuery, basicQueryConfig);
export const withCompletedTodos = graphql(completedTodosQuery, basicQueryConfig);
export const withActiveTodos = graphql(activeTodosQuery, basicQueryConfig);
