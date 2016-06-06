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
    const viewCompletedStyling = this.props.todo.isComplete ? { opacity: 0.5 } : {};
    const labelCompletedStyling = this.props.todo.isComplete ? { textDecorationLine: 'line-through' } : {};

    return (
      <Swipeout right={swipeoutBtns} backgroundColor={'transparent'}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={ () => this.props.onToggleCompletion(this.props.todo.id) }>
          <View style={[styles.item, viewCompletedStyling]}>
            {this._renderCheckbox()}
            <View style={styles.labelWrapper}>
              <Text style={[styles.label, labelCompletedStyling]}>{this.props.todo.text}</Text>
            </View>
          </View>
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
