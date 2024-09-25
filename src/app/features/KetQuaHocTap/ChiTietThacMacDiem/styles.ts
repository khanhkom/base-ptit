import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  upload: {
    color: R.colors.textBule,
    fontFamily: R.fonts.BeVietnamProRegular,
    textDecorationLine: 'underline',
    fontSize: getFontSize(13),
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  scrollView: {},
  ansTxtContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: R.colors.white100,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    padding: HEIGHT(16),
    marginTop: HEIGHT(8),
  },
  textInfo: {
    fontSize: getFontSize(14),
    color: R.colors.gray6B,
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  ansContainer: {
    width: WIDTH(343),
    alignSelf: 'center',
    marginTop: HEIGHT(24),
  },
});

export default styles;
