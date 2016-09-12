/*
 *
 * NoTodos
 *
 */

import { View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';


class NoTodos extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nothing to see here. Move along</Text>
      </View>
    );
  }
}


export default NoTodos;
