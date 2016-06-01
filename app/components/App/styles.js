import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 20,
      }
    })
  }
});
