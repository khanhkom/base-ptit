import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT } from '@common';

const styles = StyleSheet.create({
  contentView: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  contentContainer: { paddingBottom: HEIGHT(30) },
  content: {
    flex: 1,
    paddingTop: HEIGHT(24),
    zIndex: 1,
  },
});

export default styles;
