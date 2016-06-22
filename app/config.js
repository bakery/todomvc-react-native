import { Platform } from 'react-native';

export default {
  parseAppId: 'parse-app-id',
  serverURL: Platform.select({
    ios: 'http://localhost:8000',
    // XX: https://stackoverflow.com/questions/6760585/accessing-localhostport-from-android-emulator
    android: 'http://10.0.2.2:8000'
  }),
};
