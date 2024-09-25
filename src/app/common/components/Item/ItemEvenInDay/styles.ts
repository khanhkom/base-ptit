import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  textMoi: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
    color: R.colors.white,
  },
  viewMoi: {
    marginTop: HEIGHT(16),
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(4),
    borderRadius: WIDTH(2),
    backgroundColor: R.colors.redColor,
    alignSelf: 'flex-start',
  },
  textNgay: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    lineHeight: getLineHeight(20),
    fontSize: getFontSize(16),
  },
  listMon: {
    // marginTop: HEIGHT(18),
    // marginBottom: HEIGHT(26),
  },
  containerMon: {
    flexDirection: 'row',
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
