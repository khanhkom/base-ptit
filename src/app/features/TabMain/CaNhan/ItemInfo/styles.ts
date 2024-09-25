import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.white,
    paddingBottom: HEIGHT(16),
    width: getWidth(),
  },
  viewChiTiet: { maxWidth: WIDTH(343 / 2) },
  chiTiet: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    color: R.colors.grayText,
  },
  viewTT: {
    marginTop: HEIGHT(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(16),
  },
  ava: { height: HEIGHT(100), width: WIDTH(100) },
  viewADD: {
    height: WIDTH(100),
    width: WIDTH(100),
    backgroundColor: R.colors.white,
    position: 'absolute',
    alignSelf: 'center',
    top: -WIDTH(50),
    borderColor: R.colors.redColor,
    borderWidth: 1,
    borderRadius: WIDTH(50),
    overflow: 'hidden',
  },
  name: {
    marginTop: HEIGHT(70),
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(18),
    paddingVertical: HEIGHT(8),
    color: R.colors.black0,
  },
});

export default styles;
