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
import {
  selectAllTodos,
  selectActiveTodos,
  selectCompletedTodos,
} from '../../state/todos/selectors';
import { toggleTaskCompletion, deleteTask } from '../../state/todos/actions';
import NoTodos from '../NoTodos';
import TodoItem from '../TodoItem';

class TodoList extends Component {
  constructor() {
    super();

    this.renderRow = this.renderRow.bind(this);
  }

  renderList() {
    if (this.props.todos.size !== 0) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });

      return (
        <ListView
          dataSource={ds.cloneWithRows(this.props.todos.toJS())}
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
        onDelete={this.props.deleteTask}
        onToggleCompletion={this.props.toggleCompletion}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
      </View>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleCompletion: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleCompletion(id) {
      dispatch(toggleTaskCompletion(id));
    },
    deleteTask(id) {
      dispatch(deleteTask(id));
    },
  };
}

function getSelector(state, props) {
  const filterToSelector = {
    all: selectAllTodos,
    completed: selectCompletedTodos,
    active: selectActiveTodos,
  };
  return createSelector(filterToSelector[props.filter], (todos) => ({ todos }))(state, props);
}

export default connect(getSelector, mapDispatchToProps)(TodoList);
