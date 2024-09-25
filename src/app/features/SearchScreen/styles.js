import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  iconChucNang: {
    height: WIDTH(24),
    width: WIDTH(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: R.colors.white,
    marginVertical: HEIGHT(16),
    borderRadius: WIDTH(8),
  },
  contentContainerStyle: {
    paddingBottom: HEIGHT(20),
    paddingTop: HEIGHT(24),
  },
  itemChucNang: { width: WIDTH(343), alignSelf: 'center' },
  viewItem: {
    flexDirection: 'row',
    paddingVertical: HEIGHT(16),
    paddingHorizontal: WIDTH(16),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(12),
    alignItems: 'center',
    width: WIDTH(343),
    alignSelf: 'center',
  },
  viewTextLeft: {
    marginLeft: WIDTH(16),
    marginRight: WIDTH(8),
    flex: 1,
  },
  textNameFolder: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    color: R.colors.black0,
  },
  textNote: {
    marginTop: HEIGHT(4),
    color: R.colors.gray48,
    fontSize: getFontSize(14),
  },
});

export default styles;
