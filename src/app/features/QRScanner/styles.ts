import { StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getHeight,
  getLineHeight,
  getWidth,
  HEIGHT,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  img: { height: WIDTH(270), width: WIDTH(270), position: 'absolute', top: 0 },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  ani: {
    height: WIDTH(4),
    width: WIDTH(230),
  },
  formShow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: HEIGHT(16),
  },
  dateTextContainer: {
    paddingHorizontal: WIDTH(8),
    paddingVertical: HEIGHT(2),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginRight: WIDTH(24),
    borderRadius: WIDTH(8),
  },
  gridHeader: {
    backgroundColor: R.colors.primaryColor,
    flexDirection: 'row',
    flexGrow: 10,
    paddingVertical: HEIGHT(12),
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(36),
  },
  gridBottom: {
    flexDirection: 'row',
    flexGrow: 10,
    paddingVertical: HEIGHT(12),
    width: WIDTH(343),
    borderRadius: WIDTH(8),
    // marginTop: HEIGHT(36),
  },
  gridBody: {
    // backgroundColor: R.colors.primaryColor,
    flexDirection: 'row',
    flexGrow: 10,
    paddingVertical: HEIGHT(12),
    borderRadius: WIDTH(8),
    // marginTop: HEIGHT(36),
    width: WIDTH(343),
  },
  info: { flexDirection: 'row', justifyContent: 'space-around' },
  headerConTainer: {
    maxWidth: WIDTH(339),
    marginTop: HEIGHT(24),
    alignSelf: 'center',
    alignContent: 'center',
  },
  statusContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: WIDTH(12),
    paddingVertical: HEIGHT(4),
    borderRadius: WIDTH(24),
    marginTop: HEIGHT(24),
    borderWidth: 1,
  },
  listContainer: { marginTop: HEIGHT(16) },
  labelStyle: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProMedium,
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
  dateText: {
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(18),
    // marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  textInfo: {
    fontSize: getFontSize(14),
    color: R.colors.gray6B,
    lineHeight: getLineHeight(18),
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
  moneySum: {
    fontSize: getFontSize(16),
    color: R.colors.primaryColor,
    lineHeight: getLineHeight(18),
    // marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProBold,
  },
  textWhite: {
    fontSize: getFontSize(13),
    color: R.colors.white100,
    lineHeight: getLineHeight(17),
    // marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  header: {
    textAlign: 'center',
    marginRight: WIDTH(16),
    fontSize: getFontSize(20),
    color: R.colors.black0,
    lineHeight: getLineHeight(25),
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  tabContainer: {
    marginTop: HEIGHT(24),
    marginBottom: HEIGHT(20),
    height: HEIGHT(42),
    paddingHorizontal: WIDTH(16),
    justifyContent: 'center',
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
  //
  camera: {
    alignSelf: 'center',
    height: getHeight(),
    width: getWidth(),
  },
  containerQR: {
    backgroundColor: R.colors.backgroundColorNew,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textQuetMaQR: {
    color: R.colors.white,
    fontSize: getFontSize(18),
    marginLeft: WIDTH(8),
  },
  buttonQuetQR: {
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(8),
    borderRadius: WIDTH(100),
    backgroundColor: R.colors.colorMain,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qr: {
    alignItems: 'center',
    flexGrow: 1,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:HEIGHT(100)
  },
  rectangle: {
    height: WIDTH(270),
    width: WIDTH(270),
    alignItems: 'center',
    backgroundColor: R.colors.transparent,
  },

  row: { flexDirection: 'row' },
  topOverlay: {
    flex: 1,
    height: getWidth(),
    width: getWidth(),
    backgroundColor: R.colors.black50p,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: getWidth(),
    width: getWidth(),
    backgroundColor: R.colors.black50p,
    paddingBottom: getWidth() * 0.25,
  },

  leftAndRightOverlay: {
    height: WIDTH(270),
    width: (getWidth() - WIDTH(270)) / 2,
    backgroundColor: R.colors.black50p,
  },
});

export default styles;
