import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: R.colors.white,
    borderWidth: 0.5,
    borderColor: R.colors.primaryColor,
    paddingHorizontal: WIDTH(8),
    paddingVertical: HEIGHT(2),
    borderRadius: WIDTH(2),
    marginLeft: WIDTH(8),
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  textButton: {
    color: R.colors.primaryColor,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
  },
  viewtrong: {
    marginTop: 0,
    marginBottom: 0,
  },
  viewTable: {
    marginTop: HEIGHT(8),
  },
  textList: {
    color: '#8199D7',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    textDecorationLine: 'underline',
  },
  contentContainer: {
    paddingBottom: HEIGHT(20),
  },
  textLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'hidden',
  },
  textThemMoi: {
    color: '#8199D7',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    textDecorationLine: 'underline',
    // textAlign: 'right',
  },
  dot: {
    color: R.colors.redColor,
  },
  label: {
    flex: 1,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  containerItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: HEIGHT(18),
  },

  contentContainerStyle: {},
  flatList: {
    flexGrow: 0,
  },
  container: {
    zIndex: 10,
    paddingVertical: HEIGHT(8),
  },

  hitSlop: {
    bottom: 20,
    left: 20,
    right: 20,
    top: 20,
  },
  iconDelete: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    borderRadius: WIDTH(11),
    height: HEIGHT(22),
    width: HEIGHT(22),
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#ABABAB',
  },
  fileName: {
    color: R.colors.black3,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    maxWidth: WIDTH(290),
    lineHeight: getLineHeight(24),
  },
});
