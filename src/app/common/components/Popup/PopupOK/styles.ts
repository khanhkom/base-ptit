import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: R.colors.primaryColor,
    borderRadius: WIDTH(8),
    width: WIDTH(140),
    borderColor: R.colors.primaryColor,
    borderWidth: WIDTH(2),
    paddingVertical: 0,
  },
  viewContent: {
    marginBottom: HEIGHT(8),
  },
  btnCancel: {
    backgroundColor: R.colors.transparent,
    borderColor: R.colors.primaryColor,
    borderRadius: WIDTH(8),
    borderWidth: WIDTH(2),
    width: WIDTH(140),
    paddingVertical: 0,
  },
  content: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(12),
    paddingBottom: HEIGHT(40),
    width: WIDTH(343),
    paddingTop: HEIGHT(40),
  },
  image: {
    height: WIDTH(46),
    width: WIDTH(46),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(20),
    width: WIDTH(343),
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(20),
    width: WIDTH(343),
  },
  text: {
    color: R.colors.primaryColor,
  },
  textContent: {
    alignSelf: 'center',
    fontFamily: R.fonts.BeVietnamProRegular,
    marginTop: HEIGHT(8),
    textAlign: 'center',
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
    color: R.colors.grayText,
  },
  textHeader: {
    color: '#161616',
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(18),
    lineHeight: getLineHeight(23),
  },
  viewImage: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: R.colors.white,
    position: 'absolute',
    top: -WIDTH(50),
    borderRadius: WIDTH(96),
    height: WIDTH(150),
    justifyContent: 'center',
    // marginBottom: HEIGHT(16),
    // marginTop: HEIGHT(24),
    width: WIDTH(150),
  },
});

export default styles;
