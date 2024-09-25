import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  viewTabbar: {
    borderRadius: WIDTH(8),
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  contentContainer: {
    height: HEIGHT(42),
    paddingVertical: HEIGHT(4),
    paddingHorizontal: WIDTH(4),
  },
  viewButton: {
    height: HEIGHT(34),
    width: WIDTH(161),
    backgroundColor: R.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WIDTH(8),
  },
  container: {
    marginTop: HEIGHT(24),
    marginBottom: HEIGHT(20),
    height: HEIGHT(42),
    paddingHorizontal: WIDTH(16),
    justifyContent: 'center',
  },
});

export default styles;
