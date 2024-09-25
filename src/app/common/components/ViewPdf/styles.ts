import { StyleSheet } from 'react-native';

// config
import { getHeight, getWidth } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: (20 * getHeight()) / 640,
  },
  cntViewPDF: {
    flex: 1,
  },
  cntMain: {
    flex: 1,
    alignItems: 'center',
  },
  cntPDF: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: getWidth(),
  },
});

export default styles;
