import gql from 'graphql-tag';

export const TodoFields = gql`
  fragment TodoFields on Todo {
    createdAt
    id
    isComplete
    text
  }
`;
