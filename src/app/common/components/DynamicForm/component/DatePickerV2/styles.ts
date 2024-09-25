import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  viewError: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HEIGHT(4),
  },
  viewDisplay: { flexDirection: 'row', alignItems: 'center' },
  iconDown: { marginLeft: HEIGHT(8) },
  date: {
    paddingHorizontal: WIDTH(8),
    paddingVertical: HEIGHT(2),
    borderRadius: WIDTH(8),
    backgroundColor: '#ABABAB66',
    marginLeft: WIDTH(8),
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
    paddingVertical: HEIGHT(8),
  },
  textTime: {
    color: R.colors.black0,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
});
