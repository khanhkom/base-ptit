import { StyleSheet } from 'react-native';

import { HEIGHT } from '@common';

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: HEIGHT(40),
    paddingTop: HEIGHT(24),
    alignItems: 'center',
  },
  content: { paddingBottom: HEIGHT(30) },
  container: { flex: 1 },
});

export default styles;
