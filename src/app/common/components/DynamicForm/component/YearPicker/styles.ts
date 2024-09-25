import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  textDongY: {
    color: 'white',
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  modal: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: WIDTH(8),
  },
  viewError: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HEIGHT(4),
  },
  viewModal: {
    flex: 1,
    height: 150,
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: WIDTH(8),
    marginTop: HEIGHT(8),
    padding: 4,
    paddingHorizontal: WIDTH(8),
    backgroundColor: R.colors.primaryColor,
    borderRadius: WIDTH(2),
    borderWidth: 0.5,
    borderColor: R.colors.primaryColor,
  },
  viewDisplay: { flexDirection: 'row', alignItems: 'center' },
  iconDown: { marginLeft: HEIGHT(8) },
  date: {
    paddingHorizontal: WIDTH(8),
    paddingVertical: HEIGHT(2),
    borderRadius: WIDTH(8),
    backgroundColor: '#ABABAB66',
    marginLeft: WIDTH(8),
    borderColor: 'rgb(255, 59, 48)',
  },
  time: {
    paddingHorizontal: WIDTH(8),
    paddingVertical: HEIGHT(2),
    borderRadius: WIDTH(8),
    backgroundColor: '#ABABAB66',
    marginLeft: WIDTH(8),
  },
  errorContent: {
    fontSize: getFontSize(12),
    color: '#F72504',
  },
  dot: {
    color: R.colors.redColor,
  },
  label: {
    maxWidth: WIDTH(150),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  buttoncontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
    zIndex: 10,
    flex: 1,
    paddingVertical: HEIGHT(8),
  },
  textTime: {
    color: R.colors.black0,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
});
