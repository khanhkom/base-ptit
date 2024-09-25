/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';

import styles from './styles';

const ItemTextBlueNew = (props: any) => {
  const { label, extend, color, onPress, notiNum } = props;

  const backgroundColor = color ? color : R.colors.backgroundColorNew;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.label}>{label}</Text>
        {notiNum === 0 ? <></> : <Text style={styles.number}>{notiNum}</Text>}
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        hitSlop={styles.hitSlop}
        onPress={onPress && onPress}>
        <Text style={styles.extend}>{extend}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemTextBlueNew;
