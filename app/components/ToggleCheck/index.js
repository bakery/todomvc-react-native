/*
 *
 * ToggleCheck
 *
 */

import { TouchableOpacity, Image } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';


class ToggleCheck extends Component {
  render() {
    const icon = this.props.isComplete ?
      require('./images/checked.png') :
      require('./images/unchecked.png');
    return (
      <TouchableOpacity style={ styles.button }>
        <Image source={ icon } />
      </TouchableOpacity>
    );
  }
}

ToggleCheck.propTypes = {
  isComplete: PropTypes.bool.isRequired
};

export default ToggleCheck;
