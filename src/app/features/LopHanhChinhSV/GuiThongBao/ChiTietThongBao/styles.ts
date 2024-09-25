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
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  content: {
    // paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
    // paddingHorizontal: WIDTH(16),
  },
  title: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    textTransform: 'capitalize',
    color: R.colors.primaryColor,
  },
  time: {
    fontFamily: R.fonts.BeVietnamProThin,
    fontSize: getFontSize(13),
    marginTop: HEIGHT(12),
    color: R.colors.black0,
  },
  viewTitle: {
    marginBottom: HEIGHT(16),
    paddingBottom: HEIGHT(16),
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    borderColor: '#ABABAB',
  },
});

export default styles;
