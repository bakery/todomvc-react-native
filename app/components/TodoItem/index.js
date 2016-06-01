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
import { toggleTaskCompletion } from '../FilteredTodoList/actions';

class TodoItem extends Component {
  render() {
    return (
      <View style={[styles.item, { opacity: this.props.todo.get('isComplete') ? 0.5 : 1 }]}>
        <ToggleCheck todo={this.props.todo}
          onToggle={this.props.toggleCompletion}
          style={ styles.checkButton } />
        <Text style={ styles.label }>{this.props.todo.get('text')}</Text>
      </View>
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
    }
  };
}

export default connect(() => ({}), mapDispatchToProps)(TodoItem);
