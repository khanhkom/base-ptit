import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import styles from './styles';
interface Props {
  title: string | undefined;
  color: string;
  backgroundColor: string;
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
}
const ItemTag = (props: Props) => {
  const { title, color, backgroundColor, style, visible = true } = props;

  if (visible) {
    return (
      <View style={[styles.container, { backgroundColor }, style]}>
        <Text style={[styles.text, { color }]}>{title}</Text>
      </View>
    );
  }

  return <></>;
};

export default ItemTag;
