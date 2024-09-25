import { Platform, StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import {
  getFontSize,
  getHeight,
  getLineHeight,
  getWidth,
  HEIGHT,
  sizeScale,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },

  containerNews: {
    flexGrow: 0,
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
  flatListNews: {},
  viewItem: {
    paddingVertical: HEIGHT(19),
    borderBottomWidth: 0.5,
    borderColor: '#ABABAB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSave: {
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProBold,
    fontSize: getFontSize(14),
  },
  textChuDe: {
    maxWidth: WIDTH(311),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  viewCheck: { marginRight: WIDTH(4) },
});

export default styles;
