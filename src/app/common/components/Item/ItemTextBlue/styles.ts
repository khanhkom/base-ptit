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
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: getWidth(),
    paddingHorizontal: WIDTH(16),
  },
  label: {
    fontSize: getFontSize(16),
    // lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    color: R.colors.black0,
    // fontWeight: 'bold',
  },
  extend: {
    // fontSize: sizeScale(14),
    // lineHeight: getLineHeight(18),
    // fontFamily: R.fonts.RobotoMedium,
    // color: R.colors.blueText,
    // textDecorationLine: 'underline',
    // marginVertical: WIDTH(24),
    alignSelf: 'center',
    textDecorationLine: 'underline',
    color: '#8199D7',
  },
  hitSlop: {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  },
});

export default styles;
