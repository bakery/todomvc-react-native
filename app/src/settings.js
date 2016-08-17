import devBase from '../settings/development/base';
import deviOS from '../settings/development/ios';
import devAndroid from '../settings/development/android';

import productionBase from '../settings/production/base';
import productioniOS from '../settings/production/ios';
import productionAndroid from '../settings/production/android';

import { Platform } from 'react-native';

export default {
  load() {
    if (__DEV__) {
      return Object.assign({}, devBase, Platform.select({
        ios: deviOS,
        android: devAndroid,
      }));
    }

    return Object.assign({}, productionBase, Platform.select({
      ios: productioniOS,
      android: productionAndroid,
    }));
  },
};
