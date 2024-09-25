import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  buttonDD: {
    padding: WIDTH(6),
    backgroundColor: R.colors.white,
  },
  contentList: {
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
  textLabel: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
    marginBottom: HEIGHT(16),
  },
  info: { marginTop: HEIGHT(24) },
  valueText: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
    marginBottom: HEIGHT(16),
  },
  textLuuY: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    color: R.colors.redColor,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  titleMain: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    color: R.colors.black0,
    textAlign: 'center',
    marginBottom: HEIGHT(16),
  },
  titleConfirm: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(16),
    color: R.colors.black0,
    textAlign: 'center',
    marginBottom: HEIGHT(16),
  },
  name: {
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    color: R.colors.black0,
  },
  table: {},
  list: { marginBottom: HEIGHT(12), width: WIDTH(343), flexGrow: 0 },
  containerDiemDanh: { flex: 1, alignItems: 'center' },
  content: { paddingBottom: HEIGHT(50) },
  placeholder: {
    textAlign: 'center',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textEdit: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    color: R.colors.primaryColor,
  },
  buttonEdit: {
    width: WIDTH(140),
    backgroundColor: R.colors.white,
    borderColor: R.colors.primaryColor,
    borderWidth: 1,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(140),
  },
  containerModal: {
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingHorizontal: WIDTH(17),
    paddingVertical: HEIGHT(40),
    maxHeight: HEIGHT(640),
  },
  containerDropDown: { flex: 1 },
  viewdropdown: { width: WIDTH(110), justifyContent: 'center' },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(48),
    height: WIDTH(48),
    position: 'absolute',
    bottom: HEIGHT(100),
    right: WIDTH(16),
    backgroundColor: R.colors.primaryColor,
    borderRadius: WIDTH(26),
  },
  viewTable: { marginTop: HEIGHT(20) },
  wrap: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDiem: {
    textAlign: 'center',
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
  },

  container: { flex: 1 },
  textInfo: {
    color: R.colors.grayText,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    marginBottom: HEIGHT(12),
    width: WIDTH(343) / 2,
  },
  viewTTSV: {
    // marginTop: HEIGHT(20),
    // justifyContent: 'center',
    flexDirection: 'column',
    // marginLeft: WIDTH(8),
    alignSelf: 'flex-start',
  },

  maDinhDanh: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProRegular,
    lineHeight: getLineHeight(15),
  },
});

export default styles;
