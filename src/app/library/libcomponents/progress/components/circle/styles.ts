import { StyleSheet } from 'react-native';

import { WIDTH } from '@common';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textProgress: {
    position: 'absolute',
  },
  wrapCircle: {
    transform: [{ rotate: '180deg' }],
  },
});
