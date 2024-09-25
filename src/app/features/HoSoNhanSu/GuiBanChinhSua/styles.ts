import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(20),
    marginTop: HEIGHT(24),
  },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    marginLeft: WIDTH(8),
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
});

export default styles;
