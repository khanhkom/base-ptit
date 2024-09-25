import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  textThanhCong: {
    marginTop: HEIGHT(24),
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(18),
    color: R.colors.redColor,
  },
  img: {
    height: WIDTH(100),
    width: WIDTH(100),
  },
  textHD: {
    marginTop: HEIGHT(8),
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.grayText,
  },
  viewContent: {
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: WIDTH(17),
    paddingVertical: HEIGHT(40),
    maxHeight: HEIGHT(640),
  },
  opacity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.black50p,
  },
  container: {
    // width: WIDTH(343),
    // alignSelf: 'center',

    // backgroundColor: R.colors.white,
    // marginTop: HEIGHT(100),
    // position: 'absolute',
    // paddingTop: HEIGHT(24),
    // paddingBottom: HEIGHT(28),
    // borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(12),
    // maxHeight: HEIGHT(620),
  },
  textContent: {
    color: R.colors.black0,
    fontSize: getFontSize(17),
    lineHeight: getLineHeight(24),
    marginBottom: HEIGHT(20),
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: R.colors.greenA700,
    fontSize: getFontSize(20),
    lineHeight: getLineHeight(28),
    marginBottom: HEIGHT(20),
    textAlign: 'center',
  },
  btn: {
    width: WIDTH(100),
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(20),
  },
  boldText: {
    fontWeight: 'bold',
  },
  redText: {
    color: R.colors.redText,
  },
  maTT: {
    marginBottom: HEIGHT(8),
  },
  viewInfo: {
    marginBottom: HEIGHT(30),
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  iconCancel: {
    position: 'absolute',
    top: HEIGHT(10),
    right: HEIGHT(10),
  },
});

export default styles;
