import Parse from 'parse/node';
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

let Todo = Parse.Object.extend('Todo');

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'Item in todo list',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    text: {
      type: GraphQLString,
      resolve: todo => todo.get('text')
    },
    isComplete: {
      type: GraphQLBoolean,
      resolve: todo => todo.get('isComplete')
    }
  })
});

Todo.SchemaType = TodoType;
Todo.Mutations = {
  addTodo: {
    type: Todo.SchemaType,
    description: 'Create a new todo item',
    args: {
      text: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, { text }, user) => {
      console.log('adding todo as', user);
      return new Todo({
        text,
        isComplete: false
      }).save();
    }
  },
  deleteTodo: {
    type: Todo.SchemaType,
    description: 'Delete a todo',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, { id }, user) => {
      console.log('deleting todo as', user);
      const result = new Parse.Promise();
      new Parse.Query(Todo).get(id).then((todo) => {
        if (todo) {
          todo.destroy().then(t => result.resolve(t));
        }
      });
      return result;
    }
  },
  toggleTodoCompletion: {
    type: Todo.SchemaType,
    description: 'Toggle isComplete on a todo',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, { id }, user) => {
      console.log('toggling todo as', user);
      const result = new Parse.Promise();
      new Parse.Query(Todo).get(id).then((todo) => {
        if (todo) {
          todo.save({
            isComplete: !todo.get('isComplete')
          }).then(t => result.resolve(t));
        }
      });
      return result;
    }
  }
};

export default Todo;
