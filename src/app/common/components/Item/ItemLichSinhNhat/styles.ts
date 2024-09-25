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
  textNgay: {
    paddingHorizontal: WIDTH(16),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    lineHeight: getLineHeight(20),
    fontSize: getFontSize(16),
  },
  listMon: {
    marginTop: HEIGHT(18),
    marginBottom: HEIGHT(24),
  },
  containerMon: {
    flexDirection: 'row',
    paddingHorizontal: WIDTH(16),
    // backgroundColor: 'red',
  },
  day: {
    fontSize: getFontSize(11),
    fontFamily: R.fonts.BeVietnamProRegular,
    marginRight: WIDTH(4),
    color: R.colors.grayText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
    lineHeight: getLineHeight(18),
    marginRight: WIDTH(4),
    width: WIDTH(41),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
