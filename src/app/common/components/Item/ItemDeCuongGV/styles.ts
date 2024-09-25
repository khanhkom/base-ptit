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
  viewAva: {
    width: WIDTH(36),
    height: WIDTH(36),
    borderRadius: WIDTH(36) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: WIDTH(16),
    marginBottom: HEIGHT(16),
  },
  imgNoti: {
    width: WIDTH(36),
    height: WIDTH(36),
    borderRadius: WIDTH(36) / 2,
  },
  txtTen: {
    color: R.colors.black0,
    fontSize: getFontSize(16),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  ava: {
    width: WIDTH(36),
    height: WIDTH(36),
  },
  viewInfo: {
    flex: 1,
  },
  viewInfoGV: {
    // paddingTop: HEIGHT(24),
    paddingVertical: HEIGHT(16),
    flexDirection: 'column',
    paddingHorizontal: WIDTH(16),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(16),
    ...R.themes.shadowOffset,
  },
  detail: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.grayText,
    marginBottom: HEIGHT(8),
  },
  titleInfor: {
    fontSize: getFontSize(16),
    color: R.colors.black0,
    marginBottom: HEIGHT(16),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});

export default styles;
