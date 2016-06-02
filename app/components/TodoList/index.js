/*
 *
 * FilteredTodoList
 *
 */

import { View, ListView } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectAllTodos, selectActiveTodos, selectCompletedTodos } from './reducer';

import NoTodos from '../NoTodos';
import TodoItem from '../TodoItem';

class TodoList extends Component {
  render() {
    return (
      <View style={ styles.container }>
        {this._renderList()}
      </View>
    );
  }

  _renderList() {
    if (this.props.todos.size !== 0) {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return (
        <ListView dataSource={ds.cloneWithRows(this.props.todos.toJS())} renderRow={this._renderRow} />
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
  todos: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function getSelector(state, props) {
  const filterToSelector = {
    'all': selectAllTodos,
    'completed': selectCompletedTodos,
    'active': selectActiveTodos
  };
  return createSelector(filterToSelector[props.filter], (todos) => ({ todos }))(state, props);
}

export default connect(getSelector, mapDispatchToProps)(TodoList);
