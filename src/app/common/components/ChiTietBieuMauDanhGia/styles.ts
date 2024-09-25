import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerHelper: { marginTop: HEIGHT(8) },
  title: {
    textAlign: 'justify',
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    color: R.colors.black0,
  },
  subTitle: {
    textAlign: 'justify',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    marginTop: HEIGHT(8),
    marginBottom: HEIGHT(8),
    color: R.colors.grayText,
  },
  viewBox: {
    backgroundColor: R.colors.white,
    width: WIDTH(359),
    alignSelf: 'center',
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(16),
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(16),
    paddingBottom: HEIGHT(16),
    ...R.themes.shadowOffset,
  },
  item: {
    paddingVertical: HEIGHT(8),
  },
  txtNull: {
    alignSelf: 'center',
    marginTop: HEIGHT(30),
    fontSize: getFontSize(15),
    color: R.colors.black0,
  },
  containerScroll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: WIDTH(360),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: WIDTH(160),
    paddingVertical: HEIGHT(8),
    elevation: 3,
    backgroundColor: R.colors.primaryColor,
    justifyContent: 'center',
    borderRadius: WIDTH(36),
    alignItems: 'center',
    marginTop: HEIGHT(20),
    marginBottom: HEIGHT(40),
  },
  upload: {
    marginTop: HEIGHT(16),
  },
  wrapperTieuDe: {
    width: WIDTH(320),
    marginTop: HEIGHT(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tieuDe: {
    textAlign: 'center',
    fontSize: getFontSize(20),
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  moTa: {
    textAlign: 'justify',
    flexWrap: 'wrap',
    marginTop: HEIGHT(16),
    fontSize: getFontSize(18),
    lineHeight: getLineHeight(26),
  },
  flex: {
    flex: 1,
  },
  flatlist: {},
  titleUpload: {
    fontWeight: 'bold',
    fontSize: getFontSize(17),
    lineHeight: getLineHeight(24),
    marginBottom: HEIGHT(8),
  },
  viewUpload: {
    width: WIDTH(343),
    alignSelf: 'center',
    marginTop: 0,
  },
  moTaDanhGia: {
    fontSize: getFontSize(14),
    // fontFamily: R.fonts.Roboto,
    lineHeight: getLineHeight(24),
    marginTop: HEIGHT(16),
    // marginBottom: -HEIGHT(12),
    // paddingHorizontal: WIDTH(16),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
});
