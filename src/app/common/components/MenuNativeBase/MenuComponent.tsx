/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import R from '@assets/R';
import { WIDTH } from '@config/function';
import { Box, Menu, Pressable, useTheme } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MenuItemComponent from './MenuItem';
interface Props {
  listFunction: { title: string; onPress?: () => void; isDisabled?: boolean }[];
}
const MenuComponent = (props: Props) => {
  const { listFunction } = props;

  const theme = useTheme();

  return (
    <Box w="90%" alignItems="center">
      <Menu
        minW="190"
        trigger={triggerProps => {
          return (
            <Pressable
              _pressed={R.themes.pressed}
              hitSlop={R.themes.hitSlop}
              {...triggerProps}>
              <AntDesign
                name={
                  triggerProps?.['aria-expanded'] ? 'menufold' : 'menuunfold'
                }
                size={WIDTH(16)}
                color={theme.colors.white}
              />
            </Pressable>
          );
        }}>
        {listFunction?.map((item, index) => {
          return (
            <MenuItemComponent
              key={index}
              onPress={item?.onPress}
              title={item?.title}
              isDisabled={item?.isDisabled}
            />
          );
        })}
      </Menu>
    </Box>
  );
};

export default MenuComponent;
