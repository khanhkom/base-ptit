import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(4),
    paddingVertical: HEIGHT(4),
    borderRadius: WIDTH(2),
  },
  text: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
});

export default styles;
