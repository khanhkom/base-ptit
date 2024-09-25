import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(16),
    flex: 1,
  },
  viewLocKy: {
    backgroundColor: R.colors.white100,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
  },
  contentList: {
    // paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
    paddingHorizontal: WIDTH(16),
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
    // height: getHeight(),
  },
  textKetQua: { color: R.colors.redColor },
  ketQua: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(24),
    width: WIDTH(343),
  },
  containerStyle: {
    width: WIDTH(220),
    // height: HEIGHT(36),
    paddingLeft: WIDTH(8),
    borderRadius: WIDTH(8),
  },
  viewBoLoc: {
    width: WIDTH(343),
    alignSelf: 'center',
    marginBottom: HEIGHT(24),
  },
  listContainer: {
    alignSelf: 'center',
    // marginLeft: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
  labelStyle: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  note: {
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(16),
    fontFamily: R.fonts.BeVietnamProItalic,
    color: '#8199D7',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(52),
    position: 'absolute',
    bottom: HEIGHT(100),
    right: WIDTH(16),
    height: WIDTH(52),
    backgroundColor: R.colors.primaryColor,
    borderRadius: 100,
  },
  headerAmount: {
    alignSelf: 'flex-end',
    marginRight: WIDTH(16),
    fontSize: getFontSize(18),
    color: R.colors.primaryColor,

    lineHeight: getLineHeight(22),
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProBold,
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
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  formShow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: HEIGHT(16),
  },
  header: {
    alignSelf: 'flex-end',
    marginRight: WIDTH(16),
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(18),
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  tabContainer: {
    marginTop: HEIGHT(24),
    marginBottom: HEIGHT(20),
    height: HEIGHT(42),
    paddingHorizontal: WIDTH(16),
    justifyContent: 'center',
    // backgroundColor: R.colors.white100,
  },
  tabBar: {
    backgroundColor: R.colors.white,
    borderTopWidth: WIDTH(1),
    borderTopColor: R.colors.colorf8f8f8,
    overflow: 'hidden',
  },
  indicatorStyle: {
    height: HEIGHT(2),
    backgroundColor: R.colors.colorPink,
  },
});

export default styles;
