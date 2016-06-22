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
        resolve: (_, args, { user, sessionToken }) => {
          console.log('resolving query with', user);
          const isComplete = args.isComplete;
          const query = new Parse.Query(Todo);
          if (typeof isComplete !== 'undefined') {
            query.equalTo('isComplete', isComplete);
          }
          return query.find();
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
