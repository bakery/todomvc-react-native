import Parse from 'parse/node';
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
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

Todo.RootQuery = {
  type: new GraphQLList(Todo.SchemaType),
  args: {
    isComplete: { type: GraphQLBoolean }
  },
  resolve: (_, args, { user, sessionToken, Query }) => {
    console.log('resolving query with', user);
    const isComplete = args.isComplete;
    const query = new Query(Todo);
    if (typeof isComplete !== 'undefined') {
      query.equalTo('isComplete', isComplete);
    }
    return query.find();
  }
};

Todo.Mutations = {
  addTodo: {
    type: Todo.SchemaType,
    description: 'Create a new todo item',
    args: {
      text: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, { text }, { user, sessionToken, Query }) => {
      const newTodo = new Query(Todo).create({ text, isComplete: false });
      return newTodo.save().then( td => td);
    }
  },
  deleteTodo: {
    type: Todo.SchemaType,
    description: 'Delete a todo',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, { id }, { user, sessionToken, Query }) => {
      return new Query(Todo).get(id).then((todo) => {
        if (todo) {
          return todo.destroy();
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
    resolve: (_, { id }, { user, sessionToken, Query }) => {
      return new Query(Todo).get(id).then((todo) => {
        console.log('@@ toggle', todo);
        if (todo) {
          return todo.save({ isComplete: !todo.get('isComplete') }).then(
            t => t, error => console.error('@@ error toggling', error)
          );
        }
      });
    }
  }
};

export default Todo;
