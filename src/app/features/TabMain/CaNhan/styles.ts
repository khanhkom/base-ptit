import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(120),
  },
  list: { flex: 1 },

  ava: { height: HEIGHT(141), width: getWidth() },
  viewAva: { height: HEIGHT(141), width: getWidth() },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
});

export default styles;
