import { StyleSheet } from 'react-native';

import R from '@assets/R';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.white,
  },

  content: {
    flex: 1,
    zIndex: 10,
  },
  tabbar: {
    backgroundColor: R.colors.white,
    ...R.themes.shadowOffset,
  },
});

export default styles;
