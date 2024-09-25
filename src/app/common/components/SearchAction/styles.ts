import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getWidth, HEIGHT, sizeScale, WIDTH } from '@common';

export const styles = StyleSheet.create({
  del: {
    height: WIDTH(20),
    width: WIDTH(20),
    borderWidth: 1,
    borderRadius: WIDTH(10),
    marginRight: WIDTH(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ABABAB',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view: {
    borderWidth: 0,
    backgroundColor: 'white',
    width: WIDTH(295),
    height: HEIGHT(40),
    paddingLeft: WIDTH(12),
  },
  textHuy: {
    color: R.colors.blueLight,
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  itemBar: {
    paddingHorizontal: WIDTH(16),
    height: HEIGHT(100),
    position: 'absolute',
    paddingBottom: HEIGHT(8),
    width: getWidth(),
    justifyContent: 'flex-end',
    backgroundColor: '#F8F9FF',
    // backgroundColor: 'red',
    zIndex: 10,
  },
  text: {
    marginTop: sizeScale(-2),
    flex: 1,
  },
});
