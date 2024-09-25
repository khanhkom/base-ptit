import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
  input: {
    flex: 1,
    color: '#000',
    borderBottomColor: 'transparent',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    textAlign: 'left',
    height: 100,
    textAlignVertical: 'top',
  },
  textBatBuoc: {
    color: R.colors.redColor,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  viewContent: {
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
  button: {},
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
});

export default styles;
