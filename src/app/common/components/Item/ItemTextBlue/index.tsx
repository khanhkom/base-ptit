/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';

import styles from './styles';

const ItemTextBlue = (props: any) => {
  const { label, extend, color, onPress } = props;

  const backgroundColor = color ? color : R.colors.backgroundColorNew;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        hitSlop={styles.hitSlop}
        onPress={onPress && onPress}>
        <Text style={styles.extend}>{extend}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemTextBlue;
