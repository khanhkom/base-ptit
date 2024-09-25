import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewContainerData: { marginTop: HEIGHT(42) },
  viewHeader: {
    flexDirection: 'row',
    borderRadius: WIDTH(8),
    alignItems: 'center',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 10,
    backgroundColor: R.colors.colorPink,
    top: 0,
  },
  viewTextHeader: {
    backgroundColor: R.colors.colorPink,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: HEIGHT(42),
  },
  viewRowData: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  viewData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  datatext: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    marginTop: HEIGHT(20),
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  listContainer: { marginTop: HEIGHT(16) },
  labelStyle: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  headerAmount: {
    alignSelf: 'flex-end',
    marginRight: WIDTH(16),
    fontSize: getFontSize(18),
    color: R.colors.primaryColor,

    lineHeight: getLineHeight(22),
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProBold,
  },
  header: {
    alignSelf: 'flex-end',
    marginRight: WIDTH(16),
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(18),
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  tabContainer: {
    marginTop: HEIGHT(24),
    marginBottom: HEIGHT(20),
    height: HEIGHT(42),
    paddingHorizontal: WIDTH(16),
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: R.colors.white,
    borderTopWidth: WIDTH(1),
    borderTopColor: R.colors.colorf8f8f8,
    overflow: 'hidden',
  },
  indicatorStyle: {
    height: HEIGHT(2),
    backgroundColor: R.colors.colorPink,
  },
});

export default styles;
