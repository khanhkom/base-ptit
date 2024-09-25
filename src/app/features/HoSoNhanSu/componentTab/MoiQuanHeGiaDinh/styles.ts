import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
// import { getFont, WIDTH, HEIGHT, getWidth, getHeight } from '../../config/Function';

const styles = StyleSheet.create({
  itemtrong: {
    marginBottom: HEIGHT(20),
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
  viewLabel: {
    // height: HEIGHT(34),
    paddingVertical: HEIGHT(4),
    justifyContent: 'center',
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(8),
  },
  boxChiTiet: {
    marginTop: HEIGHT(20),
  },
  textLabel: {
    color: R.colors.grayText,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
  },
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: HEIGHT(20),
  },
  container: {
    paddingBottom: HEIGHT(30),
  },
  textDiem: {
    textAlign: 'center',
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
  },
  tenChucNang: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    color: R.colors.colorMain,
  },
  containerExpand: {
    paddingVertical: HEIGHT(16),
    paddingHorizontal: WIDTH(16),
    width: WIDTH(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: R.colors.white,
  },
  img: {
    height: HEIGHT(100),
    width: WIDTH(80),
    alignSelf: 'center',
    marginBottom: HEIGHT(24),
    backgroundColor: R.colors.white,
  },
  viewTen: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconChucNang: {
    height: WIDTH(24),
    width: WIDTH(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: { color: R.colors.redColor },
  contentBox2: {
    paddingHorizontal: WIDTH(16),
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    alignSelf: 'center',
  },
  contentBox: {
    overflow: 'hidden',
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    alignSelf: 'center',
    marginBottom: HEIGHT(20),
  },
});

export default styles;
