import { Platform, StyleSheet } from 'react-native';

import R from '@assets/R';
import { getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  viewSwiper: {
    width: getWidth(),
    backgroundColor: R.colors.white,
    shadowRadius: WIDTH(8),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: R.colors.colorRgba200220250,
    shadowOpacity: 0.6,
    elevation: 2,
    paddingTop: HEIGHT(14),
  },
  listContainer: {
    marginTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    paddingBottom: Platform.OS === 'ios' ? HEIGHT(90) : HEIGHT(80),
  },
  oneItem: {
    marginTop: HEIGHT(16),
    alignSelf: 'center',
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    shadowRadius: WIDTH(12),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: R.colors.colorRgba151173205,
    shadowOpacity: 0.6,
    elevation: 2,
    alignItems: 'center',
  },
  center: { alignItems: 'center' },
  listFunction: {
    marginTop: HEIGHT(24),
    width: WIDTH(343),
    flexGrow: 0,
    alignSelf: 'center',
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    shadowRadius: WIDTH(12),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: R.colors.colorRgba151173205,
    shadowOpacity: 0.6,
    elevation: 2,
  },
  flatListItem: {
    marginTop: HEIGHT(24),
  },
  img: {
    width: WIDTH(32),
    height: WIDTH(32),
    borderRadius: WIDTH(32),
  },
  imgView: {
    width: WIDTH(36),
    height: WIDTH(36),
    borderRadius: WIDTH(36),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.white,
  },
  contentContainerStyle: {
    paddingBottom: Platform.OS === 'ios' ? HEIGHT(90) : HEIGHT(80),
  },
});

export default styles;
