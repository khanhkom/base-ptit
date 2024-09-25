import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  content: {
    paddingBottom: HEIGHT(30),
  },
  datatext: {
    textAlign: 'center',
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
  },
  container: {
    paddingTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    flex: 1,
    // width: WIDTH(343),
  },
  textKetQua: { color: R.colors.redColor },
  ketQua: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
  },
  listContainer: {
    alignSelf: 'center',
    // marginLeft: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
  btn: {
    // width: WIDTH(150),
    paddingHorizontal: WIDTH(20),
    paddingVertical: HEIGHT(12),
    marginVertical: HEIGHT(24),
    // marginTop: HEIGHT(12),
  },
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: HEIGHT(20),
  },
  textDiem: {
    textAlign: 'center',
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
    paddingVertical: HEIGHT(4),
    // borderBottomWidth: 1,
    // borderColor: '#ABABAB',
  },
  textInput: {
    textAlign: 'center',
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
    paddingVertical: HEIGHT(4),
    paddingHorizontal: HEIGHT(12),
    borderBottomWidth: 1,
    borderColor: '#ABABAB',
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
    lineHeight: getLineHeight(18),
    // marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  formShow: {
    flexDirection: 'row',
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
