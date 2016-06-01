/*
 *
 * MainNavigation
 *
 */

import { View, Text, Image } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectMainNavigation } from './reducer';
import { TouchableHighlight, NavigationExperimental } from 'react-native';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import ToolbarAndroid from 'ToolbarAndroid';
import FilteredTodoList from '../FilteredTodoList';
import AddTodoItem from '../AddTodoItem';

const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

const androidToolbarStyle = {
  height: 56,
};

class MainNavigation extends Component {
  render() {
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer; }}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this._renderNavigation.bind(this)}>
        {this._renderContent()}
      </DrawerLayoutAndroid>
    );
  }

  _renderNavigation() {
    const onNavigate = (action) => {
      this.drawer.closeDrawer();
      this.props.onNavigate(action);
    };
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>todos</Text>
        {this.props.mainNavigation.children.map( (t, i) => {
          return (
            <TouchableHighlight underlayColor={'#ccc'}
              onPress={ () => onNavigate(JumpToAction(i)) }
              key={ t.key }>
              <View style={ styles.navigationMenuItem }>
                <Image source={ t.icon } style={{ marginTop: 5 }} />
                <Text style={ styles.label }>{ t.title }</Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
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
        <FilteredTodoList filter={tab.key} />
      </View>
    );
  }

  _renderContent() {
    const selectedTab = this.props.mainNavigation.children[this.props.mainNavigation.index];
    const navigationIcon = require('./images/hamburger.png');
    return (
      <View style={ styles.container }>
        <ToolbarAndroid
          style={androidToolbarStyle}
          navIcon={navigationIcon}
          onIconClicked={() => this.drawer.openDrawer()}
          title={selectedTab.title}
        />
        <AddTodoItem />
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
