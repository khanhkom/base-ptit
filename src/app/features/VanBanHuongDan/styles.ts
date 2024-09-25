import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  containerContent: {
    paddingTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
  },
  img: { height: WIDTH(48), width: WIDTH(48), borderRadius: WIDTH(8) },
  wrapper: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  soLuong: {
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  viewItem: {
    flexDirection: 'row',
    paddingVertical: HEIGHT(8),
    backgroundColor: R.colors.white,
    paddingLeft: WIDTH(8),
    paddingRight: WIDTH(8),
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    marginBottom: HEIGHT(12),
    alignItems: 'center',
  },
  viewTextLeft: {
    marginLeft: WIDTH(16),
    width: getWidth() * 0.75,
    justifyContent: 'center',
  },
  textNameFolder: {
    color: R.colors.black0,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProMedium,
    // fontWeight: "500"
    maxWidth: WIDTH(255),
  },
  textNote: {
    marginTop: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.grayText,
    fontSize: getFontSize(14),
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: HEIGHT(10),
  },
});

export default styles;
