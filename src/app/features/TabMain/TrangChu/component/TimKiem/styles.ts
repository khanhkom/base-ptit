import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    height: HEIGHT(48),
    marginTop: HEIGHT(-24),
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(20),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  textTK: {
    color: '#ABABAB',
    fontFamily: R.fonts.BeVietnamProLight,
    fontSize: getFontSize(13),
  },
  sreach: {
    marginLeft: WIDTH(12),
    backgroundColor: R.colors.white,
    flex: 1,
    height: HEIGHT(48),
    paddingHorizontal: WIDTH(12),
    alignItems: 'center',
    borderRadius: WIDTH(8),
    flexDirection: 'row',
    ...R.themes.shadowOffset,
  },
  badge: {
    position: 'absolute',
    transform: [{ translateX: 10 }],
  },
  badgeValue: {
    color: R.colors.colorPink,
    fontFamily: R.fonts.BeVietnamProBold,
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(18),
    fontWeight: 'bold',
  },
  viewLogo: {
    width: WIDTH(40),
    height: WIDTH(40),
    borderRadius: WIDTH(40) / 2,
    backgroundColor: R.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInfo: {
    paddingVertical: HEIGHT(8),
    paddingHorizontal: WIDTH(12),
    borderRadius: WIDTH(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.colors.white,
  },
  logo: { width: WIDTH(30), height: WIDTH(30) },
  title: {
    fontFamily: R.fonts.BeVietnamProBold,
    color: R.colors.white,
    fontSize: getFontSize(15),
    lineHeight: getLineHeight(19),
    fontWeight: 'bold',
    marginLeft: WIDTH(16),
    marginRight: WIDTH(12),
  },
  msv: {
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.white,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    fontWeight: 'bold',
    marginLeft: WIDTH(16),
    marginRight: WIDTH(12),
  },
  txtDanhGia: {
    fontSize: getFontSize(15),
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProBold,
    color: R.colors.black0,
    marginRight: WIDTH(8),
  },
  iconSreach: {
    backgroundColor: R.colors.white,
    padding: WIDTH(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WIDTH(8),
    ...R.themes.shadowOffset,
  },
  qrScan: {
    backgroundColor: 'white',
    height: WIDTH(48),
    width: WIDTH(48),
    marginRight: WIDTH(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WIDTH(8),
  },
  search: {
    backgroundColor: R.colors.white,
    // width: WIDTH(284),
    flex: 1,
    height: WIDTH(48),
    paddingRight: WIDTH(12),
    paddingLeft: WIDTH(12),
    alignItems: 'center',
    borderRadius: WIDTH(8),
    flexDirection: 'row',
  },
});

export default styles;
