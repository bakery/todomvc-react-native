/*
 *
 * App
 *
 */

import { View, Platform } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
// eslint-disable-next-line import/no-unresolved
import MainNavigation from '../MainNavigation';
import AddTodoItem from '../AddTodoItem';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? <AddTodoItem /> : null}
        <MainNavigation />
      </View>
    );
  }
}

export default App;
