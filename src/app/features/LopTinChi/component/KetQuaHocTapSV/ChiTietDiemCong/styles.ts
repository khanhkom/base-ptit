import { StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getHeight,
  getLineHeight,
  getWidth,
  HEIGHT,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  line: {
    alignSelf: 'center',
    height: WIDTH(1),
    width: WIDTH(160),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginVertical: HEIGHT(12),
  },
  containerContent: {
    alignItems: 'center',
    paddingBottom: HEIGHT(24),
    paddingTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    backgroundColor: R.colors.white,
  },
  ten: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  viewInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tenLop: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    marginLeft: WIDTH(10),
  },
  // viewTable: { marginTop: HEIGHT(20) },
});

export default styles;
