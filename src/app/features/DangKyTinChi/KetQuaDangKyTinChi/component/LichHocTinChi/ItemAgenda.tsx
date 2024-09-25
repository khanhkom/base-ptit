import React from 'react';
import { LayoutChangeEvent } from 'react-native';

import R from '@assets/R';
import { WIDTH } from '@common';
import SlideAnimatedItem from '@components/SlideAnmatedItem';
import { ExtraThoiKhoaBieuList } from '@features/DangKyTinChi/type';
import moment from 'moment';
import { Box, HStack, Text, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  data: { title: string; data: ExtraThoiKhoaBieuList[] };
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  index: number;
}
const ItemAgenda = (props: Props) => {
  const { data, onLayout, index } = props;

  const theme = useTheme();

  const calendarInADay = data?.data || [];

  const title = moment(data?.title, 'YYYY-MM-DD').format('DD/MM/YYYY');

  return (
    <SlideAnimatedItem onLayout={onLayout} index={index}>
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProSemiBold}
        fontSize={'md'}
        color={'black'}
        mb="1"
        numberOfLines={3}>
        {title}
      </Text>
      {calendarInADay?.map((item, ind) => {
        const timeStart = moment(item?.thoiGianBatDau).format('HH:mm');

        const timeEnd = moment(item?.thoiGianKetThuc).format('HH:mm');

        const currentDate = new Date();

        const otherDate = new Date(item?.thoiGianBatDau);

        const isDone = otherDate < currentDate;

        return (
          <HStack key={ind} mb={'4'} alignItems={'center'}>
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
                {`${item?.monHoc} (${item?.maMonHoc})`}
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
      })}
    </SlideAnimatedItem>
  );
};

export default ItemAgenda;
