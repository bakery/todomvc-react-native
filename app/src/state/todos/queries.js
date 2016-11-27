import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const withTodoData = graphql(gql`
  query todos($isComplete: Boolean) { 
    todos(isComplete: $isComplete) { id, text, isComplete }
  }
  `, {
    options: ({ filter }) => {
      const isComplete = filter === 'all' ? undefined : filter === 'completed';
      return { variables: { isComplete } };
    },
    props: ({ data: { loading, todos } }) => ({ loading, todos }),
  }
);
