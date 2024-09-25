import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  giangVien: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
  },
  button: {
    backgroundColor: '#2d88dd',
    width: WIDTH(100),
    alignSelf: 'center',
    marginTop: HEIGHT(12),
  },
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: R.colors.white,
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(8),
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(8),
    borderWidth: 0.5,
    borderColor: '#ABABAB66',
  },
  // dropDown: { alignItems: 'flex-end' },
  placeholderStyle: {
    paddingRight: 0,
    maxWidth: WIDTH(160),
    marginRight: WIDTH(12),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    flex: 0,
  },
  dot: {
    color: R.colors.redColor,
  },
  subContainer: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    alignSelf: 'center',
    paddingTop: HEIGHT(10),
    paddingBottom: HEIGHT(16),
  },
  form: {
    paddingHorizontal: WIDTH(12),
    paddingBottom: HEIGHT(2),
  },
  containerInput: {
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    overflow: 'hidden',
    paddingVertical: HEIGHT(8),
    // borderBottomWidth: 0.5,
    // borderColor: '#ABABAB66',
  },
  label: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
});
