import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  contentBox: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
    // marginBottom: HEIGHT(20),
    // marginTop: HEIGHT(8),
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  contentContainer: {
    paddingBottom: HEIGHT(30),
    paddingHorizontal: WIDTH(16),
  },
  viewBox: {
    marginBottom: HEIGHT(20),
    ...R.themes.shadowOffset,
  },
  title: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    textTransform: 'uppercase',
    color: R.colors.grayText,
    marginBottom: HEIGHT(8),
  },
  viewContent: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
  },
});

export default styles;
