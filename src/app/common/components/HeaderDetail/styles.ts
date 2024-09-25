import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@config/function';

const styles = StyleSheet.create({
  line: {
    width: WIDTH(160),
    marginVertical: HEIGHT(16),
  },
  title: {
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    color: R.colors.black0,
  },
  backgroundWhite: { backgroundColor: R.colors.transparent },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textCount: {
    color: R.colors.redC81,
    fontSize: getFontSize(16),
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
  viewCount: {
    alignItems: 'center',
  },
  time: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    color: R.colors.grayText,
    textAlign: 'justify',
  },
  viewTitle: {
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(24),
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: R.colors.white,
    ...R.themes.shadowOffset,
  },
});

export default styles;
