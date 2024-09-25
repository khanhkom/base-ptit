import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2d88dd',
    width: WIDTH(100),
    alignSelf: 'center',
    marginTop: HEIGHT(12),
  },
  viewContainer: {
    paddingVertical: HEIGHT(8),
  },
  viewInput: {
    paddingVertical: 0,
    marginTop: HEIGHT(8),
  },
  subContainer: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    alignSelf: 'center',
    paddingTop: HEIGHT(10),
    paddingBottom: HEIGHT(16),
  },
  form: {
    paddingHorizontal: WIDTH(12),
    paddingBottom: HEIGHT(2),
  },
  label: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  dot: {
    color: R.colors.redColor,
  },
});
