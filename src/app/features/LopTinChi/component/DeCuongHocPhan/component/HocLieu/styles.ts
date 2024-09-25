import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  contentContainer: {
    paddingTop: HEIGHT(24),
  },
  contentTable: { paddingBottom: HEIGHT(30) },

  containerInfo: {
    marginTop: HEIGHT(20),
  },
  textKQ: {
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    marginBottom: HEIGHT(14),
  },
  textLink: {
    color: 'rgba(129, 153, 215, 1)',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    marginLeft: WIDTH(8),
    textDecorationLine: 'underline',
  },
  textDiem: {
    lineHeight: getLineHeight(22),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.black0,
    fontSize: getFontSize(14),
    textAlign: 'center',
  },
});

export default styles;
