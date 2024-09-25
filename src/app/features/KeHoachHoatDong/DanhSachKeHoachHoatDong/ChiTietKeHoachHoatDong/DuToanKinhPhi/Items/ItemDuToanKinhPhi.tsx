/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { formatVND, HEIGHT, WIDTH } from '@common';
import { Pressable, Text } from 'native-base';

const ItemDuToanKinhPhi = (props: any) => {
  const { item, onPress, index } = props;

  return (
    <Pressable
      onPress={onPress}
      alignSelf="center"
      paddingY={HEIGHT(12)}
      _pressed={R.themes.pressed}
      paddingX={WIDTH(16)}
      width={WIDTH(343)}
      backgroundColor="white"
      marginBottom={HEIGHT(12)}
      style={R.themes.shadowOffset}
      // disabled
      borderRadius={WIDTH(8)}>
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        {index + 1}. {item?.hoatDong || ''}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Số lượng: ${item?.soLuong || ''}`}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Định mức: ${item?.dinhMuc ? formatVND(item?.dinhMuc) : ''}`}
      </Text>
    </Pressable>
  );
};

export default ItemDuToanKinhPhi;
