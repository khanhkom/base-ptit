import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  itemContainer: {
    width: WIDTH(343),
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(16),
    alignSelf: 'center',
    backgroundColor: R.colors.white,
    marginTop: HEIGHT(16),
    borderRadius: WIDTH(8),
  },
  button: {
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(52),
    position: 'absolute',
    bottom: HEIGHT(100),
    right: WIDTH(16),
    height: WIDTH(52),
    backgroundColor: R.colors.primaryColor,
    borderRadius: 100,
  },
  ngayGui: {
    fontSize: getFontSize(11),
    color: R.colors.grayText,
    marginTop: HEIGHT(8),
    marginBottom: 0,
    fontFamily: R.fonts.BeVietnamProLight,
  },
  title: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(22),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: '#161616',
    marginBottom: HEIGHT(8),
  },
  containerNews: {
    flexGrow: 0,
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
    paddingTop: HEIGHT(24),
    alignItems: 'center',
  },
  viewKQ: {
    width: WIDTH(343),
    marginBottom: HEIGHT(16),
  },
  textKQ: {
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  content: {
    paddingTop: HEIGHT(34),
    flex: 1,
    paddingHorizontal: WIDTH(16),
  },
  textLabel: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  value: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  flatlist: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(20),
  },
  contentFL: { paddingHorizontal: WIDTH(16) },
  viewContent: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(24),
    marginTop: HEIGHT(8),
  },
  viewItem: {
    backgroundColor: R.colors.white,
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(12),
    // marginTop: HEIGHT(8),
  },
  viewLichSu: {
    // backgroundColor: R.colors.white,
    // paddingHorizontal: WIDTH(16),
    // borderRadius: WIDTH(8),
    // marginBottom: HEIGHT(24),
    marginTop: HEIGHT(8),
  },
  textTitle: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    color: R.colors.grayText,
    textTransform: 'uppercase',
  },
});

export default styles;
