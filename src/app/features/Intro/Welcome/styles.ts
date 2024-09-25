import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.colorPink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    color: '#fff',
    textAlign: 'center',
    flexWrap: 'wrap',
    width: WIDTH(320),
    fontSize: getFontSize(18),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});

export default styles;
