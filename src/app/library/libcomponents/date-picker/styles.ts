import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, sizeScale, WIDTH } from '@common';

export const styles = StyleSheet.create({
  viewError: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HEIGHT(4),
  },
  errorContent: {
    fontSize: getFontSize(12),
    color: '#F72504',
  },
  label: {
    marginBottom: HEIGHT(6),
    fontSize: getFontSize(14),
    color: R.colors.grey800,
    fontWeight: 'normal',
  },
  buttoncontainer: {
    alignItems: 'center',
    backgroundColor: R.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'hidden',
    zIndex: 10,
  },
  container: {
    alignItems: 'center',
    backgroundColor: R.colors.white,
    flexDirection: 'row',
    height: HEIGHT(46),
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(12),
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  textTime: {
    color: R.colors.black0,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
});
