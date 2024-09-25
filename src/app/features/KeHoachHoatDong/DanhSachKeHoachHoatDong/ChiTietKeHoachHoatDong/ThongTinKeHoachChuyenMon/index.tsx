/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, ScrollView } from 'native-base';

const ThongTinKeHoachChuyenMon = ({ item: itemKHHD, listDot }: any) => {
  const listData = [
    {
      label: 'Đợt kế hoạch năm',
      value:
        listDot?.find(itemDot => itemDot?.value === itemKHHD?.dotKeHoachNamId)
          ?.label || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Tên kế hoạch chuyên môn',
      value: itemKHHD?.keHoachNam?.noiDung || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Mã hoạt động',
      value:
        itemKHHD?.keHoachNam?.maHoatDong || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Lĩnh vực chung',
      value:
        itemKHHD?.keHoachNam?.linhVucChung?.ten ||
        translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Lĩnh vực chi tiết',
      value:
        itemKHHD?.keHoachNam?.linhVucChiTiet?.ten ||
        translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Bắt đầu',
      value: itemKHHD?.keHoachNam?.tuThang
        ? `Tháng ${itemKHHD?.keHoachNam?.tuThang}`
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Kết thúc',
      value: itemKHHD?.keHoachNam?.denThang
        ? `Tháng ${itemKHHD?.keHoachNam?.denThang}`
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Đơn vị đầu mối',
      value:
        itemKHHD?.keHoachNam?.donViDauMoi?.tenDonVi ||
        translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Đơn vị phối hợp',
      value:
        itemKHHD?.keHoachNam?.donViPhoiHop
          ?.map(itemKeHoach => {
            return itemKeHoach?.tenDonVi;
          })
          .toString() || translate('slink:Chua_cap_nhat'),
      multiline: true,
    },
    {
      label: 'Đơn vị khác',
      value:
        itemKHHD?.keHoachNam?.donViPhoiHopKhac ||
        translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Nguồn kinh phí',
      value:
        itemKHHD?.keHoachNam?.nguonKinhPhi
          ?.map(itemKeHoach => {
            return itemKeHoach?.ten;
          })
          .toString() || translate('slink:Chua_cap_nhat'),
      multiline: true,
    },
    {
      label: 'Tệp đính kèm',
      value: itemKHHD?.keHoachNam?.url
        ? 'Xem chi tiết'
        : translate('slink:Chua_cap_nhat'),
      link: itemKHHD?.keHoachNam?.url,
    },
    {
      label: 'Phòng kế toán duyệt',
      value: itemKHHD?.keHoachNam?.phongKeToanDuyet ? '✅' : '❌',
    },
    {
      label: 'Danh sách yêu cầu',
      value:
        itemKHHD?.keHoachNam?.danhSachYeuCau
          ?.map((itemKeHoach, index) => {
            return `${index + 1}. ${itemKeHoach?.noiDung}`;
          })
          ?.join('\n') || translate('slink:Chua_cap_nhat'),
      multiline: true,
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
                link={item?.link}
                multiLine={item?.multiline}
              />
            );
          }}
        />
      </Box>
    </ScrollView>
  );
};

export default ThongTinKeHoachChuyenMon;
