/*
 *
 * TodoList
 *
 */

import { View, ListView } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import TodoItem from '../TodoItem';

class TodoList extends Component {
  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={ styles.container }>
        <ListView dataSource={ds.cloneWithRows(this.props.items.toJS())} renderRow={this._renderRow} />
      </View>
    );
  }

  _renderRow (todo) {
    return (
      <TodoItem todo={todo} key={todo.id} />
    );
  }
}

TodoList.propTypes = {
  items: PropTypes.object.isRequired
};

export default TodoList;
