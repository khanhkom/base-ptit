import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  content: {
    // alignItems: 'center',
    paddingBottom: HEIGHT(30),
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'flex-end',

    justifyContent: 'space-between',
    width: WIDTH(283),
  },
  tinChi: {
    marginLeft: WIDTH(16),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(15),
  },
  tongSoTinChi: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(15),
    marginLeft: WIDTH(14),
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  viewContentBoLoc: {
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
  },
  containerDropDown: {
    width: WIDTH(200),
    height: HEIGHT(42),
    paddingLeft: WIDTH(8),
    borderRadius: WIDTH(8),
  },
  viewBoLoc: {
    width: WIDTH(343),
    alignSelf: 'center',
    marginTop: HEIGHT(20),
    marginBottom: HEIGHT(16),
  },
  img: {
    width: WIDTH(24),
    height: WIDTH(24),
    marginLeft: WIDTH(4),
    // marginLeft: WIDTH(14),
    // alignSelf: 'flex-end',
  },
  listCTK: {
    paddingHorizontal: WIDTH(16),
  },
  listContainer: {
    paddingBottom: HEIGHT(30),
    paddingHorizontal: WIDTH(16),
  },
  labelStyle: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  listContent: {
    height: HEIGHT(42),
    paddingVertical: HEIGHT(4),
    paddingHorizontal: WIDTH(4),
  },
  viewProgress: {
    paddingHorizontal: WIDTH(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    marginBottom: HEIGHT(24),
  },
  headerAmount: {
    alignSelf: 'flex-end',
    marginRight: WIDTH(16),
    fontSize: getFontSize(18),
    lineHeight: getLineHeight(22),
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProBold,
  },
  textInfo: {
    fontSize: getFontSize(14),
    color: R.colors.gray6B,
    textAlign: 'right',
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
  formShow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: HEIGHT(16),
    alignItems: 'center',
    maxHeight: HEIGHT(52),
  },
  chuongTrinhKhung: {
    borderBottomWidth: 0.3,
    borderColor: '#ABABAB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: HEIGHT(16),
    // backgroundColor: 'red',
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
  },
  tabBar: {
    backgroundColor: R.colors.white,
    borderTopWidth: WIDTH(1),
    borderTopColor: R.colors.colorf8f8f8,
    overflow: 'hidden',
  },
  indicatorStyle: {
    height: HEIGHT(2),
  },
});

export default styles;
