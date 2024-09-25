import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, sizeScale, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewText: {
    flex: 1,
    justifyContent: 'center',
  },
  tenChucNang: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  box: {
    marginBottom: HEIGHT(12),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    ...R.themes.shadowOffset,
  },
  container: {
    paddingVertical: HEIGHT(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
