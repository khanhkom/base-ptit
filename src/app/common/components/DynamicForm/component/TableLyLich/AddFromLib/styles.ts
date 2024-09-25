import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  danhMuc: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    color: R.colors.primaryColor,
  },
  tenSP: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
    marginTop: HEIGHT(8),
    color: R.colors.black0,
  },
  viewCheckAll: {
    paddingHorizontal: WIDTH(32),
    paddingVertical: WIDTH(16),
    backgroundColor: R.colors.white,
  },
  checkBox: {
    backgroundColor: R.colors.white,
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: { paddingBottom: HEIGHT(30), paddingTop: HEIGHT(24) },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  viewCheckBox: { width: WIDTH(20), alignItems: 'center' },
  viewItem: {
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HEIGHT(16),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    borderWidth: 1,
    borderColor: R.colors.white,
  },
  viewTT: { marginLeft: WIDTH(16), flexDirection: 'column', flex: 1 },
  flatListNews: { backgroundColor: R.colors.backgroundColorNew },
  containerNews: {
    flexGrow: 0,
    paddingTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
    // paddingTop: HEIGHT(24),
    // backgroundColor: R.colors.white,
    // alignItems: 'center',
  },
  button: {
    height: HEIGHT(40),
    width: WIDTH(140),
    marginTop: HEIGHT(18),
  },
});
