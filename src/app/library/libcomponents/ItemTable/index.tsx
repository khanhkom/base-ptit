/* eslint-disable @typescript-eslint/no-shadow */
import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import R from '@assets/R';
import { showLink } from '@common';
import { IPressableProps, Pressable, Text } from 'native-base';

import styles from './styles';
interface Props extends IPressableProps {
  style?: ViewStyle;
  textStyle?: StyleProp<TextStyle> | undefined;
  link?: string;
  disabled?: boolean;
  content: string | number | ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  loading?: boolean;
}
const ItemInfor = (props: Props) => {
  const {
    onPress,
    content,
    onLongPress,
    disabled,
    style,
    link,
    textStyle,
    ...rest
  } = props;

  const onTouch = () => {
    if (link) {
      handleSeeDocument(link);
    } else {
      onPress && onPress();
    }
  };

  const handleSeeDocument = (link: string) => {
    showLink(link);
  };

  return (
    <Pressable
      _pressed={R.themes.pressed}
      hitSlop={R.themes.hitSlop}
      disabled={disabled}
      flex={1}
      alignItems="center"
      justifyContent="center"
      style={style}
      onLongPress={onLongPress}
      onPress={onTouch}
      {...rest}>
      <Text
        textAlign="center"
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProMedium}
        color="black"
        style={[!!link && styles.textLink, textStyle]}>
        {content}
      </Text>
    </Pressable>
  );
};

export default ItemInfor;
