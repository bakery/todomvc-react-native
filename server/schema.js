import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import Todo from './models/todo';
import Parse from 'parse/node';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      todos: {
        type: new GraphQLList(Todo.SchemaType),
        args: {
          isComplete: { type: GraphQLBoolean }
        },
        resolve: (_, args) => {
          const isComplete = typeof args.isComplete !== 'undefined' ? args.isComplete : false;
          return new Parse.Query(Todo).equalTo('isComplete', isComplete).find();
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: Object.assign({}, Todo.Mutations)
  })
});

export default schema;
