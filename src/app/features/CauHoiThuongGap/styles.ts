import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HEIGHT(16),
  },
  textChuDe: {
    // marginLeft: WIDTH(4),
    color: '#FFAF0B',
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(12),
  },
  textCauHoi: {
    fontFamily: R.fonts.BeVietnamProMedium,
    flex: 1,
  },
  containeritem: {
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(12),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    ...R.themes.shadowOffset,
  },
  content: {
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
    paddingHorizontal: WIDTH(16),
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  empty: {
    marginTop: HEIGHT(120),
    alignItems: 'center',
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
  },
  gridBody: {
    flexDirection: 'row',
    flexGrow: 10,
    paddingVertical: HEIGHT(12),
    borderRadius: WIDTH(8),
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
  listContainer: { marginTop: HEIGHT(24), paddingBottom: HEIGHT(20) },
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
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  textInfoBoard: {
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(18),
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
});

export default styles;
