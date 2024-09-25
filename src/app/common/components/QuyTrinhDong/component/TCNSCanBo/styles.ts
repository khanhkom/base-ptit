import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  giangVien: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
  },
  button: {
    backgroundColor: '#2d88dd',
    width: WIDTH(100),
    alignSelf: 'center',
    marginTop: HEIGHT(12),
  },
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(8),
    borderRadius: WIDTH(2),
    borderWidth: 1,
  },
  placeholderStyle: {
    paddingRight: 0,
    maxWidth: WIDTH(160),
    marginRight: WIDTH(12),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    flex: 0,
  },
  dot: {
    color: R.colors.redColor,
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
  containerInput: {
    flexDirection: 'column',
    overflow: 'hidden',
  },
  label: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
});
