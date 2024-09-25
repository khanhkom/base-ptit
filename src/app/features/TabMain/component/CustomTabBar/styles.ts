import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  text: {
    // height: HEIGHT(16),
    width: WIDTH(64),
  },
  title: {
    fontSize: getFontSize(11),
    fontFamily: R.fonts.BeVietnamProMedium,
    textAlign: 'center',
  },
  contentContainerStyle: {
    paddingTop: HEIGHT(12),
  },
  itemContainer: {
    width: getWidth() / 5,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  viewIcon: {
    height: WIDTH(24),
    width: WIDTH(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: HEIGHT(2),
  },
  flatList: {
    flexGrow: 0,
  },
  tabbarBg: {
    width: getWidth(),
    height: HEIGHT(78),
    position: 'absolute',
    backgroundColor: R.colors.white,
    bottom: 0,
    ...R.themes.shadowGray,
  },
  bgTet: {
    width: WIDTH(60),
    height: WIDTH(60),
    position: 'absolute',
  },
  circleBtnIcon: {
    width: WIDTH(40),
    height: HEIGHT(40),
  },
  viewCircleBtn: {
    width: WIDTH(54),
    height: WIDTH(54),
    borderRadius: WIDTH(54) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.white,
    bottom: HEIGHT(51),
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 10,
    ...R.themes.shadowGray,
  },
  viewCircleBtnInside: {
    width: WIDTH(54),
    height: WIDTH(54),
    borderRadius: WIDTH(54) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.white,
  },
});

export default styles;
