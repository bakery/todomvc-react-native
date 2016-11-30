import { makeExecutableSchema } from 'graphql-tools';
import TodoSchema from '../api/todo/schema';
import TodoResolvers from '../api/todo/resolver';

const schema = makeExecutableSchema({
  typeDefs: [TodoSchema],
  resolvers: TodoResolvers,
});

export default schema;
