/*
 *
 * TodoItem
 *
 */

import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import Swipeout from 'react-native-swipeout';


class TodoItem extends Component {
  render() {
    const swipeoutBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => {
        this.props.onDelete(this.props.todo.id);
      }
    }];
    const { todo } = this.props;
    const viewDisabledStyling = todo.isComplete || todo.isDisabled ? { opacity: 0.5 } : {};
    const labelCompletedStyling = todo.isComplete ? { textDecorationLine: 'line-through' } : {};
    const item = (
      <View style={[styles.item, viewDisabledStyling]}>
        {this._renderCheckbox()}
        <View style={styles.labelWrapper}>
          <Text style={[styles.label, labelCompletedStyling]}>{todo.text}</Text>
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
          onPress={ () => this.props.onToggleCompletion(todo.id) }>
          {item}
        </TouchableOpacity>
      </Swipeout>
    );
  }

  _renderCheckbox() {
    const imageModule = this.props.todo.isComplete ?
      require('./images/checked.png') :
      require('./images/unchecked.png');

    return  (
      <Image style={[styles.checkbox]} source={imageModule} />
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoItem;
