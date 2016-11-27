import { graphql } from 'react-apollo';
import { getFragmentDefinitions } from 'apollo-client';
import gql from 'graphql-tag';
import { sortTodos } from './helpers';
import { TodoFields } from './fragments';

export const withTodoData = graphql(gql`
  query todos($isComplete: Boolean) { 
    todos(isComplete: $isComplete) { ...TodoFields }
  }
  `, {
    options: ({ filter }) => {
      const isComplete = filter === 'all' ? undefined : filter === 'completed';
      return {
        variables: { isComplete },
        fragments: getFragmentDefinitions(TodoFields),
      };
    },
    props: ({ data: { loading, todos } }) => ({ loading, todos: sortTodos(todos) }),
  }
);
