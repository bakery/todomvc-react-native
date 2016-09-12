import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
    color: 'rgba(175, 47, 47, 0.15)',
    marginTop: 50,
    marginBottom: 100,
  },
  navigationMenuItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ededed',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  label: {
    fontSize: 24,
    marginLeft: 10,
  },
});
