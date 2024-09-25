import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  textValue: {
    color: R.colors.primaryColor,
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  content: { paddingHorizontal: WIDTH(16) },
  flatlist: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    ...R.themes.shadowOffset,
    // marginBottom: HEIGHT(20),
  },
  button: {
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(20),
  },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  contentFL: { paddingHorizontal: WIDTH(16) },
});

export default styles;
