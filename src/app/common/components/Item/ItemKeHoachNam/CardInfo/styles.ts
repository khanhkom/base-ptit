import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    // paddingTop: HEIGHT(16),
    paddingBottom: HEIGHT(20),
    zIndex: 10,
    flex: 1,
    borderRadius: WIDTH(8),
    ...R.themes.shadowOffset,
  },
  viewGif: {
    marginBottom: HEIGHT(4),
    height: HEIGHT(26),
    position: 'absolute',
    right: 0,
    width: WIDTH(50),
  },
  fullname: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    marginTop: HEIGHT(16),
  },
  donVi: {
    lineHeight: getLineHeight(20),
    color: R.colors.grayText,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
    marginTop: HEIGHT(4),
  },
  img: {
    height: WIDTH(36),
    width: WIDTH(36),
    borderRadius: WIDTH(18),
  },
  viewLabel: { flexDirection: 'row', alignItems: 'center' },
  viewValue: {
    fontWeight: 'normal',
    marginLeft: WIDTH(6),
    fontSize: getFontSize(11),
    fontFamily: R.fonts.BeVietnamProRegular,
    lineHeight: getLineHeight(16),
  },
  loaiSK: {
    fontFamily: R.fonts.BeVietnamProRegular,
    lineHeight: getLineHeight(17),
    fontSize: getFontSize(12),
    marginBottom: HEIGHT(8),
  },
  tenSK: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    marginTop: HEIGHT(4),
    marginBottom: HEIGHT(8),
  },
  tenMon: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    marginBottom: HEIGHT(8),
  },
  viewContent: {
    flexDirection: 'row',
    marginBottom: HEIGHT(4),
    alignItems: 'center',
  },
});

export default styles;
