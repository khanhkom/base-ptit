import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getWidth, HEIGHT } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  itemtrong: {
    marginBottom: HEIGHT(20),
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
  tableContainer: { width: getWidth() },
});

export default styles;
