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
import { selectMainNavigation } from '../../state/navigation/selectors';
import { TouchableHighlight } from 'react-native';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import ToolbarAndroid from 'ToolbarAndroid';
import TodoList from '../TodoList';
import AddTodoItem from '../AddTodoItem';

import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

const { jumpTo } = navigationActions;

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
      this.props.dispatch(action);
    };
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>todos</Text>
        {this.props.mainNavigation.routes.map( (t, i) => {
          return (
            <TouchableHighlight underlayColor={'#ccc'}
              onPress={ () => onNavigate(jumpTo(i, this.props.mainNavigation.key)) }
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
    return (
      <View style={ styles.container }>
        <TodoList filter={tab.key} />
      </View>
    );
  }

  _renderContent() {
    const selectedTab = this.props.mainNavigation.routes[this.props.mainNavigation.index];
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  createSelector(selectMainNavigation, (mainNavigation) => ({ mainNavigation })),
  mapDispatchToProps
)(MainNavigation);
