import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  itemNavStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(16),
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(12),
    borderRadius: WIDTH(8),
  },
  viewContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    color: R.colors.black0,
    marginBottom: HEIGHT(4),
  },
  textTime: {
    color: R.colors.grayText,
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  viewTrangThai: {
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(4),
    alignSelf: 'flex-end',
  },
  trangThai: {
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
  },
  thanhToan: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
  },
  viewSub: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: HEIGHT(8),
  },
  viewCot: { flexDirection: 'column' },
  label: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProRegular,
    // lineHeight: getLineHeight(18),
    color: '#ABABAB',
  },
  time: {
    fontSize: getFontSize(11),
    fontFamily: R.fonts.BeVietnamProRegular,
    lineHeight: getLineHeight(18),
    color: R.colors.grayText,
  },
  viewSTT: {
    alignSelf: 'flex-start',
    marginBottom: HEIGHT(14),
  },
  textSTT: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
    color: R.colors.white,
  },
});

export default styles;
