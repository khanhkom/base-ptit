import { StyleSheet } from 'react-native';

import { HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: HEIGHT(20),
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(20),
  },
  list: { flex: 1, flexGrow: 1 },
  content: { flex: 1 },
});

export default styles;
