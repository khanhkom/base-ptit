import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  contentContainerStyle: {
    paddingBottom: HEIGHT(30),
  },
  loading: { height: HEIGHT(30) },
  empty: {
    marginTop: HEIGHT(160),
  },
  listContainer: { paddingTop: HEIGHT(16), paddingBottom: HEIGHT(40) },

  searchBar: {
    backgroundColor: R.colors.white,
    marginVertical: HEIGHT(16),
  },
});

export default styles;
