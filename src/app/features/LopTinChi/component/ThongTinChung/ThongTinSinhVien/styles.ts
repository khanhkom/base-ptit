import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  textStatus: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  viewInfo: { flexDirection: 'row', justifyContent: 'space-between' },
  content: { flex: 1 },
  containerContent: {
    paddingBottom: HEIGHT(16),
    paddingTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    backgroundColor: R.colors.white,
  },
  ten: {
    color: R.colors.blueLight,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    marginLeft: WIDTH(10),
    textDecorationLine: 'underline',
  },
  tenLop: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    marginLeft: WIDTH(10),
  },
  ava: { height: WIDTH(43), width: WIDTH(43) },
  viewAnh: {
    alignSelf: 'center',
    borderRadius: WIDTH(30),
    height: WIDTH(43),
    width: WIDTH(43),
    overflow: 'hidden',
  },
  viewInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: WIDTH(343 / 2),
  },
  line: {
    alignSelf: 'center',
    height: WIDTH(1),
    width: WIDTH(160),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginVertical: HEIGHT(12),
  },
  containerChiTiet: { flex: 1 },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
});

export default styles;
