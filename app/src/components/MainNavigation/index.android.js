/*
 *
 * MainNavigation
 *
 */

import { View, Text, Image, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectMainNavigation } from '../../state/navigation/selectors';
// eslint-disable-next-line
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
// eslint-disable-next-line
import ToolbarAndroid from 'ToolbarAndroid';
import AddTodoItem from '../AddTodoItem';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { filterToComponent } from './helpers';

const { jumpTo } = navigationActions;

const androidToolbarStyle = {
  height: 56,
};

// eslint-disable-next-line
const navigationIcon = require('./images/hamburger.png');

class MainNavigation extends Component {
  constructor() {
    super();

    this.renderNavigation = this.renderNavigation.bind(this);
  }

  renderNavigation() {
    const onNavigate = (action) => {
      this.drawer.closeDrawer();
      this.props.dispatch(action);
    };
    return (
      <View style={styles.container}>
        <Text style={styles.header}>todos</Text>
        {this.props.mainNavigation.routes.map((t, i) => (
          <TouchableHighlight
            underlayColor={'#ccc'}
            onPress={() => onNavigate(jumpTo(i, this.props.mainNavigation.key))}
            key={t.key}
          >
            <View style={styles.navigationMenuItem}>
              <Image source={t.icon} style={{ marginTop: 5 }} />
              <Text style={styles.label}>{t.title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  }

  renderTabContent(tab) {
    const todoList = filterToComponent[tab.key];
    return (
      <View style={styles.container}>
        {todoList}
      </View>
    );
  }

  renderContent() {
    const selectedTab = this.props.mainNavigation.routes[this.props.mainNavigation.index];
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={androidToolbarStyle}
          navIcon={navigationIcon}
          onIconClicked={() => this.drawer.openDrawer()}
          title={selectedTab.title}
        />
        <AddTodoItem />
        {this.renderTabContent(selectedTab)}
      </View>
    );
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer; }}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigation}
      >
        {this.renderContent()}
      </DrawerLayoutAndroid>
    );
  }
}

MainNavigation.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  mainNavigation: React.PropTypes.shape({
    index: React.PropTypes.number.isRequired,
    key: React.PropTypes.string.isRequired,
    routes: React.PropTypes.arrayOf(React.PropTypes.object),
  }),
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  createSelector(selectMainNavigation, (mainNavigation) => ({ mainNavigation })),
  mapDispatchToProps
)(MainNavigation);
