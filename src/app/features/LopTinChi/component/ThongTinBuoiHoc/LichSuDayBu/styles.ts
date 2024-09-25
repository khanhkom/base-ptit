import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  // content: { paddingTop: HEIGHT(24) },
  contentFL: {
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
  viewContent: {
    paddingBottom: HEIGHT(30),
    paddingTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
  },
});

export default styles;
