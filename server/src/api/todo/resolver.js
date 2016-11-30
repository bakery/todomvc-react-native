import Parse from 'parse/node';
import Todo from './model';

export default {
  Todo: {
    text: (root) => root.get('text'),
    isComplete: (root) => root.get('isComplete'),
    createdAt: (root) => root.get('createdAt').getTime(),
  },
  Query: {
    todos(root, { isComplete }, { Query, user }) {
      const query = new Query(Todo);

      if (typeof isComplete !== 'undefined') {
        query.equalTo('isComplete', isComplete);
      }

      if (user) {
        query.equalTo('user', user);
      }

      return query.find();
    },
  },
  Mutation: {
    addTodo(_, { text }, { Query, user }) {
      const newTodo = new Query(Todo).create({ isComplete: false, text, user });
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
