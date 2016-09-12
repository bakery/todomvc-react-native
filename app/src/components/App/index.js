/*
 *
 * App
 *
 */

import { View, Platform } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import MainNavigation from '../MainNavigation';
import AddTodoItem from '../AddTodoItem';
import { loadTasks } from '../../state/todos/actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadTasks());
  }

  render() {
    return (
      <View style={styles.container}>
        { Platform.OS === 'ios' ? <AddTodoItem /> : null }
        <MainNavigation />
      </View>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(App);
