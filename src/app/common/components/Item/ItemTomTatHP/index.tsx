import React from 'react';

import R from '@assets/R';
import {
  decodeHtmlEntities,
  HEIGHT,
  removeHtmlTags,
  WIDTH,
} from '@config/function';
import { TomTatHocPhanProps } from '@features/LopTinChi/component/DeCuongHocPhan/component/TomTatHocPhan/type';
import { translate } from '@utils/i18n/translate';
import { HStack, Pressable, Text, VStack } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import BadgeCustome from '../Badge';

interface Props {
  item: TomTatHocPhanProps;
  index: number;
  onDetail: () => void;
}
const ItemTomTatHP = (props: Props) => {
  const { item, index, onDetail } = props;

  const decodedText = decodeHtmlEntities(item?.ten);

  const cleanText = removeHtmlTags(decodedText);

  return (
    <Pressable
      _pressed={R.themes.pressed}
      backgroundColor={'white'}
      w={WIDTH(164)}
      px={WIDTH(14)}
      py={HEIGHT(16)}
      mb={HEIGHT(16)}
      borderRadius={WIDTH(8)}
      onPress={onDetail}
      justifyContent={'space-between'}
      style={R.themes.shadowOffset}>
      <VStack>
        <BadgeCustome value={`${index + 1}`} />
        <Text
          numberOfLines={4}
          fontFamily={R.fonts.BeVietnamProSemiBold}
          fontSize={'md'}
          color="black">
          {cleanText}
        </Text>
      </VStack>
      <ViewTep />
    </Pressable>
  );
};

export default ItemTomTatHP;
const ViewTep = () => {
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems="center"
      mt={HEIGHT(20)}
      paddingTop={HEIGHT(20)}
      borderTopWidth={1}
      borderColor={'gray.200'}>
      <Text
        color="rgba(0, 132, 255, 1)"
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={'xs'}
        textDecorationLine="underline">
        {translate('slink:See_details')}
      </Text>
      <AntDesign
        size={WIDTH(12)}
        name={'arrowright'}
        color={'rgba(0, 132, 255, 1)'}
      />
    </HStack>
  );
};
