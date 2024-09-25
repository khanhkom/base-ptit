import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewTable: {
    alignItems: 'center',
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  content: { paddingBottom: HEIGHT(50) },
  viewCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
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
  iconSortUp: {
    marginBottom: -HEIGHT(17),
  },
  titleHeader: {
    color: R.colors.white,
    marginRight: WIDTH(8),
  },
  viewTTSV: { flexDirection: 'column', marginLeft: WIDTH(8) },

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

  textDiem: {
    textAlign: 'center',
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
  },
  table: { flex: 1, paddingTop: HEIGHT(24) },
  data: { marginTop: HEIGHT(20) },

  viewKQ: {
    // width: WIDTH(343),
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(16),
  },
  textKQ: {
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
});

export default styles;
