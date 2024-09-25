import { HEIGHT, WIDTH } from '@common';
import { Box, HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { HocPhanProps } from '../type';
import R from '@assets/R';
import Icon from 'react-native-vector-icons/Entypo';
import { translate } from '@utils/i18n/translate';

interface Props {
  data: HocPhanProps;
  onPress: () => void;
  isHas: boolean;
  index: number;
}
const ItemHocPhan = (props: Props) => {
  const { data, onPress, isHas, index } = props;
  const backgroundColor = isHas ? 'gray.200' : undefined;
  return (
    <Pressable
      onPress={onPress}
      backgroundColor={backgroundColor}
      py="2"
      px={WIDTH(16)}
      flexDir={'row'}
      alignItems="center"
      _pressed={R.themes.pressed}>
      <HStack alignItems={'center'} flex={1}>
        <Box
          width={WIDTH(32)}
          height={WIDTH(32)}
          rounded="full"
          mr="4"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          backgroundColor={'primary.500'}>
          <Text
            color={'white'}
            fontSize="sm"
            fontFamily={R.fonts.BeVietnamProMedium}>
            {(index || 0) + 1}
          </Text>
        </Box>
        <VStack flex={1} justifyContent={'center'}>
          <Text flex={1} fontSize="sm" fontFamily={R.fonts.BeVietnamProMedium}>
            {data?.ten || '--'}
            <Text color={'gray.500'} fontFamily={R.fonts.BeVietnamProRegular}>
              {` (${data?.ma || '--'})`}
            </Text>
          </Text>
          <Text
            flex={1}
            color={'gray.500'}
            mt={HEIGHT(2)}
            fontSize="xs"
            fontFamily={R.fonts.BeVietnamProRegular}>
            {`${translate('slink:Number_of_credits')}: ${
              data?.soTinChi || '--'
            }`}
          </Text>
        </VStack>
      </HStack>
      <Box
        height={WIDTH(24)}
        width={WIDTH(24)}
        justifyContent="center"
        alignItems="center">
        <Icon name="chevron-right" size={WIDTH(24)} color={'#848A95'} />
      </Box>
    </Pressable>
  );
};

export default ItemHocPhan;
