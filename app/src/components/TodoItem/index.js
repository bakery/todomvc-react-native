/*
 *
 * TodoItem
 *
 */

import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import Swipeout from 'react-native-swipeout';

// eslint-disable-next-line
const checkedIcon = require('./images/checked.png');
// eslint-disable-next-line
const uncheckedIcon = require('./images/unchecked.png');
// eslint-disable-next-line
const errorIcon = require('./images/error.png');


class TodoItem extends Component {
  renderCheckbox() {
    const imageModule = this.props.todo.isComplete ? checkedIcon : uncheckedIcon;

    return (
      <Image style={[styles.checkbox]} source={imageModule} />
    );
  }

  render() {
    const swipeoutBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => {
        const { todo } = this.props;
        this.props.onDelete({ todo });
      },
    }];
    const { todo } = this.props;
    const viewDisabledStyling = todo.isComplete || todo.isDisabled ? { opacity: 0.5 } : {};
    const labelCompletedStyling = todo.isComplete ? { textDecorationLine: 'line-through' } : {};
    const error = todo.error ? (
      <View style={styles.errorWrapper}>
        <Image style={styles.errorIcon} source={errorIcon} />
        <Text style={styles.errorLabel}>{todo.error}</Text>
      </View>
    ) : null;
    const item = (
      <View style={[styles.item, viewDisabledStyling]}>
        {this.renderCheckbox()}
        <View style={styles.labelWrapper}>
          <Text style={[styles.label, labelCompletedStyling]}>{todo.text}</Text>
          {error}
        </View>
      </View>
    );


    if (todo.isDisabled) {
      return item;
    }

    return (
      <Swipeout right={swipeoutBtns} backgroundColor={'transparent'}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={() => this.props.onToggleCompletion({ todo })}
        >
          {item}
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
