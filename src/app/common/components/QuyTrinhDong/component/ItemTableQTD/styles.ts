import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: HEIGHT(20),
  },
  textDiem: {
    textAlign: 'center',
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
  },
  img2: {
    height: HEIGHT(400),
    alignSelf: 'center',
    width: '100%',
    zIndex: 10,
  },
  textLink: {
    color: 'rgba(129, 153, 215, 1)',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    marginLeft: WIDTH(8),
    textDecorationLine: 'underline',
  },
});

export default styles;
