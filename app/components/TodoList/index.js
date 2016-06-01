/*
 *
 * TodoList
 *
 */

import { View, ListView } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import TodoItem from '../TodoItem';
import NoTodos from '../NoTodos';

class TodoList extends Component {
  render() {
    if (this.props.todos.size !== 0) {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return (
        <View style={ styles.container }>
          <ListView dataSource={ds.cloneWithRows(this.props.todos.toJS())} renderRow={this._renderRow} />
        </View>
      );
    } else {
      return (
        <NoTodos />
      );
    }
  }

  _renderRow (todo) {
    return (
      <TodoItem todo={todo} key={todo.id} />
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.object.isRequired
};

export default TodoList;
