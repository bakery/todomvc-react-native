import base from '../settings/development';
import iosOverrides from '../settings/development.ios';
import androidOverrides from '../settings/development.android';
import { Platform } from 'react-native';

export default {
  load() {
    return Object.assign({}, base, Platform.select({
      ios: iosOverrides,
      android: androidOverrides,
    }));
  },
};
