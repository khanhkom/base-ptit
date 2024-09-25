import React from 'react';

import R from '@assets/R';
import { WIDTH } from '@config/function';
import { Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
interface ButtonAddProps {
  visible?: boolean;
  onAdd?: () => void;
  error?: boolean;
}
const ButtonAdd = (props: ButtonAddProps) => {
  const { visible = true, onAdd, error } = props;

  const color = error ? R.colors.redColor : R.colors.blue500;

  if (visible) {
    return (
      <Pressable
        hitSlop={R.themes.hitSlop}
        onPress={onAdd}
        marginLeft={WIDTH(16)}
        _pressed={R.themes.pressed}>
        <Icon name="plus" size={WIDTH(24)} color={color} />
      </Pressable>
    );
  }

  return null;
};

export default ButtonAdd;
