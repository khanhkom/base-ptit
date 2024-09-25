import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    paddingVertical: HEIGHT(12),
  },
  dot: {
    backgroundColor: R.colors.white,
    borderColor: R.colors.grayText,
    borderWidth: WIDTH(1),
    top: 20,
  },
  styleActiveDot: {
    backgroundColor: R.colors.white,
    borderColor: R.colors.primaryColor,
    borderWidth: WIDTH(1),
    top: 20,
  },
  trong: { marginTop: 0 },
  viewSwiper: {
    width: getWidth(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    position: 'relative',
    height: HEIGHT(100),
  },
  swiper: {
    marginTop: HEIGHT(20),
    width: getWidth(),
    justifyContent: 'center',
  },
});

export default styles;
