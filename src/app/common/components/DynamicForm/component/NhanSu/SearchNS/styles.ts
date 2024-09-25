import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  viewContent: {
    paddingBottom: HEIGHT(30),
    paddingTop: HEIGHT(24),
  },
  tenGV: {
    fontSize: getFontSize(16),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
  },
  maCanBo: {
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.black0,
  },
  viewInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: WIDTH(60),
    marginLeft: WIDTH(16),
  },
  ava: {
    height: WIDTH(60),
    width: WIDTH(60),
  },
  img: {
    height: WIDTH(60),
    width: WIDTH(60),
    borderRadius: WIDTH(18),
    overflow: 'hidden',
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH(343),
    alignSelf: 'center',
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(12),
    marginBottom: HEIGHT(8),
    borderRadius: WIDTH(8),
  },
});
