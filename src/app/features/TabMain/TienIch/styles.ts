import { Platform, StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  shadow: {
    elevation: 2,
    shadowRadius: WIDTH(12),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: R.colors.colorRgba151173205,
    shadowOpacity: 0.6,
  },
  listContainer: {
    marginTop: HEIGHT(24),
    paddingHorizontal: WIDTH(16),
    paddingBottom: Platform.OS === 'ios' ? HEIGHT(90) : HEIGHT(80),
  },
  special: {
    alignSelf: 'center',
    marginVertical: HEIGHT(16),
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    paddingBottom: Platform.OS === 'ios' ? HEIGHT(90) : HEIGHT(80),
  },
});

export default styles;
