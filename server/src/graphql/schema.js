import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import Todo from '../models/todo';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      todos: Todo.RootQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: Object.assign({}, Todo.Mutations)
  })
});

export default schema;
