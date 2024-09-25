import { StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getHeight,
  getLineHeight,
  getWidth,
  HEIGHT,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  viewMain: { flexDirection: 'column', alignItems: 'center' },
  logo: { width: WIDTH(130), height: WIDTH(130) },
  tenApp: {
    color: R.colors.primaryColor,
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(20),
    marginTop: HEIGHT(12),
  },
  list: { position: 'absolute', bottom: HEIGHT(45) },
  viewIcon: {
    height: WIDTH(24),
    width: WIDTH(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: HEIGHT(8),
  },
  textButton: {
    minWidth: WIDTH(69),
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    color: R.colors.grayText,
  },
  viewButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: WIDTH(12),
  },
  viewBio: { marginTop: HEIGHT(16) },
  button: {
    width: WIDTH(340),
    marginTop: HEIGHT(40),
    paddingVertical: HEIGHT(12),
  },
  otherLogin: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    color: R.colors.grayText,
    marginTop: HEIGHT(24),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: WIDTH(120),
    height: HEIGHT(150),
    marginVertical: HEIGHT(32),
  },
  background: {
    width: getWidth(),
    height: HEIGHT(260),
  },
  subContainer: {
    borderTopLeftRadius: WIDTH(32),
    borderTopRightRadius: WIDTH(32),
    backgroundColor: R.colors.white,
    alignItems: 'center',
    marginTop: -HEIGHT(90),
  },
  ggButton: {
    width: WIDTH(250),
    height: HEIGHT(35),
    paddingVertical: HEIGHT(4),
    paddingHorizontal: WIDTH(8),
    borderRadius: WIDTH(4),
  },
  fbButton: {
    elevation: 2,
    width: WIDTH(244),
    height: HEIGHT(30),
    marginTop: HEIGHT(20),
    marginBottom: HEIGHT(50),
    flexDirection: 'row',
    backgroundColor: '#0080F8',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textFB: {
    color: R.colors.black3,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    marginLeft: WIDTH(10),
  },
  loading: {
    elevation: 3,
    flex: 1,
    width: getWidth(),
    height: getHeight(),
    position: 'absolute',
    top: getHeight() / 2,
    left: 0,
    right: 0,
    backgroundColor: 'gray',
  },
  signUp: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    fontWeight: 'bold',
  },
  btnLogin: {
    width: WIDTH(327),
    height: HEIGHT(45),
    borderRadius: WIDTH(8),
    color: R.colors.primaryColor,
  },
  btnChonTruong: {
    marginBottom: HEIGHT(16),
    backgroundColor: R.colors.white,
    borderWidth: 1,
  },
  line: {
    width: getWidth(),
    paddingHorizontal: WIDTH(24),
    marginTop: HEIGHT(30),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  lineButton: {
    width: getWidth(),
    paddingHorizontal: WIDTH(24),
    marginTop: HEIGHT(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewBtnFB: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginImg: {
    width: WIDTH(300),
    height: HEIGHT(130),
    marginTop: HEIGHT(32),
  },
  viewTextinput: {
    marginTop: HEIGHT(10),
    marginBottom: HEIGHT(26),
  },
  btnTuyenSinh: {
    width: WIDTH(250),
    borderRadius: WIDTH(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: HEIGHT(10),
    height: HEIGHT(50),
  },
  textBtn: {
    marginLeft: WIDTH(10),
  },
  quenMK: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    color: R.colors.colorPink,
    marginTop: HEIGHT(20),
    textAlign: 'center',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  hitSlop: {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  },
  btnLoginSLinkID: {
    width: WIDTH(330),
    height: HEIGHT(45),
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(30),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: HEIGHT(32),
    marginBottom: HEIGHT(12),
  },
  thinLine: {
    width: WIDTH(95),
    height: 1,
    backgroundColor: R.colors.grayBAC6DE,
  },
  text: {
    fontSize: getFontSize(15),
    lineHeight: getLineHeight(18),
    marginHorizontal: WIDTH(8),
    color: R.colors.black0,
  },
});

export default styles;
