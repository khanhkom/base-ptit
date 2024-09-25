import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize } from '@config/function';
import { translate } from '@utils/i18n/translate';
import { Pressable, Text } from 'native-base';

const BtnXoa = props => {
  const { onPress } = props;

  return (
    <Pressable onPress={onPress}>
      <Text style={styles.title}>{translate('slink:Delete')}</Text>
    </Pressable>
  );
};

export default BtnXoa;

const styles = StyleSheet.create({
  title: {
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(12),
  },
});
