import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  dropdown: { alignItems: 'flex-end' },
  containerStyle: {
    width: WIDTH(220),
    height: HEIGHT(36),
    paddingLeft: WIDTH(8),
    borderRadius: WIDTH(8),
  },
  viewCover: {
    // paddingHorizontal: WIDTH(16),
    backgroundColor: R.colors.white,
    width: WIDTH(343),
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
    overflow: 'hidden',
  },
  textInfo: {
    fontSize: getFontSize(14),
    color: R.colors.gray6B,
    lineHeight: getLineHeight(18),
    textAlign: 'right',
    // marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  textInfoBoard: {
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(18),
    // marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  formShow: {
    backgroundColor: R.colors.white,
    // paddingHorizontal: WIDTH(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: HEIGHT(16),
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  content: { flex: 1 },
  textKyHoc: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  viewKy: {
    // height: HEIGHT(20),
    width: WIDTH(93),
    justifyContent: 'center',
    marginRight: WIDTH(16),
  },
  viewPicker: {
    flex: 1,
    borderWidth: 0.5,
    height: HEIGHT(32),
    borderRadius: WIDTH(8),
    justifyContent: 'center',
    paddingHorizontal: WIDTH(12),
    borderColor: '#ABABAB',
  },
  placeholder: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  // list: { marginTop: HEIGHT(12) },
  wrap: { justifyContent: 'space-between' },
  contentContainer: {
    paddingTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
  maLop: {
    fontFamily: R.fonts.BeVietnamProRegular,
    color: '#6F6F6F',
    fontSize: getFontSize(14),
  },
  viewMaLopIcon: { flexDirection: 'row', alignItems: 'center' },
  viewMaLop: { flex: 1, marginLeft: WIDTH(12) },
  tenLop: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(22),
  },
  contentItem: {
    height: HEIGHT(68),
    paddingVertical: HEIGHT(8),
    flexDirection: 'column',
    paddingLeft: WIDTH(8),
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: { height: WIDTH(48), width: WIDTH(48) },
  viewImg: {
    backgroundColor: R.colors.primaryColor,
    overflow: 'hidden',
    borderRadius: WIDTH(8),
    marginRight: WIDTH(8),
  },
  containerItem: {
    marginBottom: HEIGHT(8),
    backgroundColor: R.colors.white,
    height: HEIGHT(84),
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    textTransform: 'capitalize',
    color: R.colors.primaryColor,
  },
  viewFilter: {
    // backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
    // paddingHorizontal: WIDTH(16),
    // paddingBottom: HEIGHT(16),
    // paddingTop: HEIGHT(24),
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  time: {
    fontFamily: R.fonts.BeVietnamProThin,
    fontSize: getFontSize(13),
    marginTop: HEIGHT(12),
    color: R.colors.black0,
  },
  viewTitle: {
    marginBottom: HEIGHT(16),
    paddingBottom: HEIGHT(16),
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    borderColor: '#ABABAB',
  },
});

export default styles;
