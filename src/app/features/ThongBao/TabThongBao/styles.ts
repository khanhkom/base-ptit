import { StyleSheet } from 'react-native';

import { getFontSize, getLineHeight, HEIGHT } from '@common';

import R from '../../../assets/R';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  contentContainerStyle: { paddingTop: HEIGHT(24) },
  loadMore: {
    height: HEIGHT(30),
  },
  viewEmpty: { height: HEIGHT(30) },
  textEmpty: {
    fontFamily: R.fonts.BeVietnamProThin,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(20),
    alignSelf: 'center',
    marginTop: HEIGHT(30),
  },
});

export default styles;
