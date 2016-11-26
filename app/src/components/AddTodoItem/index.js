/*
 *
 * AddTodoItem
 *
 */

import { TextInput } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';

class AddTodoItem extends Component {
  constructor() {
    super();

    this.saveTodoItem = this.saveTodoItem.bind(this);
  }

  saveTodoItem() {
    this.props.addTodo({ text: this.state.text });
    this.textBox.clear();
  }

  render() {
    return (
      <TextInput
        ref={input => { this.textBox = input; }}
        autoCorrect={false}
        placeholder={'What needs to be done?'}
        style={styles.textBox}
        onChangeText={(text) => this.setState({ text })}
        onSubmitEditing={this.saveTodoItem}
      />
    );
  }
}

AddTodoItem.propTypes = {
  addTodo: React.PropTypes.func.isRequired,
};

const mutation = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      id, isComplete, text
    }
  }
`;

const withMutation = graphql(mutation, {
  props: ({ mutate }) => ({
    addTodo: ({ text }) => mutate({
      variables: { text },
      updateQueries: {
        todos: (prev, { mutationResult }) => {
          const newTodo = mutationResult.data.addTodo;
          return update(prev, {
            todos: {
              $unshift: [newTodo],
            },
          });
        },
      },
    }),
  }),
});

export default withMutation(AddTodoItem);
