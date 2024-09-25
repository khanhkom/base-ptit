import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  list: { marginTop: HEIGHT(24) },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  empty: {
    marginTop: HEIGHT(160),
  },
  contentContainerStyle: {
    paddingBottom: HEIGHT(30),
    paddingHorizontal: WIDTH(16),
  },
});

export default styles;
