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
import { selectTodos } from './reducer';

import TodoList from '../TodoList';

class FilteredTodoList extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <TodoList items={ this.props.todos } />
      </View>
    );
  }
}

FilteredTodoList.propTypes = {
  todos: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  createSelector(selectTodos, (todos) => ({ todos })),
  mapDispatchToProps
)(FilteredTodoList);
