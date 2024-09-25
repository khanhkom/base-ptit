import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import {
  getFontSize,
  getHeight,
  getLineHeight,
  getWidth,
  HEIGHT,
  sizeScale,
  WIDTH,
} from '@common';

const styles = StyleSheet.create({
  viewContent: { flex: 1 },
  viewTabbar: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  viewButton: {
    height: HEIGHT(34),
    paddingHorizontal: WIDTH(12),
    backgroundColor: R.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WIDTH(8),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  container2: {
    justifyContent: 'center',
    height: HEIGHT(66),
  },
  viewType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HEIGHT(20),
  },
  textTitle: {
    color: R.colors.colorBlack,
    fontSize: sizeScale(25),
    fontFamily: R.fonts.BeVietnamProMedium,
    fontWeight: 'bold',
    marginTop: (20 * getHeight()) / 640,
    marginBottom: (10 * getHeight()) / 640,
    paddingLeft: HEIGHT(10),
  },
  type: {
    marginRight: WIDTH(12),
    color: '#013183',
    lineHeight: getLineHeight(22),
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  typeChild: {
    color: 'rgba(45, 45, 45, 1)',
    lineHeight: getLineHeight(22),
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    marginBottom: HEIGHT(20),
  },
  text: {
    fontSize: sizeScale(16),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  line: {
    height: 5,
    width: getWidth(),
    backgroundColor: R.colors.borderD,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  nofileimg: {
    height: HEIGHT(54),
    width: WIDTH(40),
  },
  viewItem: {
    flexDirection: 'row',
    paddingTop: (getHeight() * 10) / 640,
    paddingBottom: (getHeight() * 10) / 640,
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(20),
    borderRadius: 4,
    marginBottom: HEIGHT(10),
    shadowColor: R.colors.blueGrey350,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 3,
    shadowRadius: 2,
    elevation: 3,
  },
  indicatorStyle: {
    height: HEIGHT(2),
    backgroundColor: R.colors.colorPink,
  },
  labelStyle: {
    color: R.colors.blueGrey550,
    fontSize: sizeScale(16),
    lineHeight: getLineHeight(24),
    textAlign: 'center',
  },
  tabBar: {
    backgroundColor: R.colors.white,
  },
  containerNews: {
    flexGrow: 0,
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
    paddingTop: HEIGHT(24),
    backgroundColor: R.colors.white,
  },
  viewKQ: {
    width: WIDTH(343),
    marginBottom: HEIGHT(16),
  },
  textKQ: {
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  flatListNews: {
    backgroundColor: R.colors.white,
  },
});

export default styles;
