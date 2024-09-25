import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(100),
  },
  img: {
    height: HEIGHT(100),
    width: WIDTH(80),
    alignSelf: 'center',
    marginBottom: HEIGHT(24),
    backgroundColor: R.colors.white,
  },
  viewInfo: {
    marginBottom: HEIGHT(20),
  },
  form: {
    borderRadius: 0,
  },
  formTable: {
    backgroundColor: R.colors.transparent,
    borderRadius: 0,
  },
  viewTable: {
    marginTop: 0,
  },
  contentBox: {
    overflow: 'hidden',
    backgroundColor: '#f3f3f3',
    paddingHorizontal: WIDTH(0),
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    alignSelf: 'center',
    marginBottom: HEIGHT(20),
  },
});

export default styles;
