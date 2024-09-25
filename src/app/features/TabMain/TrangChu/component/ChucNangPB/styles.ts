import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getFontSize, getLineHeight, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  containerTextBlur: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: getWidth(),
    paddingHorizontal: WIDTH(16),
  },
  label: {
    fontSize: getFontSize(16),
    // lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    color: R.colors.black0,
    // fontWeight: 'bold',
  },
  extend: {
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
    color: R.colors.black0,
    textDecorationLine: 'underline',
  },
  hitSlop: {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  columnWrapperStyle: { justifyContent: 'space-between' },
  listDefault: {
    // marginLeft: WIDTH(11.5),
    width: getWidth(),
    paddingHorizontal: WIDTH(16),
    flexGrow: 0,
    marginTop: HEIGHT(20),
  },
  contentInset: {
    top: HEIGHT(44),
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainerStyle: {
    paddingBottom: HEIGHT(16),
    // paddingHorizontal: WIDTH(16),
  },
  viewItemChucNang: {
    flex: 1,
    alignItems: 'center',
  },
  normalText: {
    fontSize: getFontSize(15),
    color: R.colors.black9,
  },
  wrapSearch: {
    height: HEIGHT(45),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: WIDTH(340),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(12),
    marginBottom: HEIGHT(12),
  },
});

export default styles;
