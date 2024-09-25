import { StyleSheet } from 'react-native';

import { HEIGHT } from '@common';

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: HEIGHT(40),
    paddingTop: HEIGHT(24),
    alignItems: 'center',
  },
  itemtrong: {
    marginBottom: HEIGHT(20),
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
});

export default styles;
