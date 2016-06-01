/*
 *
 * MainNavigation reducer
 *
 */

import  { NavigationExperimental } from 'react-native';
const { Reducer: NavigationReducer } = NavigationExperimental;

const tabsDefinitions = [
  { key: 'all', icon: require('./images/all.png'), title: 'All' },
  { key: 'active', icon: require('./images/active.png'), title: 'Active' },
  { key: 'completed', icon: require('./images/completed.png'), title: 'Completed' }
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
