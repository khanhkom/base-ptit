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
  uploadFile: {
    borderBottomWidth: 0,
  },
  containerItem: {
    marginBottom: HEIGHT(24),
  },
  dot: { color: R.colors.redColor },
  textBatBuoc: {
    color: R.colors.redColor,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    // marginLeft: WIDTH(16),
    marginTop: HEIGHT(8),
  },
  textSave: {
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
  },
  textnote: {
    color: R.colors.blueLight,
    fontFamily: R.fonts.BeVietnamProThinItalic,
    fontSize: getFontSize(12),
    marginTop: HEIGHT(8),
  },
  viewContent: {
    backgroundColor: R.colors.white,
    padding: WIDTH(8),
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(8),
  },
  tepDinhKem: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
  },
  textTitle: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    color: R.colors.grayText,
    textTransform: 'uppercase',
  },
  input: {
    flex: 1,
    color: '#000',
    borderBottomColor: 'transparent',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  multiline: {
    textAlign: 'left',
    height: 100,
  },
  content: {
    paddingTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
});

export default styles;
