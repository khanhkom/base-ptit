import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  img: {
    height: WIDTH(24),
    width: WIDTH(24),
    borderRadius: WIDTH(8),
  },
  xemChiTiet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  tenHocLieu: { fontFamily: R.fonts.BeVietnamProSemiBold },
  containerCover: {
    backgroundColor: R.colors.white,
    paddingVertical: HEIGHT(16),
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
    borderColor: 'rgba(171, 171, 171, 0.4)',
    flexDirection: 'column',
    marginBottom: HEIGHT(16),
  },
  textValue: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
    color: R.colors.grayText,
  },
  textLabel: {
    color: '#161616',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(22),
    marginBottom: HEIGHT(8),
  },
  textLink: {
    color: 'rgba(129, 153, 215, 1)',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    marginLeft: WIDTH(8),
    textDecorationLine: 'underline',
  },
  viewValue: { flex: 1, alignItems: 'flex-end' },

  containerLabel: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // height: HEIGHT(50),
    backgroundColor: R.colors.white,
    paddingVertical: HEIGHT(16),
  },
  content: { paddingTop: HEIGHT(24), paddingHorizontal: WIDTH(16) },
  flatlist: {
    backgroundColor: R.colors.backgroundColorNew,
    borderRadius: WIDTH(8),
    // marginBottom: HEIGHT(20),
  },
  tenHocPhan: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    marginBottom: HEIGHT(24),
    textAlign: 'center',
  },
  button: {
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(20),
    marginTop: HEIGHT(32),
  },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  contentFL: { paddingHorizontal: WIDTH(16), paddingTop: HEIGHT(24) },
});

export default styles;
