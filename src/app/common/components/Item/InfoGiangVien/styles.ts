import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewAva: {
    width: WIDTH(36),
    height: WIDTH(36),
    borderRadius: WIDTH(36) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: WIDTH(16),
  },
  ava: {
    width: WIDTH(36),
    height: WIDTH(36),
  },
  viewInfo: {
    flex: 1,
  },
  viewInfoGV: {
    paddingTop: HEIGHT(24),
    flexDirection: 'row',
    paddingHorizontal: WIDTH(16),
    backgroundColor: R.colors.white,
  },
  detail: {
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  titleInfor: {
    fontSize: getFontSize(16),
    color: R.colors.black0,
    marginBottom: HEIGHT(16),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});

export default styles;
