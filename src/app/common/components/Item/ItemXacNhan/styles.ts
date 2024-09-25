import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  textStyle: {
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    marginLeft: WIDTH(8),
    fontFamily: R.fonts.BeVietnamProRegular,
    maxWidth: WIDTH(300),
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: HEIGHT(16),
  },
  viewBox: {
    backgroundColor: R.colors.white,
    width: WIDTH(359),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(16),
    ...R.themes.shadowOffset,
  },
  checkBox: {
    backgroundColor: R.colors.white,
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginLeft: WIDTH(18),
    width: WIDTH(320),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: HEIGHT(30),
  },
});
