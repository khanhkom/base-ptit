import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewLoading: { height: HEIGHT(150) },
  viewCMSN: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HEIGHT(16),
    paddingHorizontal: WIDTH(16),
  },
  viewImg: {
    height: WIDTH(40),
    width: WIDTH(40),
    marginRight: WIDTH(8),
  },
  fullname: {
    color: R.colors.colorMain,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  textMoi: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
    color: R.colors.white,
  },
  title: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  containerMon: {
    flexDirection: 'row',
  },
  viewMoi: {
    marginTop: HEIGHT(16),
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(4),
    borderRadius: WIDTH(2),
    backgroundColor: R.colors.redColor,
    alignSelf: 'flex-start',
  },
  viewtrong: { marginTop: 0, marginBottom: 0 },
  xemThem: {
    textAlign: 'center',
    marginTop: HEIGHT(10),
    color: R.colors.blueLight,
    textDecorationLine: 'underline',
  },
  dayBD: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(14),
    color: R.colors.redColor,
    marginBottom: HEIGHT(8),
  },
  time: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(12),
    color: R.colors.grayText,
  },
  content: {
    paddingHorizontal: WIDTH(16),
  },
  viewTime: {
    paddingVertical: HEIGHT(4),
    width: WIDTH(45),
    marginRight: WIDTH(10),
  },
  viewTitle: {
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(8),
    height: WIDTH(24),
    alignItems: 'center',
    flexDirection: 'row',
  },
  listMon: {
    marginTop: HEIGHT(20),
    marginBottom: HEIGHT(24),
  },
  textThang: {
    color: R.colors.colorPink,
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(14),
  },
  containerItem: { flexDirection: 'row', marginBottom: HEIGHT(10) },
});

export default styles;
