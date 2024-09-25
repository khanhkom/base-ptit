import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';

const styles = StyleSheet.create({
  itemGV: {
    marginTop: HEIGHT(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tinChi: {
    textAlign: 'center',
    marginTop: HEIGHT(4),
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.grayText,
  },
  viewInfoHeader: { justifyContent: 'space-between', flexDirection: 'column' },
  viewMess: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  line: {
    alignSelf: 'center',
    width: WIDTH(160),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginVertical: HEIGHT(16),
  },
  value: {
    fontWeight: 'normal',
    marginLeft: WIDTH(12),
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  viewLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tenSK: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    textAlign: 'center',
  },
  viewInfo: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(16),
    paddingTop: HEIGHT(24),
    ...R.themes.shadowOffset,
  },
});

export default styles;
