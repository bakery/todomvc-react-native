/*
 *
 * TodoItem
 *
 */

import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { toggleTaskCompletion, deleteTask } from '../FilteredTodoList/actions';
import Swipeout from 'react-native-swipeout';

class TodoItem extends Component {
  render() {
    const swipeoutBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => {
        this.props.deleteTask(this.props.todo.id);
      }
    }];
    return (
      <Swipeout right={swipeoutBtns} backgroundColor={'transparent'}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={ () => this.props.toggleCompletion(this.props.todo.id) }
          style={ styles.checkbox }>
          <View style={[styles.item, { opacity: this.props.todo.isComplete ? 0.5 : 1 }]}>
            {this._renderCheckbox()}
            <Text style={ styles.label }>{this.props.todo.text}</Text>
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
      <Image style={[styles.checkButton, styles.container]} source={imageModule} />
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleCompletion (id) {
      dispatch(toggleTaskCompletion(id));
    },
    deleteTask (id) {
      dispatch(deleteTask(id));
    }
  };
}

export default connect(() => ({}), mapDispatchToProps)(TodoItem);
