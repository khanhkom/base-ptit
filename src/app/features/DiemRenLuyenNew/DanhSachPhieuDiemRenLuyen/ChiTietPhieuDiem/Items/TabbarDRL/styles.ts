import { StyleSheet } from 'react-native';

import { HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  dotHighLight: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'red',
  },
  lineCut: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
  },
  viewLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH(343 / 3),
    height: 20,
    justifyContent: 'space-between',
  },
  viewTabbar: {},
  line: { height: 1, width: WIDTH(45) },
  contentContainer: {
    alignItems: 'center',
  },
  viewButton: {
    width: WIDTH(343 / 3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(171, 171, 171, 0.4)',
    marginTop: HEIGHT(24),
    paddingBottom: HEIGHT(24),
    width: WIDTH(343),
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;
