/*
 *
 * MainNavigation
 *
 */

import React, { Component } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectMainNavigation } from '../../state/navigation/selectors';
// eslint-disable-next-line
import { TabBarIOS, View } from 'react-native';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { filterToComponent } from './helpers';

const { jumpTo } = navigationActions;


class MainNavigation extends Component {
  renderTabContent(tab) {
    const todoList = filterToComponent[tab.key];
    return (
      <View style={styles.container}>
        {todoList}
      </View>
    );
  }

  render() {
    const { mainNavigation, dispatch } = this.props;

    const children = mainNavigation.routes.map((tab, i) => (
      <TabBarIOS.Item
        key={tab.key}
        icon={tab.icon}
        selectedIcon={tab.selectedIcon}
        title={tab.title} onPress={
          () => dispatch(jumpTo(i, mainNavigation.key))
        }
        selected={this.props.mainNavigation.index === i}
      >
        {this.renderTabContent(tab)}
      </TabBarIOS.Item>
    ));
    return (
      <TabBarIOS>
        {children}
      </TabBarIOS>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

MainNavigation.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  mainNavigation: React.PropTypes.shape({
    index: React.PropTypes.number.isRequired,
    key: React.PropTypes.string.isRequired,
    routes: React.PropTypes.arrayOf(React.PropTypes.object),
  }),
};

export default connect(
  createSelector(selectMainNavigation, (mainNavigation) => ({ mainNavigation })),
  mapDispatchToProps
)(MainNavigation);
