import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  containerExpand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: HEIGHT(16),
    marginTop: HEIGHT(24),
  },
  tenChucNang: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
  },
  container: {
    width: WIDTH(343),
    // marginBottom: HEIGHT(24),
  },
});

export default styles;
