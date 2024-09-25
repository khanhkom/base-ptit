import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  trangThai: {
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: HEIGHT(8),
  },
  textType: {
    fontSize: getFontSize(12),
    flex: 1,
    color: R.colors.gray6B,
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  viewTrangThai: {
    paddingHorizontal: WIDTH(4),
    paddingVertical: WIDTH(2),
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    borderRadius: WIDTH(2),
    marginBottom: HEIGHT(12),
  },
  container: {
    borderColor: R.colors.primaryColor,
    marginBottom: HEIGHT(16),
    backgroundColor: R.colors.white,
    paddingVertical: HEIGHT(12),
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    flexDirection: 'column',
    ...R.themes.shadowOffset,
  },
  textTitle: {
    fontSize: getFontSize(16),
    fontFamily: R.fonts.BeVietnamProMedium,
    flex: 1,
  },
  textInfo: {
    fontFamily: R.fonts.BeVietnamProThin,
    fontSize: getFontSize(13),
    color: R.colors.black0,
    marginLeft: WIDTH(8),
  },
  viewSub: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: R.fonts.BeVietnamProRegular,
  },
});

export default styles;
