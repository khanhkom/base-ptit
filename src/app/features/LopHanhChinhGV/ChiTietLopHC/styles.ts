import { StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getHeight,
  getLineHeight,
  getWidth,
  HEIGHT,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  contentItem: {
    height: HEIGHT(68),
    paddingVertical: HEIGHT(8),
    flexDirection: 'column',
    paddingLeft: WIDTH(8),
    flex: 1,
    justifyContent: 'space-between',
  },
  line: {
    height: WIDTH(1),
    width: WIDTH(160),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginVertical: HEIGHT(16),
  },
  viewImg: {
    backgroundColor: R.colors.primaryColor,
    height: WIDTH(48),
    width: WIDTH(48),
    borderRadius: WIDTH(8),
    marginRight: WIDTH(8),
  },
  containerItem: {
    marginBottom: HEIGHT(8),
    backgroundColor: R.colors.white,
    height: HEIGHT(84),
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    textTransform: 'capitalize',
    color: R.colors.primaryColor,
  },
  viewFilter: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontFamily: R.fonts.BeVietnamProThin,
    fontSize: getFontSize(13),
    marginTop: HEIGHT(12),
    color: R.colors.black0,
  },
  viewTitle: {
    marginBottom: HEIGHT(16),
    paddingBottom: HEIGHT(16),
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    borderColor: '#ABABAB',
  },
  textTitle: {
    fontSize: getFontSize(16),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    // marginBottom: HEIGHT(12),
    // textDecorationLine: 'underline',
    color: R.colors.black0,
  },
  textInfo: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.grayText,
    marginLeft: WIDTH(10),
    flex: 1,
  },
  viewSub: {
    width: WIDTH(343),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH(343 / 2 - 16),
  },
  containerText: {
    alignItems: 'center',
    backgroundColor: R.colors.white,
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(16),
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    flexDirection: 'column',
  },
});

export default styles;
