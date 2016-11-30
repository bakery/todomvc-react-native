/*
 *
 * FilteredTodoList
 *
 */

import { View, Text, ListView } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import NoTodos from '../NoTodos';
import TodoItem from '../TodoItem';
import { withAllTodos, withCompletedTodos, withActiveTodos } from '../../state/todos/queries';
import { withDeleteMutation, withToggleMutation } from '../../state/todos/mutations';

class TodoList extends Component {
  constructor() {
    super();

    this.renderRow = this.renderRow.bind(this);
  }

  renderList() {
    const { todos } = this.props;
    if (todos && todos.length !== 0) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });

      return (
        <ListView
          dataSource={ds.cloneWithRows(todos)}
          renderRow={this.renderRow}
        />
      );
    }

    return (
      <NoTodos />
    );
  }

  renderRow(todo) {
    return (
      <TodoItem
        todo={todo}
        key={todo.id}
        onDelete={this.props.deleteTodo}
        onToggleCompletion={this.props.toggleTodoCompletion}
      />
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        {loading ? <Text>Loading...</Text> : this.renderList()}
      </View>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodoCompletion: PropTypes.func.isRequired,
};

export const AllTodos = withDeleteMutation(withToggleMutation(withAllTodos(TodoList)));
export const CompletedTodos = withDeleteMutation(withToggleMutation(withCompletedTodos(TodoList)));
export const ActiveTodos = withDeleteMutation(withToggleMutation(withActiveTodos(TodoList)));
