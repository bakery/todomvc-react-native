/*
 *
 * MainNavigation
 *
 */

import { View } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectMainNavigation } from './reducer';
import { TabBarIOS } from 'react-native';
import TodoList from '../TodoList';

// const { Reducer: NavigationReducer } = NavigationExperimental;
// const { JumpToAction } = NavigationReducer.TabsReducer;

import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

const { jumpTo } = navigationActions;


class MainNavigation extends Component {
  render() {
    const { mainNavigation, dispatch } = this.props;

    const children = mainNavigation.routes.map( (tab, i) => {
      return (
        <TabBarIOS.Item key={tab.key}
            icon={tab.icon}
            selectedIcon={tab.selectedIcon}
            title={tab.title} onPress={
              () => dispatch(jumpTo(i, mainNavigation.key))
            }
            selected={this.props.mainNavigation.index === i}>
            { this._renderTabContent(tab) }
        </TabBarIOS.Item>
      );
    });
    return (
      <TabBarIOS>
        {children}
      </TabBarIOS>
    );
  }

  _renderTabContent(tab) {
    return (
      <View style={ styles.container }>
        <TodoList filter={tab.key} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  createSelector(selectMainNavigation, (mainNavigation) => ({ mainNavigation })),
  mapDispatchToProps
)(MainNavigation);
