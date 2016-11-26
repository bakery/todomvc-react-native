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
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
  filter: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodoCompletion: PropTypes.func.isRequired,
};


const withData = graphql(gql`
  query todos($isComplete: Boolean) { 
    todos(isComplete: $isComplete) { id, text, isComplete }
  }
  `, {
    options: ({ filter }) => {
      const isComplete = filter === 'all' ? undefined : filter === 'completed';
      return { variables: { isComplete } };
    },
    props: ({ data: { loading, todos } }) => {
      return {
        loading,
        todos,
      };
    },
  }
);

const toggleCompletionMutation = gql`
  mutation toggleTodoCompletion($id: ID!) {
    toggleTodoCompletion(id: $id) {
      id, isComplete, text
    }
  }
`;

const withToggleMutation = graphql(toggleCompletionMutation, {
  props: ({ mutate }) => ({
    toggleTodoCompletion: ({ id }) => mutate({ variables: { id } }),
  }),
});

const deleteMutation = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id, isComplete, text
    }
  }
`;

const withDeleteMutation = graphql(deleteMutation, {
  props: ({ mutate }) => ({
    deleteTodo: ({ id }) => mutate({ variables: { id } }),
  }),
});

export default withDeleteMutation(withToggleMutation(withData(TodoList)));
