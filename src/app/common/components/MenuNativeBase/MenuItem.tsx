import React from 'react';

import R from '@assets/R';
import { WIDTH } from '@config/function';
import ItemIconSVG from '@libcomponents/icon-svg';
import { Menu, Text, useTheme } from 'native-base';
interface Props {
  title: string;
  onPress?: () => void;
  isDisabled?: boolean;
}
const MenuItemComponent = (props: Props) => {
  const { title, onPress, isDisabled } = props;

  const theme = useTheme();

  return (
    <Menu.Item isDisabled={isDisabled} onPress={onPress}>
      <ItemIconSVG
        title={title}
        color={isDisabled ? theme.colors.gray[400] : theme.colors.black}
        width={WIDTH(24)}
        height={WIDTH(24)}
      />
      <Text
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'xs'}
        color={isDisabled ? 'gray.400' : 'black'}>
        {title}
      </Text>
    </Menu.Item>
  );
};

export default MenuItemComponent;
