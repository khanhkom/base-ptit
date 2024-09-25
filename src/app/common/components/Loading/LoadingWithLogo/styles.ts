import { StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getHeight,
  getLineHeight,
  getWidth,
  HEIGHT,
  sizeScale,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  loadingContainer: {
    elevation: 3,
    zIndex: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
