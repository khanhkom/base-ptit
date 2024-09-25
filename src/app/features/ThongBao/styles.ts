import { StyleSheet } from 'react-native';

import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

import R from '../../assets/R';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: R.colors.white,
    elevation: 3,
    borderTopWidth: WIDTH(1),
    borderTopColor: R.colors.colorEDF1F7,
  },
  tabTitle: {
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(20),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  backdrop: {
    flex: 1,
    backgroundColor: R.colors.black30p,
    position: 'absolute',
    top: HEIGHT(120),
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export default styles;
