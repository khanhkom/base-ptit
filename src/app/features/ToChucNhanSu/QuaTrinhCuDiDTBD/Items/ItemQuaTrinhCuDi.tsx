/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Box, HStack, Pressable, Stack, Text } from 'native-base';
enum ETrangThaiDuyet {
  CHUA_DUYET = 'Chờ xử lý',
  KHONG_DUYET = 'Từ chối',
  DUYET = 'Duyệt',
  YEU_CAU_CHINH_SUA_LAI = 'Yêu cầu chỉnh sửa lại',
}
const MapColorETrangThaiDuyet = {
  [ETrangThaiDuyet.CHUA_DUYET]: 'blue',
  [ETrangThaiDuyet.KHONG_DUYET]: 'red',
  [ETrangThaiDuyet.DUYET]: 'green',
  [ETrangThaiDuyet.YEU_CAU_CHINH_SUA_LAI]: 'yellow',
};

const ItemQuaTrinhCuDi = ({ item, onPress }: any) => {
  return (
    <Pressable
      width={WIDTH(343)}
      _pressed={R.themes.pressed}
      marginBottom={HEIGHT(12)}
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(12)}
      mt={'4'}
      paddingBottom={HEIGHT(12)}
      borderRadius={WIDTH(8)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      style={[styles.container]}
      onPress={onPress && onPress}>
      <Box alignItems="flex-start">
        <Badge
          mb="1"
          alignSelf={'flex-start'}
          colorScheme={MapColorETrangThaiDuyet?.[item?.trangThaiDuyet]}>
          {item?.trangThaiDuyet}
        </Badge>
        <Text
          flex={1}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={getFontSize(14)}
          color={R.colors.black0}
          numberOfLines={3}>
          {item?.hinhThucDaoTao?.ten ?? '--'}
        </Text>
      </Box>

      <Stack flex={1} mt={'2'}>
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={getFontSize(12)}
          numberOfLines={2}
          color={'gray.500'}>
          {translate('slink:Unit')}: {item?.thongTinNhanSu?.donViChinh?.ten}
        </Text>
        <HStack justifyContent={'space-between'}>
          <Text
            mt="2"
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize={getFontSize(12)}
            numberOfLines={2}
            color={'gray.500'}>
            {translate('slink:FromDate')}:{' '}
            {item?.tuNgay ? moment(item?.tuNgay).format('DD/MM/YYYY') : '--'}
          </Text>
          <Text
            mt="2"
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize={getFontSize(12)}
            numberOfLines={2}
            color={'gray.500'}>
            {translate('slink:ToDate')}:{' '}
            {item?.denNgay ? moment(item?.denNgay).format('DD/MM/YYYY') : '--'}
          </Text>
        </HStack>
      </Stack>
    </Pressable>
  );
};

export default ItemQuaTrinhCuDi;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    ...R.themes.shadowOffset,
  },
});
