import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: WIDTH(16),
    // paddingBottom: HEIGHT(30),
    paddingTop: HEIGHT(12),
  },
  container: {
    ...R.themes.shadowOffset,
  },
  modal: { paddingVertical: HEIGHT(24) },
  list: { marginTop: HEIGHT(24) },

  tenSK: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    marginTop: HEIGHT(4),
  },
});

export default styles;
