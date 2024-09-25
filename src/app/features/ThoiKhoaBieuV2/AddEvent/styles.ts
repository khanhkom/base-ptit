import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  content: {
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
  textSave: {
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(12),
  },
});

export default styles;
