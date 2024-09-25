import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewLabel: {
    paddingVertical: HEIGHT(4),
    justifyContent: 'center',
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(8),
  },
  boxChiTiet: {
    marginTop: HEIGHT(20),
  },
  textLabel: {
    color: R.colors.grayText,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
  },
  dot: { color: R.colors.redColor },
  contentBox2: {
    paddingHorizontal: WIDTH(16),
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    alignSelf: 'center',
  },
  contentBox: {
    paddingBottom: HEIGHT(30),
  },
});

export default styles;
