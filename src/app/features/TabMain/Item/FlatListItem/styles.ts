import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  listContainer: {
    marginTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(150),
  },
});

export default styles;
