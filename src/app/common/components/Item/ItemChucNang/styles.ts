import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, sizeScale, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewText: {
    flex: 1,
    marginLeft: WIDTH(16),
    justifyContent: 'center',
    flexDirection: 'column',
  },
  tenChucNang: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    color: R.colors.black0,
  },

  container: {
    ...R.themes.shadowOffset,
  },
  text: {
    fontSize: sizeScale(16),
    color: '#999FA5',
    lineHeight: getLineHeight(20),
  },
  viewTen: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconChucNang: {
    height: WIDTH(24),
    width: WIDTH(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
