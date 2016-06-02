/*
 *
 * AddTodoItem
 *
 */

import { TextInput } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import { addTask } from '../TodoList/actions';

class AddTodoItem extends Component {
  render() {
    return (
      <TextInput
        ref={ input => { this._textBox = input; } }
        autoCorrect={false}
        placeholder={ 'What needs to be done?' }
        style={ styles.textBox }
        onChangeText={(text) => this.setState({ text })}
        onSubmitEditing={this.saveTodoItem.bind(this)}
      />
    );
  }

  saveTodoItem () {
    this.props.addTask(this.state.text);
    this._textBox.clear();
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addTask (text) {
      dispatch(addTask(text));
    }
  };
}

export default connect(() => ({}), mapDispatchToProps)(AddTodoItem);
