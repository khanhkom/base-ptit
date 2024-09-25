import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewTTSV: { flexDirection: 'column', marginLeft: WIDTH(8) },
  viewCenter: { flexDirection: 'row', alignItems: 'center' },
  viewSTT: {
    width: WIDTH(35),
    textAlign: 'center',
    marginRight: WIDTH(12),
  },
  viewMess: {
    height: WIDTH(40),
    width: WIDTH(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(20),
    zIndex: 10,
  },
  list: {
    marginTop: HEIGHT(22),
  },
  name: {
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProMedium,
    lineHeight: getLineHeight(18),
    marginBottom: HEIGHT(2),
  },
  maDinhDanh: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProRegular,
    lineHeight: getLineHeight(15),
  },

  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },

  textTabbar: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.white,
    lineHeight: getLineHeight(18),
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH(343),
    marginHorizontal: WIDTH(16),
    paddingRight: WIDTH(8),
    marginBottom: HEIGHT(29),
  },
  viewTabbar: {
    marginTop: HEIGHT(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH(343),
    marginHorizontal: WIDTH(16),
    backgroundColor: R.colors.redColor,
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(8),
    borderRadius: WIDTH(8),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
  },

  viewInfoGV: {
    // marginVertical: HEIGHT(12),
    paddingTop: HEIGHT(24),
    flexDirection: 'row',
    paddingHorizontal: WIDTH(16),
    // flex: 1,
    backgroundColor: R.colors.white,
  },
  viewAva: {
    width: WIDTH(36),
    height: WIDTH(36),
    borderRadius: WIDTH(36) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: WIDTH(16),
  },
  ava: {
    width: WIDTH(36),
    height: WIDTH(36),
  },
  avaSinhVien: {
    width: WIDTH(36),
    height: WIDTH(36),
  },
  viewInfo: {
    flex: 1,
  },
  detail: {
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  titleInfor: {
    fontSize: getFontSize(16),
    color: R.colors.black0,
    marginBottom: HEIGHT(16),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});

export default styles;
