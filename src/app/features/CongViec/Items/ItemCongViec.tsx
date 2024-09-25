/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { ECongViec, getFontSize, HEIGHT, WIDTH } from '@common';
import { ProgressCircle } from '@libcomponents/progress/components/circle';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import {
  Badge,
  Box,
  HStack,
  Pressable,
  Stack,
  Text,
  useTheme,
} from 'native-base';
enum ETrangThaiToChucCongViec {
  DA_HOAN_THANH = 'DA_HOAN_THANH',
  CHUA_THUC_HIEN = 'CHUA_THUC_HIEN',
  DANG_THUC_HIEN = 'DANG_THUC_HIEN',
}
const mapTrangThaiToChucCongViec = {
  [ETrangThaiToChucCongViec.CHUA_THUC_HIEN]: 'Chưa thực hiện',
  [ETrangThaiToChucCongViec.DANG_THUC_HIEN]: 'Đang thực hiện',
  [ETrangThaiToChucCongViec.DA_HOAN_THANH]: 'Đã hoàn thành',
};

const colorTrangThaiToChucCongViec = {
  [ETrangThaiToChucCongViec.CHUA_THUC_HIEN]: 'orange',
  [ETrangThaiToChucCongViec.DANG_THUC_HIEN]: 'blue',
  [ETrangThaiToChucCongViec.DA_HOAN_THANH]: 'green',
};

const ItemCongViec = ({ item, onPress, type }: any) => {
  const theme = useTheme();
  return (
    <Pressable
      width={WIDTH(343)}
      _pressed={R.themes.pressed}
      marginBottom={HEIGHT(12)}
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(12)}
      paddingBottom={HEIGHT(12)}
      borderRadius={WIDTH(8)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      style={[styles.container]}
      isDisabled={type === ECongViec.PHOI_HOP}
      onPress={onPress && onPress}>
      <Box alignItems="flex-start">
        <Badge
          mb="1"
          alignSelf={'flex-start'}
          colorScheme={colorTrangThaiToChucCongViec?.[item?.trangThaiCongViec]}>
          {mapTrangThaiToChucCongViec?.[item?.trangThaiCongViec]}
        </Badge>
        <Text
          flex={1}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={getFontSize(14)}
          color={R.colors.black0}
          numberOfLines={3}>
          {item?.ten ?? '--'} (
          {item?.keHoachHoatDongNam?.keHoachNam?.maHoatDong ?? '--'})
        </Text>
      </Box>

      <HStack
        alignItems={'flex-end'}
        justifyContent="space-between"
        flex={1}
        bgColor={R.colors.white}>
        <Stack flex={1}>
          <Text
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize={getFontSize(12)}
            numberOfLines={2}
            color={'gray.500'}>
            {translate('slink:Focal_agency')}: {item?.donViDauMoi?.tenDonVi}
          </Text>
          <Text
            mt="2"
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize={getFontSize(12)}
            numberOfLines={2}
            color={'gray.500'}>
            {translate('slink:Finish_date')}:{' '}
            {moment(item?.thoiGianKetThuc).format('DD/MM/YYYY')}
          </Text>
        </Stack>
        <ProgressCircle
          radius={WIDTH(20)}
          textProgressStyle={{ fontFamily: R.fonts.BeVietnamProMedium }}
          fg={theme.colors.primary[500]}
          round
          progress={item?.tienDoCongViec ?? 0}
        />
      </HStack>
    </Pressable>
  );
};

export default ItemCongViec;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    ...R.themes.shadowOffset,
  },
});
