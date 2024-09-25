import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, sizeScale, WIDTH } from '@common';

const styles = StyleSheet.create({
  tinChi: {
    textAlign: 'center',
    marginTop: HEIGHT(4),
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.grayText,
  },
  tenChuyenNganh: {
    marginTop: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(20),
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: WIDTH(20),
    paddingVertical: HEIGHT(12),
    marginTop: HEIGHT(32),
  },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  listContent: {
    height: HEIGHT(42),
    paddingVertical: HEIGHT(4),
    paddingHorizontal: WIDTH(4),
  },
  listContainer: { marginTop: HEIGHT(16), alignSelf: 'center' },
  list2: {
    // width: WIDTH(308),
    borderRadius: WIDTH(8),
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  tabContainer: {
    marginTop: HEIGHT(24),
    marginBottom: HEIGHT(20),
    height: HEIGHT(42),
    paddingHorizontal: WIDTH(16),
    justifyContent: 'center',
  },
  modal: { paddingVertical: HEIGHT(40) },
  textValue: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
    color: R.colors.grayText,
  },
  title: {
    textAlign: 'center',
    fontSize: getFontSize(18),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    color: R.colors.primaryColor,
  },
  list: { marginTop: HEIGHT(32) },
  value: { flex: 1, alignItems: 'flex-end' },
  listItemContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT(50),
    borderColor: 'rgba(171, 171, 171, 0.4)',
  },
  textLabel: {
    color: '#161616',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ava: {
    height: WIDTH(100),
    width: WIDTH(100),
  },
  viewAVA: {
    height: WIDTH(100),
    width: WIDTH(100),
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: WIDTH(50),
    marginBottom: HEIGHT(32),
    backgroundColor: R.colors.backgroundColorNew,
  },
  closeButton: {
    backgroundColor: R.colors.white,
    height: WIDTH(40),
    width: WIDTH(40),
    borderRadius: WIDTH(20),
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: -HEIGHT(52),
    position: 'absolute',
  },
  container: {
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingHorizontal: WIDTH(17),
    paddingVertical: HEIGHT(40),
  },
  text: {
    fontSize: sizeScale(16),
    color: '#999FA5',
    lineHeight: getLineHeight(20),
  },
});

export default styles;
