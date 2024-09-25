import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { getWidth, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { Text } from 'native-base';
interface Props {
  label: string;
  onPress?: () => void;
}
const ItemTextBlue = (props: Props) => {
  const { label, onPress } = props;

  return (
    <View style={[styles.containerTextBlur]}>
      <Text
        fontSize={'sm'}
        fontFamily={R.fonts.BeVietnamProSemiBold}
        color="black">
        {label}
      </Text>
      {onPress && (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={styles.hitSlop}
          onPress={onPress}>
          <ItemIconSVG title="arrowright" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ItemTextBlue;

const styles = StyleSheet.create({
  hitSlop: {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  },
  containerTextBlur: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: getWidth(),
    paddingHorizontal: WIDTH(16),
  },
});
