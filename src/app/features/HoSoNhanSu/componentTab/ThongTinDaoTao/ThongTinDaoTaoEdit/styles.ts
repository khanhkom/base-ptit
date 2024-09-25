import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT } from '@common';

const styles = StyleSheet.create({
  container: {
    paddingBottom: HEIGHT(30),
  },
  contentBox: {
    marginBottom: HEIGHT(20),
  },
  formTable: {
    backgroundColor: R.colors.transparent,
    borderRadius: 0,
  },
  viewTable: {
    marginTop: 0,
  },
});

export default styles;
