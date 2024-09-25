import { Platform, StyleSheet } from 'react-native';

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
  percent: {
    color: R.colors.colorPink,
    fontSize: getFontSize(11),
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
  triangleCorner: {
    // marginTop: HEIGHT(-16),
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: WIDTH(4),
    borderTopWidth: WIDTH(4),
    borderRightColor: 'transparent',
    borderTopColor: R.colors.black0,
    transform: [{ rotate: '180deg' }],
  },
  flagTxt: {
    color: R.colors.white100,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    lineHeight: getLineHeight(16),
  },
  flagContent: {
    width: WIDTH(26),
    height: WIDTH(26),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.colorMain,
  },
  flag: {
    position: 'absolute',
    right: WIDTH(12),
    top: -WIDTH(4),
    flexDirection: 'row',
  },
  container: {
    minHeight: HEIGHT(90),
    width: WIDTH(163),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(14),
    paddingVertical: HEIGHT(14),
    marginBottom: HEIGHT(16),
  },
  viewPosition1: { position: 'absolute', top: HEIGHT(14), left: 0 },
  viewPosition: { position: 'absolute', bottom: 0, right: 0 },
  viewDecor: {
    position: 'absolute',
    bottom: HEIGHT(15),
    right: WIDTH(10),
    backgroundColor: R.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WIDTH(9),
    paddingVertical: HEIGHT(3),
    borderRadius: WIDTH(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // borderRadius: 100,
    elevation: 4,
  },
  viewThongBao: { position: 'absolute', right: WIDTH(17), top: HEIGHT(14) },
  tenHocPhan: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  viewTinChi: {
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(8),
    backgroundColor: R.colors.blue100,
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(8),
  },
  viewThongTin: {
    // flex: 1,
    // width: WIDTH(96),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textTinChi: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(11),
    color: R.colors.colorPink,
  },
});

export default styles;
