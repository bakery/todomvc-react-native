/*
 *
 * FilteredTodoList
 *
 */

import { View } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectAllTodos, selectActiveTodos, selectCompletedTodos } from './reducer';

import TodoList from '../TodoList';

class FilteredTodoList extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <TodoList todos={ this.props.todos } />
      </View>
    );
  }
}

FilteredTodoList.propTypes = {
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

export default connect(getSelector, mapDispatchToProps)(FilteredTodoList);
