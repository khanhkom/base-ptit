import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewInfoTH: {
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(18),
    backgroundColor: R.colors.white,
  },
  contentList: {
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
  content: {
    paddingBottom: HEIGHT(30),
  },
  itemGV: {
    flex: 1,
    marginTop: HEIGHT(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewLabel: {
    flex: 1,
    marginRight: WIDTH(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'normal',
    marginLeft: WIDTH(12),
    // flex: 1,
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  viewKQ: {
    // width: WIDTH(343),
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(16),
    alignSelf: 'flex-end',
  },
  textKQ: {
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  viewInfoNhom: {
    flexDirection: 'column',
  },
  infolabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    alignSelf: 'center',
    fontSize: getFontSize(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    marginBottom: HEIGHT(12),
  },
  textInfo: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    color: R.colors.black0,
    marginLeft: WIDTH(10),
  },
  textGV: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    color: R.colors.blueLight,
    textDecorationLine: 'underline',
    marginLeft: WIDTH(10),
  },
  line: {
    alignSelf: 'center',
    height: WIDTH(1),
    width: WIDTH(160),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginBottom: HEIGHT(12),
  },
  data: { marginTop: HEIGHT(20) },
  table: { flex: 1, paddingTop: HEIGHT(24), alignItems: 'center' },
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleHeader: {
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    marginRight: WIDTH(8),
  },
  textDiem: {
    textAlign: 'center',
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
  },
  iconSortUp: {
    marginBottom: -HEIGHT(17),
  },
  viewTTSV: { flexDirection: 'column' },
  viewCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  viewSTT: {
    width: WIDTH(35),
    textAlign: 'center',
    marginRight: WIDTH(12),
  },
  viewMess: {
    height: WIDTH(40),
    width: WIDTH(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(20),
    zIndex: 10,
  },
  xemChiTiet: {
    color: R.colors.blueLight,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    textDecorationLine: 'underline',
  },
  viewThongTinDiemDanh: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: HEIGHT(16),
  },
  hightLight: {
    color: R.colors.primaryColor,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(20),
  },
  vangPhep: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(20),
  },
  list: {
    marginTop: HEIGHT(22),
  },
  name: {
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProMedium,
    lineHeight: getLineHeight(18),
    marginBottom: HEIGHT(2),
    maxWidth: WIDTH(140),
  },
  maDinhDanh: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProRegular,
    lineHeight: getLineHeight(15),
  },

  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },

  textTabbar: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.white,
    lineHeight: getLineHeight(18),
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH(343),
    marginHorizontal: WIDTH(16),
    paddingRight: WIDTH(8),
    marginBottom: HEIGHT(29),
  },
  viewTabbar: {
    marginTop: HEIGHT(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH(343),
    marginHorizontal: WIDTH(16),
    backgroundColor: R.colors.redColor,
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(8),
    borderRadius: WIDTH(8),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
  },

  viewInfoGV: {
    // marginVertical: HEIGHT(12),
    paddingTop: HEIGHT(24),
    flexDirection: 'row',
    paddingHorizontal: WIDTH(16),
    // flex: 1,
    backgroundColor: R.colors.white,
  },
  viewAva: {
    width: WIDTH(36),
    height: WIDTH(36),
    borderRadius: WIDTH(36) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ava: {
    width: WIDTH(36),
    height: WIDTH(36),
  },
  avaSinhVien: {
    width: WIDTH(36),
    height: WIDTH(36),
  },
  viewInfo: {
    // flex: 1,
    paddingHorizontal: WIDTH(16),
    flexDirection: 'column',
    marginTop: HEIGHT(24),
  },
  detail: {
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  titleInfor: {
    fontSize: getFontSize(16),
    color: R.colors.black0,
    marginBottom: HEIGHT(16),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});

export default styles;
