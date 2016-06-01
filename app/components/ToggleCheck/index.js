/*
 *
 * ToggleCheck
 *
 */

import { TouchableOpacity, Image, View } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';

class ToggleCheck extends Component {
  render() {
    const imageModule = this.props.todo.get('isComplete') ?
      require('./images/checked.png') :
      require('./images/unchecked.png');

    return  (
      <View style={[this.props.style, styles.container]}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={ () => this.props.onToggle(this.props.todo.get('id')) }
          style={ styles.button }>
          <Image source={imageModule} />
        </TouchableOpacity>
      </View>
    );
  }
}

ToggleCheck.propTypes = {
  todo: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default ToggleCheck;
