import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  content: { paddingTop: HEIGHT(8) },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  divider: { width: WIDTH(310), alignSelf: 'center' },
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
  containerStyle: {
    width: WIDTH(230),
    // height: HEIGHT(36),
    paddingLeft: WIDTH(8),
    borderRadius: WIDTH(8),
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
  viewKQ: {
    width: WIDTH(343),
    marginBottom: HEIGHT(16),
  },
  textKQ: {
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  listContainer: { marginTop: HEIGHT(16), paddingBottom: HEIGHT(40) },
  labelStyle: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  tabContainer: {
    // marginTop: HEIGHT(24),
    // marginBottom: HEIGHT(20),
    // height: HEIGHT(42),
    // paddingHorizontal: WIDTH(16),
    // justifyContent: 'center',
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
  viewBoLoc: {
    width: WIDTH(343),
    alignSelf: 'center',
    // marginBottom: HEIGHT(12),
    // marginTop: HEIGHT(24),
  },
  viewLocKy: {
    // backgroundColor: R.colors.white,
    // borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: HEIGHT(16),
  },
  filterContainer: {
    borderRadius: WIDTH(8),
    backgroundColor: R.colors.white,
    width: WIDTH(343),
    alignSelf: 'center',
    marginBottom: HEIGHT(12),
    marginTop: HEIGHT(24),
  },
});

export default styles;
