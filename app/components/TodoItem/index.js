/*
 *
 * TodoItem
 *
 */

import { View, Text } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import ToggleCheck from '../ToggleCheck';

class TodoItem extends Component {
  render() {
    return (
      <View style={ styles.item }>
        <ToggleCheck isComplete={true} style={ styles.checkButton } />
        <Text style={ styles.label }>{this.props.text}</Text>
      </View>
    );
  }
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired
};

export default TodoItem;
