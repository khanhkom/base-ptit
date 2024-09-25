import { Platform, StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewHTML: {
    paddingHorizontal: WIDTH(16),
    marginTop: HEIGHT(24),
  },
  nguoiGui: {
    color: R.colors.blueLight,
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProThinItalic,
    textAlign: 'right',
    marginTop: HEIGHT(8),
  },
  // viewHTML: { paddingHorizontal: WIDTH(16) },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  content: { flex: 1, paddingTop: HEIGHT(16), paddingHorizontal: WIDTH(16) },
  title: {
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    color: R.colors.black0,
  },
  line: {
    height: WIDTH(1),
    width: WIDTH(160),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginVertical: HEIGHT(16),
  },
  time: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    color: R.colors.grayText,
  },
  viewTitle: {
    paddingTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(16),
    paddingBottom: HEIGHT(16),
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: R.colors.white,
  },
});

export default styles;
