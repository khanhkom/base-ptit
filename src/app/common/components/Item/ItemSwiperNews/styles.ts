import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getLineHeight, HEIGHT, sizeScale, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    width: WIDTH(165),
  },
  textTitle: {
    color: R.colors.blurColorTitle,
    fontSize: sizeScale(13),
    lineHeight: getLineHeight(18),
    marginTop: HEIGHT(8),
  },
  cntEvent: {
    width: WIDTH(165),
    height: HEIGHT(90),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
  },
});

export default styles;
