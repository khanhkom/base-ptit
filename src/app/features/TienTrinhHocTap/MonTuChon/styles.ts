import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT } from '@common';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  listContainer: {
    alignSelf: 'center',
    paddingBottom: HEIGHT(30),
    paddingTop: HEIGHT(24),
  },
});

export default styles;
