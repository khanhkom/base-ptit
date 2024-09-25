import { StyleSheet } from 'react-native';

// config
import { HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: HEIGHT(30),
    paddingTop: HEIGHT(24),
    width: WIDTH(343),
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  qrScan: {
    backgroundColor: 'white',
    height: WIDTH(32),
    width: WIDTH(32),
    // marginRight: WIDTH(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WIDTH(4),
  },
});

export default styles;
