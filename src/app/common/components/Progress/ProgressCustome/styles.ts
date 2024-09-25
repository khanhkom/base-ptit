import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  aniFlag: {
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  viewAniFlag: {
    marginTop: HEIGHT(8),
    height: HEIGHT(24),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  animation: {
    height: 4,
    backgroundColor: 'rgba(57, 149, 0, 1)',
    borderRadius: 5,
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
  viewani: {
    height: 4,
    width: '100%',
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  img: {
    width: WIDTH(24),
    height: WIDTH(24),
    marginBottom: HEIGHT(8),
    alignSelf: 'flex-end',
  },
  viewPercent: {
    width: WIDTH(80),
    marginLeft: -WIDTH(40),
    alignItems: 'center',
  },
  textPercent: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: WIDTH(16),
  },
  day: {
    fontSize: getFontSize(11),
    fontFamily: R.fonts.BeVietnamProRegular,
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
