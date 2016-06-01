/*
 *
 * MainNavigation
 *
 */

import { View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectMainNavigation } from './reducer';
import { TouchableHighlight, NavigationExperimental } from 'react-native';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import ToolbarAndroid from 'ToolbarAndroid';

const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

const androidToolbarStyle = {
  backgroundColor: '#E9EAED',
  height: 56,
};

class MainNavigation extends Component {
  render() {
    const onNavigate = (action) => {
      this.drawer.closeDrawer();
      this.props.onNavigate(action);
    };

    const navigationView = (
      <View style={ styles.container }>
        {this.props.mainNavigation.children.map( (t, i) => {
          return (
            <TouchableHighlight
              onPress={ () => onNavigate(JumpToAction(i)) }
              key={ t.key }>
              <Text>{ t.title }</Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );

    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer; }}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        {this._renderContent()}
      </DrawerLayoutAndroid>
    );
  }

  _renderTabContent(tab) {
    // XX: replace this with code to render specific components/containers
    // corresponding to tabs in your app, e.g.
    // if (tab.key === 'maps') {
    //   return <MapView />;
    // }

    return (
      <View style={ styles.container }>
        <Text>Generic Tab</Text>
      </View>
    );
  }

  _renderContent() {
    const selectedTab = this.props.mainNavigation.children[this.props.mainNavigation.index];
    const navigationIcon = { uri: 'http://placehold.it/56x56' };
    return (
      <View style={ styles.container }>
        <ToolbarAndroid
          style={androidToolbarStyle}
          navIcon={navigationIcon}
          onIconClicked={() => this.drawer.openDrawer()}
          title={selectedTab.title}
        />
        {this._renderTabContent(selectedTab)}
      </View>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, dispatchProps, stateProps, {
    onNavigate: (action) => {
      dispatchProps.dispatch(
        Object.assign(action, {
          scope: action.scope || stateProps.mainNavigation.key
        })
      );
    }
  });
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  createSelector(selectMainNavigation, (mainNavigation) => ({ mainNavigation })),
  mapDispatchToProps, mergeProps
)(MainNavigation);
