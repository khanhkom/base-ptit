import { Platform, StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getLineHeight,
  getWidth,
  HEIGHT,
  sizeScale,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  viewMaLop: { flexDirection: 'row', alignItems: 'center' },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // height: WIDTH(48),
    marginLeft: WIDTH(16),
  },
  img: {
    height: WIDTH(48),
    width: WIDTH(48),
    borderRadius: WIDTH(8),
  },
  tenLop: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  maLop: {
    color: R.colors.grayText,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    marginLeft: WIDTH(10),
  },
  itemNavStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: HEIGHT(16),
    paddingHorizontal: WIDTH(8),
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(12),
    borderRadius: WIDTH(8),
    ...R.themes.shadowOffset,
  },
});

export default styles;
