import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  contentContainer: {
    paddingBottom: HEIGHT(30),
    paddingHorizontal: WIDTH(16),
  },
  contentBox: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
  },
  viewBox: {
    marginBottom: HEIGHT(20),
  },
  title: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    textTransform: 'uppercase',
    lineHeight: getLineHeight(22),
    color: R.colors.grayText,
    marginBottom: HEIGHT(8),
  },
  viewContent: {
    // paddingHorizontal: WIDTH(16),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
  },
});

export default styles;
