import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  subcontainer: { marginTop: HEIGHT(24) },
  viewItem: {
    borderColor: 'rgba(171, 171, 171, 0.4)',
  },
  qrCode: {
    alignSelf: 'center',
  },
  viewContent: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(8),
    marginBottom: HEIGHT(24),
    paddingBottom: HEIGHT(18),
  },
  viewIndex1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: HEIGHT(16),
    borderColor: 'rgba(171, 171, 171, 0.4)',
  },
  title: {
    color: '#161616',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  gridHeader: {
    backgroundColor: R.colors.primaryColor,
    flexDirection: 'row',
    flexGrow: 10,
    paddingVertical: HEIGHT(12),
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(8),
  },
  textTitle: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    color: R.colors.grayText,
    textTransform: 'uppercase',
  },
  gridBottom: {
    flexDirection: 'row',
    flexGrow: 10,
    paddingVertical: HEIGHT(9),
    width: WIDTH(343),
    marginTop: HEIGHT(8),
  },
  gridBody: {
    flexDirection: 'row',
    // flexGrow: 10,
    paddingVertical: HEIGHT(8),
    width: WIDTH(343),
    borderBottomColor: '#ABABAB',
    borderBottomWidth: 0.5,
  },
  info: {
    paddingTop: HEIGHT(16),
    width: WIDTH(343),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerConTainer: {
    width: getWidth(),
    paddingTop: HEIGHT(24),
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: R.colors.white,
    paddingBottom: HEIGHT(16),
  },
  statusContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: WIDTH(12),
    // paddingVertical: HEIGHT(4),
    // borderRadius: WIDTH(24),
    marginTop: HEIGHT(16),
    // borderWidth: 1,
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
  textInfo: {
    fontSize: getFontSize(14),
    color: R.colors.gray6B,
    lineHeight: getLineHeight(22),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  textInfoBoard: {
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(20),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  moneySum: {
    fontSize: getFontSize(16),
    color: R.colors.primaryColor,
    lineHeight: getLineHeight(18),
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
    fontSize: getFontSize(20),
    color: R.colors.black0,
    lineHeight: getLineHeight(25),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  tabContainer: {
    marginTop: HEIGHT(24),
    marginBottom: HEIGHT(20),
    height: HEIGHT(42),
    paddingHorizontal: WIDTH(16),
    justifyContent: 'center',
  },
  line: {
    width: WIDTH(160),
    height: HEIGHT(0.5),
    backgroundColor: '#ABABAB',
    marginTop: HEIGHT(16),
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
