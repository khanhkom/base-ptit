import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  scrollView: { paddingBottom: HEIGHT(30), paddingTop: HEIGHT(24) },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  button: {
    height: HEIGHT(40),
    width: WIDTH(140),
    marginTop: HEIGHT(18),
  },
});
