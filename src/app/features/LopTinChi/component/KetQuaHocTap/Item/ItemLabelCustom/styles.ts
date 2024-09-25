import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  txtChuaCapNhat: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    fontStyle: 'italic',
    color: '#B9B9B9',
  },
  textValue: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(16),
    // lineHeight: getLineHeight(24),
    color: R.colors.grayText,
  },
  textLink: {
    color: 'rgba(129, 153, 215, 1)',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    textDecorationLine: 'underline',
  },
  textLabel: {
    color: '#161616',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
  },
  img: {
    height: WIDTH(165),
    width: WIDTH(165),
    alignSelf: 'center',
    marginBottom: HEIGHT(16),
  },
  img2: {
    height: HEIGHT(400),
    alignSelf: 'center',
    width: '100%',
    zIndex: 10,
  },
  containerCover: {
    borderColor: 'rgba(171, 171, 171, 0.4)',
    flexDirection: 'column',
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HEIGHT(16),
  },
  viewValue: { flex: 1, alignItems: 'flex-end' },
});

export default styles;
