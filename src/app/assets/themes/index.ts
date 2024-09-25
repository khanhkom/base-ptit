import colors from '@assets/colors/colors';

const themes = {
  shadow: {
    shadowColor: colors.black0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 1.84,
  },
  shadowGray: {
    shadowColor: colors.black0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  hitSlop: {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  },
  shadowOffset: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 1,
  },
  pressed: { opacity: 0.6 },
};

export default themes;
