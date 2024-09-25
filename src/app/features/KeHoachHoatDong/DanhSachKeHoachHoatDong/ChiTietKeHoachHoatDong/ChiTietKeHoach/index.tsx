/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, ScrollView } from 'native-base';

import ListPhanCongNhiemVu from './ListPhanCongNhiemVu';

const ChiTietKeHoach = ({ item: itemKHHD }: any) => {
  const listData = [
    {
      label: 'Số kế hoạch',
      value: itemKHHD?.soKeHoachHoatDong || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Tên kế hoạch hoạt động',
      value: itemKHHD?.ten || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Mục đích yêu cầu',
      value: itemKHHD?.mucTieuYeuCau || translate('slink:Chua_cap_nhat'),
      html: true,
      multiline: true,
    },
    {
      label: 'Thời gian, địa điểm, thành phần',
      value:
        itemKHHD?.thoiGianDiaDiemThanhPhan || translate('slink:Chua_cap_nhat'),
      html: true,
      multiline: true,
    },
    {
      label: 'Phân công nhiệm vụ',
      value: itemKHHD?.phanCongNhiemVu || translate('slink:Chua_cap_nhat'),
      html: true,
      multiline: true,
    },
    {
      label: 'Tổ chức các công việc cụ thể',
      value: '',
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box
        paddingLeft={WIDTH(16)}
        paddingRight={WIDTH(16)}
        mb={'6'}
        mt={'2'}
        width={WIDTH(343)}
        backgroundColor={R.colors.white}
        alignSelf="center">
        <FlatList
          data={listData}
          key={'ghiChu'}
          renderItem={({ item, index }) => {
            return (
              <ItemLabel
                label={item?.label}
                value={item?.value}
                isLast={index === listData?.length - 1}
                multiLine={item?.multiline}
                typeHTML={item?.html && !!item?.value}
              />
            );
          }}
        />
        <ListPhanCongNhiemVu item={itemKHHD} />
      </Box>
    </ScrollView>
  );
};

export default ChiTietKeHoach;
