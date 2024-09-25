import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewContent: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  btn: {
    width: WIDTH(100),
    borderRadius: WIDTH(8),
    marginVertical: HEIGHT(16),
    alignSelf: 'center',
  },
  content: { paddingBottom: HEIGHT(30) },
  viewBox: {
    backgroundColor: R.colors.white,
    width: WIDTH(359),
    alignSelf: 'center',
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(16),
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(16),
    paddingBottom: HEIGHT(16),
    ...R.themes.shadowOffset,
  },
  viewBtn: {
    width: getWidth(),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: R.colors.white,
    elevation: 4,
    paddingVertical: HEIGHT(12),
  },
  itemXacNhan: { marginTop: HEIGHT(16) },
  txtThacMac: {
    fontSize: getFontSize(18),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    color: R.colors.black0,
    marginRight: WIDTH(12),
  },
  flex: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  time: {
    fontSize: getFontSize(16),
    marginVertical: HEIGHT(10),
    lineHeight: getLineHeight(20),
    alignSelf: 'center',
  },
  empty: {
    color: R.colors.black0,
    width: 0.9 * getWidth(),
    fontSize: getFontSize(16),
    textAlign: 'center',
    lineHeight: getLineHeight(20),
    alignSelf: 'center',
  },
});

export default styles;
