import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  containerInput: {
    overflow: 'hidden',
    paddingVertical: HEIGHT(8),
  },
  textLabel: {
    marginLeft: WIDTH(8),
    maxWidth: WIDTH(280),
    lineHeight: getLineHeight(22),
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  label: {
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  dot: {
    color: R.colors.redColor,
  },
});
