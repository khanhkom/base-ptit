import React, { ReactNode } from 'react';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import SlideAnimatedItem from '@components/SlideAnmatedItem';
import { HEIGHT, showImage, WIDTH } from '@config/function';
import { Box, HStack, Pressable, Text, VStack } from 'native-base';

import ItemInfoStudents from './ItemInfoStudent';
interface Props {
  hoVaTen?: string;
  maSinhVien?: string;
  url?: string;
  onPress?: () => void;
  children?: ReactNode;
}
const ItemStudents = (props: Props) => {
  const { onPress, children } = props;

  return (
    <Pressable
      onPress={onPress}
      _pressed={R.themes.pressed}
      flexDirection="row"
      mb={'4'}>
      <ItemInfoStudents {...props} />
      {children}
    </Pressable>
  );
};

export default ItemStudents;
