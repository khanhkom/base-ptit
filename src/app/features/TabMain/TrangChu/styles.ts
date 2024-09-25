import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getFontSize, getWidth, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  columnWrapperStyle: { justifyContent: 'flex-start' },
  listDefault: {
    marginLeft: WIDTH(11.5),
    width: getWidth(),
    flexGrow: 0,
    marginBottom: HEIGHT(17),
  },
  contentInset: {
    top: HEIGHT(44),
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainerStyle: {
    backgroundColor: R.colors.backgroundColorNew,
    paddingBottom: HEIGHT(115),
  },
  viewItemChucNang: {
    flex: 1,
    alignItems: 'center',
  },
  normalText: {
    fontSize: getFontSize(15),
    color: R.colors.black9,
  },
  wrapSearch: {
    height: HEIGHT(45),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: WIDTH(340),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    paddingHorizontal: WIDTH(12),
    marginBottom: HEIGHT(12),
  },
});

export default styles;
