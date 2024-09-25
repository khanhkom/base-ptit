import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  contentView: { flex: 1, paddingTop: HEIGHT(24) },
  content: {
    paddingBottom: HEIGHT(50),
  },
  tableView: { alignItems: 'center' },
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  textDiem: {
    textAlign: 'center',
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
  },
  viewKQ: {
    width: WIDTH(343),
    marginBottom: HEIGHT(16),
    alignSelf: 'center',
  },
  textKQ: {
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  viewTable: { marginTop: HEIGHT(20) },
  viewAva: {
    width: WIDTH(36),
    height: WIDTH(36),
    borderRadius: WIDTH(36) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  name: {
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProMedium,
    lineHeight: getLineHeight(18),
    marginBottom: HEIGHT(2),
    // maxWidth: WIDTH(140),
  },
  maDinhDanh: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProRegular,
    lineHeight: getLineHeight(15),
  },
  viewTTSV: { flexDirection: 'column' },
  viewCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  avaSinhVien: {
    width: WIDTH(36),
    height: WIDTH(36),
  },
});

export default styles;
