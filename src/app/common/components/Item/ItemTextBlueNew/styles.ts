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
    marginBottom: WIDTH(20),
  },
  number: {
    padding: WIDTH(2),
    paddingHorizontal: WIDTH(12),
    borderRadius: WIDTH(16),
    color: R.colors.white100,
    fontFamily: R.fonts.BeVietnamProBold,
    backgroundColor: '#FF9900',
    marginLeft: WIDTH(8),
  },
  label: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(20),
    fontFamily: R.fonts.BeVietnamProBold,
    color: R.colors.colorText,
    // fontWeight: '600',
  },
  extend: {
    fontSize: getFontSize(13),
    lineHeight: getLineHeight(16),
    fontFamily: R.fonts.BeVietnamProBlack,
    color: '#8199D7',
    textDecorationLine: 'underline',
  },
  hitSlop: {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  },
});

export default styles;
