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
        {
          this.props.items.map(
            todo => <TodoItem todo={todo} key={todo.get('id')} />
          )
        }
      </View>
    );
  }
}

TodoList.propTypes = {
  items: PropTypes.object.isRequired
};

export default TodoList;
