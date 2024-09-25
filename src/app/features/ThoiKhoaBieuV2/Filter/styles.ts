import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  viewDrop: { flex: 1, opacity: 0.5, backgroundColor: R.colors.colorGray },
  viewFilter: {
    zIndex: 10,
    paddingVertical: HEIGHT(16),
    // backgroundColor: R.colors.white,
    // ...R.themes.shadowGray,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HEIGHT(8),
    paddingHorizontal: WIDTH(16),
  },
  textCheckboxStyle: {
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    marginLeft: WIDTH(8),
    fontFamily: R.fonts.BeVietnamProRegular,
    maxWidth: WIDTH(343),
  },
});

export default styles;
