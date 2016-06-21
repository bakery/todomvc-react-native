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
  console.log('@@ authenticate', options);
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
      console.log('adding todo as', user);
      const newTodo = new Todo({ text, isComplete: false });
      newTodo.setACL(new Parse.ACL(user));
      return newTodo.save().then( td => {
        console.log('@@@ added todo', td);
        return td;
      });
    }
  },
  deleteTodo: {
    type: Todo.SchemaType,
    description: 'Delete a todo',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, { id }, { user, sessionToken }) => {
      console.log('deleting todo as', user);
      return new Parse.Query(Todo).get(id, authenticate(sessionToken)).then((todo) => {
        if (todo) {
          return todo.destroy(authenticate(sessionToken)); //.then(t => result.resolve(t));
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
      console.log(`toggling todo ${id} as`, user);
      return new Parse.Query(Todo).get(id, authenticate(sessionToken)).then((todo) => {
        console.log('@@ toggle', todo);
        if (todo) {
          return todo.save({
            isComplete: !todo.get('isComplete')
          }, authenticate(sessionToken)).then(
            t => t, error => console.error('@@ error toggling', error)
          );
        }
      }, error => console.error('@@ error fetching todo', error));
    }
  }
};

export default Todo;
