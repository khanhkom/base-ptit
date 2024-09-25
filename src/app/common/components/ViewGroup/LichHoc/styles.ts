import { Platform, StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getFontSize, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    paddingVertical: HEIGHT(12),
  },
  dot: {
    backgroundColor: R.colors.white,
    borderColor: R.colors.colorBFC9DD,
    borderWidth: WIDTH(1),
    top: 20,
  },
  styleActiveDot: {
    backgroundColor: R.colors.white,
    borderColor: R.colors.redC81,
    borderWidth: WIDTH(1),
    top: 20,
  },
  viewSwiper: {
    width: getWidth(),
    paddingHorizontal: WIDTH(16),
    justifyContent: 'space-between',
    marginTop: HEIGHT(12),
    flexDirection: 'row',
  },
  loading: {
    position: 'relative',
    height: HEIGHT(100),
  },
  swiper: {
    height: HEIGHT(180),
    width: getWidth(),
    justifyContent: 'center',
  },
});

export default styles;
