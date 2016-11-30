export default `
type Todo {
  id: ID! 
  text: String!
  isComplete: Boolean!,
  createdAt: Float!
}

# the schema allows the following query:
type Query {
  todos(
    isComplete: Boolean
  ): [Todo]
}

# this schema allows the following mutation:
type Mutation {
  addTodo (
    text: String!
  ): Todo

  deleteTodo (
    id: ID!
  ): Todo

  toggleTodoCompletion (
    id: ID!
  ): Todo
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;
