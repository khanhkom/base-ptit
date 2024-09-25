import { Platform, StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import {
  getFontSize,
  getHeight,
  getLineHeight,
  getWidth,
  HEIGHT,
  sizeScale,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  viewHTML: {
    paddingHorizontal: WIDTH(16),
  },
  list: { marginTop: HEIGHT(24) },
  content: {
    backgroundColor: R.colors.backgroundColorNew,
    // paddingTop: HEIGHT(24),
    // paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  container: {
    flex: 1,
    // paddingBottom: (50 * getHeight()) / 640,
  },
  title: {
    color: R.colors.colorBlack,
    fontSize: sizeScale(20),
    lineHeight: getLineHeight(26),
    fontWeight: 'bold',
    marginVertical: HEIGHT(10),
    alignSelf: 'center',
    textAlign: 'center',
  },
  ngayDang: {
    color: R.colors.colorBlack,
    fontSize: sizeScale(16),
    lineHeight: getLineHeight(24),
    marginBottom: HEIGHT(10),
    textAlign: 'right',
  },
  cntText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cntBonus: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.white,
  },
  textNoiBat: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
  },
  xemTatCa: {
    color: '#8199D7',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    textDecorationLine: 'underline',
  },
  cntHTML: {
    flex: 1,
    paddingHorizontal: WIDTH(15),
    paddingTop: HEIGHT(8),
    paddingBottom: HEIGHT(12),
  },
  line: {
    height: HEIGHT(10),
  },
  cntImage: {
    width: getWidth() * 0.85,
  },
  textTitle: {
    color: R.colors.colorRed,
    fontSize: sizeScale(28),
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: R.colors.colorBlack,
    fontSize: sizeScale(18),
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.6,
  },
  textBold: {
    color: R.colors.colorBlack,
    fontSize: sizeScale(18),
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.6,
    fontWeight: 'bold',
  },
  textTime: {
    color: R.colors.grey,
    fontSize: sizeScale(14),
    fontFamily: 'Roboto-Regular',
    fontStyle: 'italic',
  },
  textAuthor: {
    color: R.colors.colorWhite,
    fontSize: sizeScale(14),
    fontFamily: 'Roboto-Regular',
    padding: 3,
    backgroundColor: R.colors.blueNew,
    borderRadius: 2,
    marginRight: 3,
  },
  cntNote: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  textDifferentNews: {
    color: R.colors.blueGrey850,
    fontSize: sizeScale(16),
    fontFamily: 'Roboto',
    lineHeight: getLineHeight(24),
    fontWeight: '500',
  },
  wrapper: {
    // backgroundColor: R.colors.white,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
  },
  mLine: {
    width: WIDTH(360),
    height: HEIGHT(8),
    backgroundColor: R.colors.backgroundColorNew,
  },
});

export default styles;
