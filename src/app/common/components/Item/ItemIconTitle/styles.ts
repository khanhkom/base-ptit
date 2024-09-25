import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, WIDTH } from '@config/function';

const styles = StyleSheet.create({
  viewLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'normal',
    marginLeft: WIDTH(12),
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProMedium,
    maxWidth: WIDTH(250),
  },
});

export default styles;
