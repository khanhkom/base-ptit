import { StyleSheet } from 'react-native';

import { HEIGHT } from '@common';

const styles = StyleSheet.create({
  contentView: { flex: 1 },
  contentContainer: { paddingBottom: HEIGHT(30) },
  content: {
    flex: 1,
    paddingTop: HEIGHT(24),
    zIndex: 1,
  },
});

export default styles;
