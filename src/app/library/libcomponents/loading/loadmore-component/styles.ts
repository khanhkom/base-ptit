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
  container: {
    padding: HEIGHT(20),
    alignSelf: 'center',
    alignItems: 'center',
    width: getWidth(),
  },
});

export default styles;
