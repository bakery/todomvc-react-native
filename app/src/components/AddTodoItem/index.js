/*
 *
 * AddTodoItem
 *
 */

import { TextInput } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
import { withCreateMutation } from '../../state/todos/mutations';

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

export default withCreateMutation(AddTodoItem);
