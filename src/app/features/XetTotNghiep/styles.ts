import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewBadge: {
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(8),
    backgroundColor: R.colors.grey100,
    borderRadius: WIDTH(100),
    ...R.themes.shadowOffset,
  },
  textResult: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    marginLeft: WIDTH(12),
  },
  containerResult: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HEIGHT(8),
    paddingHorizontal: WIDTH(12),
    borderRadius: WIDTH(8),
    backgroundColor: R.colors.white,
    width: WIDTH(343),
    alignSelf: 'center',
    ...R.themes.shadowOffset,
  },
  textValue: {
    color: R.colors.colorMain,
    // lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(18),
  },
  textTarget: {
    color: R.colors.black0,
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  content: { paddingBottom: HEIGHT(30) },
  wrapper: { justifyContent: 'space-between' },
  titleItem: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    color: R.colors.black0,
    marginTop: WIDTH(9),
    lineHeight: getLineHeight(20),
  },
  containerBox: {
    width: WIDTH(343),
    alignSelf: 'center',
    paddingBottom: HEIGHT(12),
    marginBottom: HEIGHT(12),
    borderBottomWidth: 0.5,
    borderColor: R.colors.dashedColor,
  },
  title: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    textTransform: 'uppercase',
    color: R.colors.grayText,
  },
  textProgress: { fontSize: getFontSize(13) },
  valueItem: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(20),
    color: R.colors.black0,
    marginTop: WIDTH(8),
  },
  viewItemDK: {
    marginTop: HEIGHT(12),
    width: WIDTH(165),
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: WIDTH(8),
    paddingVertical: HEIGHT(15),
    paddingHorizontal: WIDTH(14),
    backgroundColor: R.colors.white,
    ...R.themes.shadowOffset,
  },
});

export default styles;
