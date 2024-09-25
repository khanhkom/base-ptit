/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
  ETrangThaiTT,
  formatVND,
  getStatusPaymentColorByValue,
  HEIGHT,
  TrangThaiTT,
  WIDTH,
} from '@common';
import TextChuaCapNhat from '@components/Item/TextChuaCapNhat';
import { translate } from '@utils/i18n/translate';
import { Badge, Pressable, Text } from 'native-base';

import R from '../../../assets/R';
import { CongNoProps } from '../type';

const ItemListCongNo = (props: { item: CongNoProps; onNavigate?: any }) => {
  const { item, onNavigate } = props;

  const name = item?.dotThu?.tenDot || item?.name;

  return (
    <Pressable
      alignSelf="center"
      onPress={onNavigate}
      paddingY={HEIGHT(12)}
      _pressed={R.themes.pressed}
      paddingX={WIDTH(16)}
      width={WIDTH(343)}
      backgroundColor="white"
      marginBottom={HEIGHT(12)}
      style={R.themes.shadowOffset}
      borderRadius={WIDTH(8)}>
      <ViewStatus trangThai={item?.status} />
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        {name ? name : <TextChuaCapNhat />}
      </Text>
      <Text
        mt="2"
        fontSize="xs"
        color="gray.500"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {translate('slink:Has_paid')}: {formatVND(item?.soTienDaThu || 0)}
      </Text>
      <Text
        fontSize="xs"
        mt="1"
        color="gray.500"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {translate('slink:Remain')}:{' '}
        <Text color={'primary.500'}>{formatVND(item?.soTienConLai || 0)}</Text>
      </Text>
    </Pressable>
  );
};

export default ItemListCongNo;
const ViewStatus = ({ trangThai }: { trangThai: ETrangThaiTT }) => {
  return (
    <Badge
      alignSelf={'flex-start'}
      marginBottom={HEIGHT(12)}
      colorScheme={getStatusPaymentColorByValue(TrangThaiTT?.[trangThai])}>
      {TrangThaiTT?.[trangThai]}
    </Badge>
  );
};
