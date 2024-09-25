import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { WIDTH } from '@config/function';

const styles = StyleSheet.create({
  buttonDD: {
    ...R.themes.shadowOffset,
  },
  hitSlop: {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },
});

export default styles;
