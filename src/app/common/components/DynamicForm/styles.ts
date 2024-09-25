import { Platform, StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  item: {
    paddingVertical: HEIGHT(8),
  },
  upload: { paddingVertical: 0 },
  viewupload: { paddingVertical: HEIGHT(8) },
  viewHTML: {
    justifyContent: 'space-between',
    backgroundColor: R.colors.white,
    overflow: 'hidden',
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(8),
    borderWidth: 0.5,
    borderColor: '#ABABAB66',
  },
  button: {
    backgroundColor: R.colors.colorPink,
    width: WIDTH(150),
    alignSelf: 'center',
    marginTop: HEIGHT(12),
  },
  dot: {
    color: R.colors.redColor,
  },
  label: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  textTitle: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    color: R.colors.grayText,
    marginBottom: HEIGHT(12),
    textTransform: 'uppercase',
  },
  textBlock: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  container: {
    width: WIDTH(343),
    alignSelf: 'center',
  },
  viewTextBlock: {
    paddingVertical: HEIGHT(8),
  },
  subContainer: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    paddingVertical: HEIGHT(8),
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(2),
  },
  form: {
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(2),
  },
  title: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(26),
    color: R.colors.black0,
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    textTransform: 'uppercase',
    textAlign: 'left',
    marginLeft: WIDTH(12),
    fontFamily: R.fonts.BeVietnamProBold,
    marginBottom: HEIGHT(3),
  },
});
