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
  textValue: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
    color: R.colors.grayText,
  },
  title: {
    textAlign: 'center',
    fontSize: getFontSize(18),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    color: R.colors.primaryColor,
    marginBottom: HEIGHT(32),
  },
  textLabel: {
    color: '#161616',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ava: {
    height: WIDTH(100),
    width: WIDTH(100),
  },
  viewAVA: {
    height: WIDTH(100),
    width: WIDTH(100),
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: WIDTH(50),
    marginBottom: HEIGHT(32),
    backgroundColor: R.colors.backgroundColorNew,
  },
  closeButton: {
    backgroundColor: R.colors.white,
    height: WIDTH(40),
    width: WIDTH(40),
    borderRadius: WIDTH(20),
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: -HEIGHT(52),
    position: 'absolute',
  },
  container: {
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingHorizontal: WIDTH(17),
    paddingVertical: HEIGHT(40),
  },
  text: {
    fontSize: sizeScale(16),
    color: '#999FA5',
    lineHeight: getLineHeight(20),
  },
});

export default styles;
