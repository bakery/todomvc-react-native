import Parse from 'parse/node';
import Todo from './model';

export default {
  Todo: {
    text: (root) => root.get('text'),
    isComplete: (root) => root.get('isComplete'),
  },
  Query: {
    todos(root, { isComplete }, { Query }) {
      console.error('@@ running todos resolver', arguments);
      const query = new Query(Todo);

      if (typeof isComplete !== 'undefined') {
        query.equalTo('isComplete', isComplete);
      }

      return query.find();
    },
  },
  Mutation: {
    addTodo(_, { text }, { Query, user }) {
      const newTodo = new Query(Todo).create({ text, isComplete: false });
      if (user) {
        newTodo.setACL(new Parse.ACL(user));
      }
      return newTodo.save().then(td => td);
    },

    deleteTodo(_, { id }, { Query }) {
      return new Query(Todo).get(id).then((todo) => {
        if (todo) {
          todo.destroy();
        }
        return todo;
      });
    },

    toggleTodoCompletion(_, { id }, { Query }) {
      return new Query(Todo).get(id).then((todo) => {
        return todo.save({ isComplete: !todo.get('isComplete') }).then(td => td);
      });
    },
  },
};
