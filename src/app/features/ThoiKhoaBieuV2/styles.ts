import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  viewLoc: { flexDirection: 'row', alignItems: 'center' },
  content: { flex: 1 },
  button: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(52),
    position: 'absolute',
    bottom: HEIGHT(100),
    right: WIDTH(16),
    height: WIDTH(52),
    backgroundColor: R.colors.primaryColor,
    borderRadius: 100,
  },
  textLoc: {
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    color: R.colors.white,
    marginLeft: WIDTH(8),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 8,
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  calendar: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default styles;
