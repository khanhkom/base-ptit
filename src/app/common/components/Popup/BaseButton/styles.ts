import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: R.colors.primaryColor,
    borderRadius: WIDTH(8),
    width: WIDTH(140),
  },
  btnCancel: {
    backgroundColor: R.colors.transparent,
    borderColor: R.colors.primaryColor,
    borderRadius: WIDTH(8),
    borderWidth: WIDTH(1),
    width: WIDTH(140),
  },
  content: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(12),
    paddingBottom: HEIGHT(30),
    width: WIDTH(343),
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
    color: R.colors.colorText,
  },
  textContent: {
    alignSelf: 'center',
    // color: R.colors.colorBody,
    marginBottom: HEIGHT(24),
    marginTop: HEIGHT(6),
    textAlign: 'center',
    width: WIDTH(295),
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(22),
  },
  textHeader: {
    color: R.colors.colorText,
    textAlign: 'center',
    width: WIDTH(295),
    fontWeight: 'bold',
    fontSize: getFontSize(20),
  },
  viewImage: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: R.colors.transparent,
    // borderRadius: WIDTH(96),
    height: WIDTH(96),
    justifyContent: 'center',
    marginBottom: HEIGHT(16),
    marginTop: HEIGHT(24),
    width: WIDTH(96),
  },
});

export default styles;
