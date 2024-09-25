import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, getWidth, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  label: {
    lineHeight: getLineHeight(23),
    // marginBottom: HEIGHT(18),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  dot: {
    color: R.colors.redColor,
  },
  itemContainer: {
    // width: WIDTH(330),
    alignItems: 'center',
    paddingHorizontal: WIDTH(16),
    // backgroundColor: R.colors.white,
    // borderBottomWidth: 0.5,
    flexDirection: 'row',
    marginVertical: HEIGHT(4),
  },
  textQuestion: {
    lineHeight: getLineHeight(24),
    // marginLeft: WIDTH(15),
    paddingHorizontal: WIDTH(16),
    fontSize: getFontSize(16),
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
  text: {
    // fontFamily: R.fonts.Roboto,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    marginLeft: WIDTH(8),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  cntCheckBox: {
    flex: 0,
  },
  containerMultiQues: {
    flex: 1,
    // paddingTop: HEIGHT(20),
  },
  input: {
    width: WIDTH(330),
    alignSelf: 'center',
    minHeight: HEIGHT(36),
    borderRadius: WIDTH(4),
    borderWidth: 0.5,
    paddingHorizontal: WIDTH(8),
    borderColor: R.colors.primaryColor,
  },
});
