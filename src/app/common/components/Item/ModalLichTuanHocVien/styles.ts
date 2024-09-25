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
  styleBtn: {
    // paddingVertical: HEIGHT(12),
    height: HEIGHT(50),
    // paddingHorizontal: WIDTH(20),
    width: WIDTH(200),
    marginTop: HEIGHT(16),
  },
  label: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
    marginBottom: HEIGHT(8),
  },
  value: {
    color: R.colors.grayText,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  contentContainer: {
    paddingHorizontal: HEIGHT(16),
    paddingBottom: HEIGHT(30),
  },
  viewThe: {
    backgroundColor: R.colors.white,
    height: HEIGHT(719),
    width: getWidth(),
    borderTopLeftRadius: WIDTH(8),
    borderTopRightRadius: WIDTH(8),
    paddingTop: HEIGHT(28),
  },
  viewNoiDung: {
    flex: 1,
    marginTop: HEIGHT(32),
  },
  title: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(18),
    color: R.colors.redColor,
  },
  viewContent: {
    bottom: 0,
    position: 'absolute',
  },
  closeButton: { position: 'absolute', right: WIDTH(18) },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
