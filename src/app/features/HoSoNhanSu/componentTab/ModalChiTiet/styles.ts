import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, sizeScale, WIDTH } from '@common';

const styles = StyleSheet.create({
  button: {
    height: HEIGHT(40),
    width: WIDTH(140),
    marginTop: HEIGHT(32),
  },
  dot: { color: R.colors.redColor },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  textLabel2: {
    maxWidth: WIDTH(190),
  },
  textEdit: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    color: R.colors.primaryColor,
  },
  buttonEdit: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(140),
    marginTop: HEIGHT(32),
    backgroundColor: R.colors.white,
    borderColor: R.colors.primaryColor,
    borderWidth: 1,
  },
  buttonView: {
    // height: HEIGHT(40),
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(140),
    marginTop: HEIGHT(32),
  },
  textValue: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
    color: R.colors.grayText,
  },
  modal: {
    paddingVertical: HEIGHT(40),
    paddingHorizontal: 0,
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
    // height: HEIGHT(50),
    paddingVertical: HEIGHT(12),
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
