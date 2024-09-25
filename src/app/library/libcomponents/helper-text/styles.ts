import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT } from '@common';

export const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(4),
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    overflow: 'hidden',
  },
  text: { fontFamily: R.fonts.BeVietnamProRegular, fontSize: getFontSize(12) },
  hiddenView: {
    position: 'absolute',
    zIndex: -999,
    opacity: 0,
    // overflow: 'hidden',
  },
});
