import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewMaLop: { flexDirection: 'row', alignItems: 'center' },
  content: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // height: WIDTH(48),
    marginHorizontal: WIDTH(8),
  },
  img: {
    height: WIDTH(48),
    width: WIDTH(48),
    borderRadius: WIDTH(8),
  },
  tenLop: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProMedium,
    // fontSize: getFontSize(14),
    // lineHeight: getLineHeight(24),
    // marginBottom: HEIGHT(4),
  },
  maLop: {
    color: R.colors.grayText,
    fontFamily: R.fonts.BeVietnamProMedium,
    // fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    // marginLeft: WIDTH(10),
  },
  itemNavStyle: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: HEIGHT(8),
    paddingHorizontal: WIDTH(4),
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(16),
    borderLeftWidth: WIDTH(4),
    borderColor: R.colors.primaryColor90,
    // borderRadius: WIDTH(8),
    ...R.themes.shadowOffset,
  },
});

export default styles;
