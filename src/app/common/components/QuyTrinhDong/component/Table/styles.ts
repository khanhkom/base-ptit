import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@config/function';

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  time: {
    paddingHorizontal: WIDTH(8),
    paddingVertical: HEIGHT(2),
    borderRadius: WIDTH(8),
    backgroundColor: '#ABABAB66',
    marginLeft: WIDTH(8),
  },
  textTime: {
    color: R.colors.black0,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  viewDisplay: { flexDirection: 'row', alignItems: 'center' },

  buttoncontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dot: {
    color: R.colors.redColor,
  },
});

export default styles;
