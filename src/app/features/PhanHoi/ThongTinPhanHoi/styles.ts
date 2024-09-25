import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  content: { paddingTop: HEIGHT(24), paddingHorizontal: WIDTH(16) },
  textLink: {
    color: 'rgba(129, 153, 215, 1)',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginTop: HEIGHT(8),
    marginRight: WIDTH(16),
  },
  ansTxtContainer: {
    justifyContent: 'space-between',
    backgroundColor: R.colors.white100,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    padding: HEIGHT(16),
    marginTop: HEIGHT(8),
  },
  ansContainer: {
    width: WIDTH(343),
    alignSelf: 'center',
    marginTop: HEIGHT(24),
  },
  notice: {
    width: WIDTH(343),
    alignSelf: 'center',
    marginTop: HEIGHT(8),
    color: R.colors.textBule,
    fontFamily: R.fonts.BeVietnamProLightItalic,
    fontSize: getFontSize(12),
  },
  upload: {
    color: R.colors.textBule,
    fontFamily: R.fonts.BeVietnamProRegular,
    textDecorationLine: 'underline',
    fontSize: getFontSize(13),
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: { marginTop: HEIGHT(16) },
  labelStyle: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  sign: {
    // width: WIDTH(343),
    alignSelf: 'flex-end',
    marginTop: HEIGHT(8),
    marginRight: WIDTH(16),
    color: R.colors.textBule,
    fontFamily: R.fonts.BeVietnamProLightItalic,
    fontSize: getFontSize(12),
    // flexDirection: 'row',s
    // justifyContent: 'flex-end',
  },
  textInfo: {
    fontSize: getFontSize(14),
    color: R.colors.gray6B,
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  tabContainer: {
    marginTop: HEIGHT(24),
    marginBottom: HEIGHT(20),
    height: HEIGHT(42),
    paddingHorizontal: WIDTH(16),
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: R.colors.white,
    borderTopWidth: WIDTH(1),
    borderTopColor: R.colors.colorf8f8f8,
    overflow: 'hidden',
  },
  indicatorStyle: {
    height: HEIGHT(2),
    backgroundColor: R.colors.colorPink,
  },
});

export default styles;
