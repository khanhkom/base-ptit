import { StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getHeight,
  getLineHeight,
  getWidth,
  HEIGHT,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
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
  },
  viewLichSu: {
    marginTop: HEIGHT(8),
  },
  textTitle: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    lineHeight: getLineHeight(20),
    color: R.colors.grayText,
    textTransform: 'uppercase',
  },
});

export default styles;
