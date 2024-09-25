/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { EMapColorTrangThaiChamCong, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, Text } from 'native-base';

const ListEvent = ({ day, data, dataCanBo }: any) => {
  const dataSang = data?.find(item => {
    return (
      item?.buoi === 'Sáng' &&
      moment(item?.ngayCong).format('DD/MM/YYYY') === day
    );
  });

  const dataChieu = data?.find(item => {
    return (
      item?.buoi === 'Chiều' &&
      moment(item?.ngayCong).format('DD/MM/YYYY') === day
    );
  });

  return (
    <Box width={WIDTH(343)} alignSelf={'center'} mt={-HEIGHT(8)}>
      <Text
        fontSize={'sm'}
        color={R.colors.black0}
        fontFamily={R.fonts.BeVietnamProBold}
        mb="1">
        {translate('slink:Paid_by_time')}:{' '}
        <Text fontFamily={R.fonts.BeVietnamProMedium}>
          {dataCanBo?.soCongHuongTheoThoiGian ?? 0}
        </Text>
      </Text>
      <Text
        fontSize={'sm'}
        color={R.colors.black0}
        fontFamily={R.fonts.BeVietnamProBold}
        mb="1">
        {translate('slink:Unpaid_leave')}:{' '}
        <Text fontFamily={R.fonts.BeVietnamProMedium}>
          {dataCanBo?.soCongNghiKhongLuong ?? 0}
        </Text>
      </Text>
      <Text
        fontSize={'sm'}
        color={R.colors.black0}
        fontFamily={R.fonts.BeVietnamProBold}
        mb="1">
        {translate('slink:BHXH_Paid')}:{' '}
        <Text fontFamily={R.fonts.BeVietnamProMedium}>
          {dataCanBo?.soCongHuongBHXH ?? 0}
        </Text>
      </Text>
      <Text
        fontSize={'sm'}
        color={R.colors.colorPink}
        fontFamily={R.fonts.BeVietnamProBold}
        mb="1">
        {translate('slink:Date')} {day}
      </Text>
      <Box
        backgroundColor={
          EMapColorTrangThaiChamCong?.[dataSang?.trangThaiChamCong]
            ? EMapColorTrangThaiChamCong?.[dataSang?.trangThaiChamCong]
            : 'white'
        }
        mt="2"
        padding={'4'}
        borderRadius={'8'}>
        <Text
          fontSize={'sm'}
          color={'white'}
          fontFamily={R.fonts.BeVietnamProBold}
          mb="1">
          {translate('slink:Morning')}
        </Text>
        <Text
          fontSize={'xs'}
          color={'white'}
          fontFamily={R.fonts.BeVietnamProBold}
          mb="1">
          {translate('slink:State_cham_cong')}:{' '}
          <Text fontFamily={R.fonts.BeVietnamProMedium} color={'white'}>
            {dataSang?.trangThaiChamCong ?? 0}
          </Text>
        </Text>
        <Text
          fontSize={'xs'}
          color={'white'}
          fontFamily={R.fonts.BeVietnamProBold}
          mb="1">
          {translate('slink:BHXH')}:{' '}
          <Text fontFamily={R.fonts.BeVietnamProMedium} color={'white'}>
            {dataSang?.huongBHXH
              ? translate('slink:Yes')
              : translate('slink:Deny')}
          </Text>
        </Text>
      </Box>
      <Box
        backgroundColor={
          EMapColorTrangThaiChamCong?.[dataChieu?.trangThaiChamCong]
            ? EMapColorTrangThaiChamCong?.[dataChieu?.trangThaiChamCong]
            : 'white'
        }
        my="2"
        padding={'4'}
        borderRadius={'8'}>
        <Text
          fontSize={'sm'}
          color={'white'}
          fontFamily={R.fonts.BeVietnamProBold}
          mb="1">
          {translate('slink:Afternoon')}
        </Text>
        <Text
          fontSize={'xs'}
          color={'white'}
          fontFamily={R.fonts.BeVietnamProBold}
          mb="1">
          {translate('slink:State_cham_cong')}:{' '}
          <Text fontFamily={R.fonts.BeVietnamProMedium} color={'white'}>
            {dataChieu?.trangThaiChamCong ?? 0}
          </Text>
        </Text>
        <Text
          fontSize={'xs'}
          color={'white'}
          fontFamily={R.fonts.BeVietnamProBold}
          mb="1">
          {translate('slink:BHXH')}:{' '}
          <Text fontFamily={R.fonts.BeVietnamProMedium} color={'white'}>
            {dataChieu?.huongBHXH
              ? translate('slink:Yes')
              : translate('slink:Deny')}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default ListEvent;
