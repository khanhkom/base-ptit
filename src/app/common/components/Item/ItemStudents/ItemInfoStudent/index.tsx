import React from 'react';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { HEIGHT, showImage, WIDTH } from '@config/function';
import { HStack, Pressable, Text, VStack } from 'native-base';
interface Props {
  hoVaTen?: string;
  maSinhVien?: string;
  url?: string;
  indexVisible?: boolean;
  index?: number;
}
const ItemInfoStudents = (props: Props) => {
  const { hoVaTen, maSinhVien, url, indexVisible = false, index } = props;

  const source = url ? { uri: url } : R.images.logoApp;

  return (
    <HStack flex={1} alignItems="center">
      <Pressable
        width={WIDTH(indexVisible ? 32 : 48)}
        height={WIDTH(indexVisible ? 32 : 48)}
        rounded="full"
        mr="4"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        backgroundColor={'primary.500'}
        onPress={() =>
          showImage([
            {
              source,
              title: hoVaTen || '--',
            },
          ])
        }
        _pressed={R.themes.pressed}>
        {indexVisible ? (
          <Text
            color={'white'}
            fontSize="sm"
            fontFamily={R.fonts.BeVietnamProMedium}>
            {(index || 0) + 1}
          </Text>
        ) : (
          <FastImage
            source={source}
            resizeMode="cover"
            style={{ width: WIDTH(50), height: WIDTH(50) }}
          />
        )}
      </Pressable>

      <VStack flex={1} justifyContent={'center'}>
        <Text
          flex={1}
          fontSize="sm"
          fontFamily={R.fonts.BeVietnamProMedium}
          numberOfLines={1}>
          {hoVaTen || '--'}
        </Text>
        <Text
          flex={1}
          color={'gray.500'}
          mt={HEIGHT(2)}
          fontSize="xs"
          fontFamily={R.fonts.BeVietnamProRegular}>
          {maSinhVien || '--'}
        </Text>
      </VStack>
    </HStack>
  );
};

export default ItemInfoStudents;
