import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ededed',
    flexDirection: 'row',
    paddingTop: 15,
    paddingRight: 60,
  },
  labelWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 24,
    paddingBottom: 15,
    paddingTop: 1,
    marginLeft: 10,
  },
  checkbox: {
    marginLeft: 10,
    marginTop: 3,
  },
  errorWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: -50,
    marginBottom: 10,
  },
  errorIcon: {
    width: 15,
    height: 15,
  },
  errorLabel: {
    color: 'red',
    fontSize: 10,
    paddingTop: 1,
    marginLeft: 5,
  },
});
