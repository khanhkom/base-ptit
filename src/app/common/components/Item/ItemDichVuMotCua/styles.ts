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
  textThoiHan: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
    color: R.colors.grayText,
  },
  textAmount: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(14),
    color: R.colors.redColor,
  },
  title: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(22),
    color: R.colors.black0,
  },
  viewTime: {
    marginTop: HEIGHT(8),
    flexDirection: 'row',
    // alignItems: 'center',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  viewGoTo: {
    height: HEIGHT(24),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTitle: {
    flex: 1,
    height: HEIGHT(40),
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: WIDTH(20),
  },
  itemNavStyle: {
    flex: 1,
    // flexDirection: 'row',
    flexDirection: 'column',
    // alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'space-between',
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(16),
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(12),
    borderRadius: WIDTH(8),
  },
  viewIcon: {
    width: WIDTH(24),
    alignItems: 'center',
    justifyContent: 'center',
    height: WIDTH(24),
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  textNav: {
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProMedium,
    // lineHeight: getLineHeight(24),
    color: R.colors.black0,
    // marginLeft: WIDTH(12),
    // flex: 1,
  },
  icon: {
    width: WIDTH(36),
    height: WIDTH(36),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.colorPink,
    borderRadius: WIDTH(36),
  },
  viewRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: WIDTH(8),
  },
  iconFee: {
    marginRight: WIDTH(8),
  },
});

export default styles;
