import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

export const styles = StyleSheet.create({
  label: {
    marginRight: WIDTH(16),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },

  dot: {
    color: R.colors.redColor,
  },
  viewInput: {
    // flex: 1,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: WIDTH(8),
    borderColor: '#ABABAB66',
    marginTop: HEIGHT(8),
    // paddingVertical: HEIGHT(12),
    // paddingHorizontal: WIDTH(8),
  },
  input: {
    // flex: 1,
    color: '#000',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    // borderRadius: WIDTH(8),
    // borderWidth: 0.5,
    // borderColor: '#ABABAB66',
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(8),
    // marginTop: HEIGHT(8),
  },
  inputDisabled: {
    flex: 1,
    color: R.colors.grayText,
    borderBottomColor: 'transparent',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    textAlign: 'right',
    width: '100%',
  },
  containerInput: {
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    overflow: 'hidden',
    paddingVertical: HEIGHT(8),
  },
  lineStatus: {
    height: 1,
    width: '10%',
    position: 'absolute',
    bottom: 0,
  },
  multiline: {
    minHeight: 100,
    textAlign: 'left',
    textAlignVertical: 'top',
    width: '100%',
    // backgroundColor: R.colors.red,
    // paddingVertical: HEIGHT(12),
    // paddingHorizontal: WIDTH(8),
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
