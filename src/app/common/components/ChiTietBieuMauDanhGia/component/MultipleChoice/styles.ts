import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, getWidth, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    marginLeft: WIDTH(8),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  container: {
    flex: 1,
    // paddingTop: HEIGHT(20),
    width: getWidth(),
  },
  textCheckboxStyle: {
    // fontFamily: R.fonts.Roboto,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
  },
  itemContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginVertical: HEIGHT(4),
  },
  textQuestion: {
    lineHeight: getLineHeight(24),
    fontSize: getFontSize(16),
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
  wrapper: {
    paddingHorizontal: WIDTH(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper2: {
    flex: 1,
    marginTop: HEIGHT(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginLeft: WIDTH(0),
    width: WIDTH(320),
  },
  title: {
    // fontFamily: R.fonts.Roboto,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    textAlignVertical: 'center',
    fontWeight: 'normal',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: WIDTH(20),
  },
  breakDown: {
    width: getWidth(),
    height: HEIGHT(8),
  },
  checkBoxStyle: {
    width: WIDTH(30),
    marginRight: WIDTH(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  hitSlop: {
    top: WIDTH(5),
    left: WIDTH(5),
    bottom: WIDTH(5),
    right: WIDTH(5),
  },
  formEnterInfo: {
    paddingHorizontal: WIDTH(8),
    minHeight: 46,
    marginHorizontal: WIDTH(12),
    width: WIDTH(336),
    paddingVertical: HEIGHT(8),
    borderWidth: 0.5,
    marginTop: HEIGHT(8),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(2),
  },
  cntCheckBox: {
    flex: 0,
  },
  containerMultiQues: {
    flex: 1,
  },
  textMultiQues: {
    color: R.colors.colorBlack,
    fontSize: getFontSize(17),
    // fontFamily: R.fonts.Roboto,
    fontWeight: 'normal',
    marginLeft: WIDTH(10),
    lineHeight: getLineHeight(23),
  },
  itemRating: {
    height: HEIGHT(40),
    marginHorizontal: WIDTH(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: HEIGHT(8),
  },
  autoList: {
    width: WIDTH(331),
    marginLeft: 0,
    // marginTop: 5,
    borderColor: '#D3DEE8',
    borderBottomLeftRadius: WIDTH(8),
    borderBottomRightRadius: WIDTH(8),
    maxHeight: HEIGHT(230),
  },
  autocompleteContainer: {
    width: WIDTH(331),
    marginTop: HEIGHT(10),
  },
  viewBoard: { width: getWidth(), paddingHorizontal: WIDTH(18), flex: 1 },
  red: { color: 'red' },
});