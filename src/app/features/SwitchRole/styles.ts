import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getHeight, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewImg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.white,
    paddingTop: HEIGHT(40),
  },
  viewPopup: {
    position: 'absolute',
    bottom: 0,
    width: getWidth(),
  },
  img: { width: WIDTH(343), height: HEIGHT(200) },
  ten: {
    color: R.colors.black0,
    fontSize: getFontSize(18),
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
  list: {
    marginTop: HEIGHT(100),
  },
  info: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(10),
    paddingBottom: HEIGHT(110),
  },
  viewADD: {
    height: WIDTH(60),
    width: WIDTH(60),
    borderRadius: WIDTH(50),
    marginBottom: HEIGHT(16),
  },
  viewIcon: {
    padding: HEIGHT(8),
    backgroundColor: R.colors.primaryColor,
    borderRadius: WIDTH(8),
    marginRight: WIDTH(16),
  },
  viewTitle: { flexDirection: 'row', alignItems: 'center' },
  iconChucNang: {
    height: WIDTH(24),
    width: WIDTH(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItem: {
    paddingVertical: HEIGHT(16),
    paddingHorizontal: WIDTH(16),
    marginBottom: HEIGHT(16),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...R.themes.shadow,
  },
  textTitle: {
    fontSize: getFontSize(18),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.primaryColor,
  },
});

export default styles;
