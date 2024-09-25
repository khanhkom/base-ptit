import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  viewText: { flex: 1, marginLeft: WIDTH(16) },
  tenChucNang: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    color: R.colors.black0,
  },

  containerButton: {
    marginBottom: HEIGHT(12),
    backgroundColor: R.colors.white,
    paddingVertical: HEIGHT(16),
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...R.themes.shadowOffset,
  },
  iconChucNang: {
    height: WIDTH(24),
    width: WIDTH(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
