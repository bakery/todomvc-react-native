/*
 *
 * TodoItem
 *
 */

import { View, Text } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import ToggleCheck from '../ToggleCheck';
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
        <View style={[styles.item, { opacity: this.props.todo.isComplete ? 0.5 : 1 }]}>
          <ToggleCheck todo={this.props.todo}
            onToggle={this.props.toggleCompletion}
            style={ styles.checkButton } />
          <Text style={ styles.label }>{this.props.todo.text}</Text>
        </View>
      </Swipeout>
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
