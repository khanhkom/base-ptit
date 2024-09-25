import React from 'react';
import R from '@assets/R';
import { WIDTH } from '@common';
import moment from 'moment';
import { Box, HStack, Text, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import { ThoiKhoaBieuListProps } from '../type';

interface Props {
  data: ThoiKhoaBieuListProps;
}
const ItemAgenda = (props: Props) => {
  const { data } = props;

  const theme = useTheme();

  const timeStart = moment(data?.thoiGianBatDau).format('HH:mm');

  const timeEnd = moment(data?.thoiGianKetThuc).format('HH:mm');

  const currentDate = new Date();

  const otherDate = new Date(data?.thoiGianBatDau);

  const isDone = otherDate < currentDate;

  return (
    <HStack mb={'4'} alignItems={'center'}>
      <Icon
        name={isDone ? 'check' : 'circle'}
        size={WIDTH(16)}
        color={isDone ? theme.colors.blue[300] : theme.colors.red[300]}
      />
      <Box ml={'4'}>
        <Text
          flex={1}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={'sm'}
          color={'black'}
          numberOfLines={3}>
          {`${data?.tenMonHoc} (${data?.ten})`}
        </Text>
        <Text
          color={theme.colors.gray[500]}
          fontSize="xs"
          fontFamily={R.fonts.BeVietnamProRegular}>
          {`${timeStart} - ${timeEnd}`}
        </Text>
      </Box>
    </HStack>
  );
};

export default ItemAgenda;
