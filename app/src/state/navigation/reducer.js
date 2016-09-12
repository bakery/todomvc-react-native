/* eslint global-require: off, import/no-unresolved: off */

import { Platform } from 'react-native';
import { tabReducer } from 'react-native-navigation-redux-helpers';

const routes = [
  {
    key: 'all',
    icon: require('../../../images/all.png'),
    title: Platform.select({ ios: 'All', android: 'All Tasks' }),
  },
  {
    key: 'active',
    icon: require('../../../images/active.png'),
    title: Platform.select({ ios: 'Active', android: 'Active Tasks' }),
  },
  {
    key: 'completed',
    icon: require('../../../images/completed.png'),
    title: Platform.select({ ios: 'Completed', android: 'Completed Tasks' }),
  },
];

const mainNavigation = tabReducer({
  key: 'mainNavigation',
  routes,
  index: 0,
});

export default mainNavigation;
