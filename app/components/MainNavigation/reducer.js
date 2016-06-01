/*
 *
 * MainNavigation reducer
 *
 */

import  { NavigationExperimental, Platform } from 'react-native';
const { Reducer: NavigationReducer } = NavigationExperimental;

const tabsDefinitions = [
  {
    key: 'all',
    icon: require('./images/all.png'),
    title: Platform.select({ ios: 'All', android: 'All Tasks' })
  },
  {
    key: 'active',
    icon: require('./images/active.png'),
    title: Platform.select({ ios: 'Active', android: 'Active Tasks' })
  },
  {
    key: 'completed',
    icon: require('./images/completed.png'),
    title: Platform.select({ ios: 'Completed', android: 'Completed Tasks' })
  }
];

const _mainNavigation = NavigationReducer.TabsReducer({
  key: 'mainNavigation',
  initialIndex: 0,
  tabReducers: tabsDefinitions.map(t => (lastRoute) => lastRoute || t),
});

const mainNavigation = (state, action) => {
  if (action.scope && action.scope !== 'mainNavigation') {
    return state;
  } else {
    return _mainNavigation(state, action);
  }
};

export default mainNavigation;

export function selectMainNavigation(state) {
  return state.get('mainNavigation');
}
