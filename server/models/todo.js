import Parse from 'parse/node';
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

let Todo = Parse.Object.extend('Todo');

const authenticate = (sessionToken) => {
  const options = sessionToken ? { sessionToken} : {};
  return options;
};

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
    resolve: (_, { text }, { user, sessionToken }) => {
      const newTodo = new Todo({ text, isComplete: false });
      newTodo.setACL(new Parse.ACL(user));
      return newTodo.save().then( td => td);
    }
  },
  deleteTodo: {
    type: Todo.SchemaType,
    description: 'Delete a todo',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, { id }, { user, sessionToken }) => {
      return new Parse.Query(Todo).get(id, authenticate(sessionToken)).then((todo) => {
        if (todo) {
          return todo.destroy(authenticate(sessionToken));
        }

        return todo;
      });
    }
  },
  toggleTodoCompletion: {
    type: Todo.SchemaType,
    description: 'Toggle isComplete on a todo',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, { id }, { user, sessionToken }) => {
      return new Parse.Query(Todo).get(id, authenticate(sessionToken)).then((todo) => {
        console.log('@@ toggle', todo);
        if (todo) {
          return todo.save({
            isComplete: !todo.get('isComplete')
          }, authenticate(sessionToken)).then(
            t => t, error => console.error('@@ error toggling', error)
          );
        }
      });
    }
  }
};

export default Todo;
