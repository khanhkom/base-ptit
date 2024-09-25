import { StyleSheet } from 'react-native';

import { HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  containerNews: {
    flexGrow: 0,
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
    paddingTop: HEIGHT(24),
    alignItems: 'center',
  },
});

export default styles;
