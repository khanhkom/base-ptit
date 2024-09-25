import { Platform, StatusBar, StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getLineHeight,
  getWidth,
  HEIGHT,
  sizeScale,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  viewRight: { position: 'absolute', right: WIDTH(8) },
  btnBack: { position: 'absolute', left: WIDTH(0) },
  viewContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(12),
    width: getWidth(),
    height: HEIGHT(70),
  },
  img: {
    position: 'absolute',
    top: 0,
    width: getWidth(),
  },
  rightView: {
    minWidth: WIDTH(36),
  },
  title: {
    color: R.colors.white,
    fontSize: getFontSize(18),
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
  titleView: { width: WIDTH(260) },
});

export default styles;
