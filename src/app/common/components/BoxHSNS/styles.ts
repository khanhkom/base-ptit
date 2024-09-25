import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@config/function';

const styles = StyleSheet.create({
  container: {
    width: WIDTH(343),
    alignSelf: 'center',
    marginBottom: HEIGHT(12),
  },
  viewTitle: { flexDirection: 'row', alignItems: 'center' },
  gap: {
    height: 1,
    width: WIDTH(12),
    backgroundColor: R.colors.colorMain,
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HEIGHT(8),
  },
  textTitle: {
    maxWidth: WIDTH(270),
    fontSize: getFontSize(15),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    marginLeft: WIDTH(10),
    color: R.colors.colorMain,
  },
});

export default styles;
