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
  content: { paddingTop: HEIGHT(24), paddingHorizontal: WIDTH(16) },
  flatlist: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(20),
  },
  list: {
    paddingTop: HEIGHT(24),
  },
  button: {
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(52),
    position: 'absolute',
    bottom: HEIGHT(100),
    right: WIDTH(16),
    height: WIDTH(52),
    backgroundColor: R.colors.primaryColor,
    borderRadius: 100,
  },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  contentFL: { paddingHorizontal: WIDTH(16) },
});

export default styles;
