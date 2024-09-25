import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: { textAlign: 'right' },
  contentContainerStyle: {
    paddingBottom: HEIGHT(30),
  },
  viewDroplist: {
    width: WIDTH(342),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    alignSelf: 'center',
    marginTop: HEIGHT(24),
    padding: WIDTH(16),
  },
  line: {
    width: WIDTH(308),
    height: 1,
    backgroundColor: R.colors.borderC,
    alignSelf: 'center',
    marginVertical: HEIGHT(16),
  },
  dropList: { width: WIDTH(200), alignSelf: 'flex-end' },
  viewLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
});

export default styles;
