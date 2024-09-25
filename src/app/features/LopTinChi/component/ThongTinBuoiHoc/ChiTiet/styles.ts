import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  img: {
    height: HEIGHT(400),
    alignSelf: 'center',
    width: '100%',
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  line: {
    height: WIDTH(1),
    width: WIDTH(160),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginBottom: HEIGHT(12),
  },
  viewContent: {
    marginTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
  },
  textIMG: {
    textDecorationLine: 'underline',
    color: R.colors.blueLight,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    // lineHeight: getLineHeight(20),
  },
  textTrong: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(20),
  },
  label: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    marginBottom: HEIGHT(16),
  },
  noiDung: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    marginBottom: HEIGHT(8),
  },
  value: {
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  content: { flex: 1 },
  maLop: {
    fontFamily: R.fonts.BeVietnamProRegular,
    color: '#6F6F6F',
    fontSize: getFontSize(14),
  },
  viewMaLopIcon: { flexDirection: 'row', alignItems: 'center' },
  viewMaLop: { flex: 1, marginLeft: WIDTH(12) },
  tenLop: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(22),
  },
  contentItem: {
    height: HEIGHT(68),
    paddingVertical: HEIGHT(8),
    flexDirection: 'column',
    paddingLeft: WIDTH(8),
    flex: 1,
    justifyContent: 'space-between',
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
    fontFamily: R.fonts.BeVietnamProMedium,
    marginBottom: HEIGHT(8),
  },
  buoi: {
    textAlign: 'center',
    marginBottom: HEIGHT(12),
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.grayText,
  },
  textInfo: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.grayText,
    marginLeft: WIDTH(10),
  },
  viewSub: {
    width: WIDTH(343),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewInfo: { flexDirection: 'row', alignItems: 'center' },
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
