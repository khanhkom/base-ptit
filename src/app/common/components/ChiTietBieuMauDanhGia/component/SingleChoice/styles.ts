import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  label: {
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  dot: {
    color: R.colors.redColor,
  },
  viewButton: {
    height: HEIGHT(24),
    alignItems: 'center',
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
  text: {
    flex: 1,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    marginLeft: WIDTH(8),
    fontFamily: R.fonts.BeVietnamProRegular,
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
