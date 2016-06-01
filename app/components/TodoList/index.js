/*
 *
 * TodoList
 *
 */

import { View } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import TodoItem from '../TodoItem';

class TodoList extends Component {
  render() {
    return (
      <View style={ styles.container }>
        { this.props.items.map(todo => <TodoItem key={todo.id} text={todo.text} />) }
      </View>
    );
  }
}

TodoList.propTypes = {
  items: PropTypes.array.isRequired
};

export default TodoList;
