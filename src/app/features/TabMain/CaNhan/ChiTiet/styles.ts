import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  contentContainer: { paddingBottom: HEIGHT(30), paddingTop: HEIGHT(24) },
  textEdit: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.blueLight,
  },
  form: { marginVertical: HEIGHT(24) },
  textSave: {
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
  },
  viewTK: {
    width: WIDTH(343),
    alignSelf: 'center',
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    marginTop: HEIGHT(24),
  },
  viewEditAva: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    backgroundColor: '#D9D9D9',
    width: WIDTH(100),
    paddingVertical: HEIGHT(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ava: { height: WIDTH(100), width: WIDTH(100) },
  viewAva: {
    borderWidth: 1,
    borderColor: R.colors.redColor,
    height: WIDTH(100),
    width: WIDTH(100),
    borderRadius: WIDTH(50),
    overflow: 'hidden',
  },
  button: {
    height: HEIGHT(40),
    width: WIDTH(140),
    marginTop: HEIGHT(18),
  },
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  viewHeader: {
    width: getWidth(),
    backgroundColor: R.colors.white,
    paddingTop: HEIGHT(12),
    paddingBottom: HEIGHT(16),
    alignItems: 'center',
  },
});

export default styles;
