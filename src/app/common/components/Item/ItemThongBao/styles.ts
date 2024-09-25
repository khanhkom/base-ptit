import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    width: WIDTH(343),
    marginBottom: HEIGHT(12),
    backgroundColor: R.colors.white,
    paddingVertical: HEIGHT(10),
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(8),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  dotNew: {
    height: WIDTH(8),
    width: WIDTH(8),
    borderRadius: WIDTH(4),
    backgroundColor: '#10C93D',
  },
  viewChuDe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HEIGHT(4),
  },
  textChuDe: {
    // marginLeft: WIDTH(4),
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(12),
  },
  textTitle: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  viewContent: {
    flexDirection: 'column',
    marginLeft: WIDTH(16),
    flex: 1,
    height: HEIGHT(96),

    // height: HEIGHT(90),
    justifyContent: 'space-between',
  },
  textTime: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
    color: R.colors.grayText,
  },
  textContent: {
    alignSelf: 'flex-start',
    color: R.colors.gray48,
    fontSize: getFontSize(14),
    marginTop: HEIGHT(4),
    paddingHorizontal: WIDTH(12),
    lineHeight: getLineHeight(20),
    // fontFamily: R.fonts.Roboto,
  },
  cntImage: {
    height: WIDTH(90),
    width: WIDTH(90),
    borderRadius: WIDTH(8),
  },
});

export default styles;
