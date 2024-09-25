import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  anyProgress: {
    height: 4,
    backgroundColor: 'rgba(57, 149, 0, 1)',
    borderRadius: 5,
  },
  viewAni: {
    height: 4,
    width: '100%',
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  aniFlag: {
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  viewAniFlag: {
    marginTop: HEIGHT(8),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap: {
    height: 8,
    width: 8,
    marginLeft: -4,
    borderRadius: 4,
    zIndex: 10,
    backgroundColor: 'rgba(57, 149, 0, 1)',
  },
  viewtarget: {
    marginLeft: WIDTH(16),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  viewPercent: {
    width: WIDTH(40),
    marginLeft: -WIDTH(20),
    alignItems: 'center',
  },
  textPercent: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  container: {
    flexDirection: 'column',
    marginTop: HEIGHT(8),
    // paddingHorizontal: WIDTH(16),
  },
  day: {
    fontSize: getFontSize(11),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  img: {
    width: WIDTH(28),
    height: WIDTH(28),
    alignSelf: 'center',
  },
  textDayHtai: {
    fontSize: getFontSize(11),
    fontFamily: R.fonts.BeVietnamProRegular,
    textAlign: 'right',
    marginBottom: HEIGHT(8),
    color: R.colors.redColor,
  },
  viewProGress: { flexDirection: 'column', justifyContent: 'flex-end' },
});
