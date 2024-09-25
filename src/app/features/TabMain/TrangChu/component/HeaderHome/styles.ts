import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getFontSize, getLineHeight, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    width: getWidth(),
    height: HEIGHT(150),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: R.colors.colorPink,
    paddingHorizontal: WIDTH(16),
    alignItems: 'center',
  },
  img: { height: WIDTH(24), width: WIDTH(24) },
  badge: {
    position: 'absolute',
    top: -HEIGHT(5),
    transform: [{ translateX: 10 }],
  },
  badgeValue: {
    color: R.colors.colorPink,
    fontFamily: R.fonts.BeVietnamProBold,
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontWeight: 'bold',
  },
  imgAVA: {
    width: WIDTH(48),
    height: WIDTH(48),
  },
  viewLogo: {
    width: WIDTH(48),
    height: WIDTH(48),
    borderRadius: WIDTH(48) / 2,
    backgroundColor: R.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  viewInfo: { justifyContent: 'center', marginLeft: WIDTH(16) },
  logo: { width: WIDTH(30), height: WIDTH(30) },
  title: {
    fontFamily: R.fonts.BeVietnamProBold,
    color: R.colors.white,
    fontSize: getFontSize(15),
    lineHeight: getLineHeight(19),
    fontWeight: 'bold',
    maxWidth: WIDTH(230),
    marginRight: WIDTH(12),
    paddingVertical: HEIGHT(4),
  },
  msv: {
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.white,
    fontSize: getFontSize(13),
    lineHeight: getLineHeight(24),
    maxWidth: WIDTH(230),
    marginRight: WIDTH(12),
  },
  txtDanhGia: {
    fontSize: getFontSize(15),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProBold,
    color: R.colors.black0,
    marginRight: WIDTH(8),
  },
  iconBell: {
    marginLeft: WIDTH(12),
  },
  styleCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewScore: {
    backgroundColor: R.colors.white,
    marginTop: HEIGHT(4),
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WIDTH(12),
    width: WIDTH(48),
  },
  scoreChinh: {
    color: R.colors.primaryColor,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(12),
  },
  score: {
    color: '#ABABAB',
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});

export default styles;
