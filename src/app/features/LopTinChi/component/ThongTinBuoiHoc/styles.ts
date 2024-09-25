import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  content: { paddingTop: HEIGHT(24) },
  contentFL: {
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
});

export default styles;
