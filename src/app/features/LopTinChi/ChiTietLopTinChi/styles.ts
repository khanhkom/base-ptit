import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  itemGV: {
    marginTop: HEIGHT(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinChi: {
    textAlign: 'center',
    marginTop: HEIGHT(4),
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.grayText,
  },
  listGV: { marginTop: HEIGHT(16) },
  viewInfoHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  viewMess: {
    // height: WIDTH(32),
    // width: WIDTH(32),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: R.colors.colorMain,
    // borderRadius: WIDTH(20),
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  line: {
    alignSelf: 'center',
    height: WIDTH(1),
    width: WIDTH(160),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginVertical: HEIGHT(12),
  },
  list: { marginTop: HEIGHT(4) },
  tile: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    color: R.colors.blueLight,
  },
  contentList: { paddingHorizontal: WIDTH(16), paddingTop: HEIGHT(12) },
  textTitle: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(20),
    color: R.colors.black0,
  },
  viewThongTin: {
    marginLeft: WIDTH(30),
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: HEIGHT(48),
  },
  textProgress: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(12),
  },
  viewProgressDiemDanh: {
    width: WIDTH(191),
    flexDirection: 'row',
    alignItems: 'center',
  },
  noidung: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentDiemDanh: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    paddingVertical: HEIGHT(16),
    paddingHorizontal: WIDTH(14),
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerDiemDanh: {
    paddingHorizontal: WIDTH(16),
    marginTop: HEIGHT(24),
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  content: { flex: 1 },
  viewTLine: {
    flexDirection: 'column',
    marginTop: HEIGHT(20),
  },
  viewNgayGanNhat: {
    paddingHorizontal: WIDTH(16),
  },
  hitSlop: {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  },
  textLabel: {
    fontSize: getFontSize(16),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    color: R.colors.black0,
  },
  viewItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: getWidth(),
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(16),
  },
  textXemTatCa: {
    color: R.colors.blueLight,
    fontFamily: R.fonts.BeVietnamProRegular,
    textDecorationLine: 'underline',
  },
  textNgayKetThuc: {
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(11),
    color: R.colors.black0,
  },
  textMonGanNhat: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(11),
    color: R.colors.black0,
  },
  viewTimeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(16),
  },
  viewProgress: { width: WIDTH(320), height: HEIGHT(10) },
  viewTarget: { alignItems: 'center' },
  target: {
    height: WIDTH(12),
    width: WIDTH(12),
    borderRadius: WIDTH(8),
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  viewNgayKetThuc: {
    marginTop: HEIGHT(4),
    paddingHorizontal: WIDTH(16),
  },
  value: {
    fontWeight: 'normal',
    marginLeft: WIDTH(12),
    // flex: 1,
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  viewLabel: {
    // maxWidth: WIDTH(170),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDanhGiaNgay: {
    alignItems: 'center',
    textDecorationLine: 'none',
    textDecorationColor: R.colors.white,
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  viewLabelSiSo: {
    flexDirection: 'row',
    marginBottom: HEIGHT(20),
    alignItems: 'center',
  },
  tenSK: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    textAlign: 'center',
  },
  viewInfo: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(16),
    paddingTop: HEIGHT(24),
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
  viewTen: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: WIDTH(16),
  },
  iconChucNang: {
    height: WIDTH(24),
    width: WIDTH(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    flex: 1,
    marginLeft: WIDTH(16),
    justifyContent: 'center',
  },
});

export default styles;
