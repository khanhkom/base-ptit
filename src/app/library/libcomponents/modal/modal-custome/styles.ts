import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, sizeScale, WIDTH } from '@common';

const styles = StyleSheet.create({
  textValue: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(20),
  },
  textLabel: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(20),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ava: {
    height: WIDTH(100),
    width: WIDTH(100),
  },
  viewAVA: {
    height: WIDTH(100),
    width: WIDTH(100),
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: WIDTH(50),
    marginBottom: HEIGHT(32),
    backgroundColor: R.colors.backgroundColorNew,
  },
  closeButton: {
    backgroundColor: R.colors.white,
    height: WIDTH(40),
    width: WIDTH(40),
    borderRadius: WIDTH(20),
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: -HEIGHT(52),
    position: 'absolute',
  },
  container: {
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(40),
    maxHeight: HEIGHT(640),
  },
  text: {
    fontSize: sizeScale(16),
    color: '#999FA5',
    lineHeight: getLineHeight(20),
  },
});

export default styles;
