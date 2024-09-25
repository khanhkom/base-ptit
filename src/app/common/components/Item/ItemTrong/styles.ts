import { Platform, StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getLineHeight,
  getWidth,
  HEIGHT,
  sizeScale,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  emptyView: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: R.colors.transparent,
    marginBottom: HEIGHT(12),
    marginTop: HEIGHT(56),
    paddingHorizontal: WIDTH(50),
  },
  imgEmpty: {
    height: WIDTH(100),
    width: WIDTH(100),
  },
  txtEmpty: {
    marginTop: HEIGHT(12),
    color: R.colors.grayText,
    textAlign: 'center',
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
});

export default styles;
