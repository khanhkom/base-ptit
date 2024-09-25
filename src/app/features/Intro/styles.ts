import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
    marginBottom: WIDTH(12),
  },
  image: {
    width: WIDTH(130),
    height: WIDTH(130),
  },
  label: { flex: 0, justifyContent: 'center', alignItems: 'center' },
  textLabel: {
    color: R.colors.black0,
    fontSize: getFontSize(18),
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
  version: {
    fontSize: getFontSize(17),
    position: 'absolute',
    bottom: HEIGHT(25),
    alignSelf: 'center',
  },
});

export default styles;
