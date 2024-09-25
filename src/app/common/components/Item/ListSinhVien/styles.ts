import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingTop: HEIGHT(22) },
  viewTabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH(343),
    marginHorizontal: WIDTH(16),
    backgroundColor: R.colors.colorPink,
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
  textTabbar: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.white,
    lineHeight: getLineHeight(18),
  },
  avaSinhVien: {
    width: WIDTH(36),
    height: WIDTH(36),
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
  list: {
    backgroundColor: R.colors.backgroundColorNew,
    flex: 1,

    // marginTop: HEIGHT(22),
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
  viewTTSV: {
    flexDirection: 'column',
    marginLeft: WIDTH(8),
    width: WIDTH(200),
  },
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
});

export default styles;
