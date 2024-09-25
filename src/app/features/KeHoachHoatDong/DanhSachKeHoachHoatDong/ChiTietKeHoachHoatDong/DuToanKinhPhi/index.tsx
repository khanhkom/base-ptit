/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import { formatVND } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import ModalChiTietNhanSu from '@features/HoSoNhanSu/componentTab/ModalChiTiet';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Text } from 'native-base';

import ItemDuToanKinhPhi from './Items/ItemDuToanKinhPhi';
import styles from './styles';

const DuToanKinhPhi = (props: any) => {
  const dataItem = props?.item;

  const [isVisible, setisVisible] = useState(false);

  const [dataShow, setdataShow] = useState<any[]>([]);

  const moneySum =
    dataItem?.danhSachDuToanKinhPhi?.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue?.dinhMuc * currentValue?.soLuong,
      0,
    ) ?? 0;

  return (
    <Box backgroundColor={R.colors.backgroundColorNew}>
      <Text
        fontFamily={R.fonts.BeVietnamProMedium}
        ml={'4'}
        fontSize={'sm'}
        color={'black'}>
        Tổng tiền: {formatVND(moneySum)}
      </Text>
      <FlatList
        data={dataItem?.danhSachDuToanKinhPhi ?? []}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ItemDuToanKinhPhi
            item={item}
            index={index}
            onPress={() => {
              setdataShow(formatData(item));

              setisVisible(true);
            }}
          />
        )}
      />
      <ModalChiTietNhanSu
        isVisible={isVisible}
        data={dataShow}
        closeButton={() => {
          setisVisible(false);
        }}
      />
    </Box>
  );
};

export default DuToanKinhPhi;
const formatData = item => {
  const tongTien = item?.soLuong * item?.dinhMuc;

  return [
    {
      label: 'Tên kế hoạch chuyên môn',
      value: item?.hoatDong || translate('slink:Chua_cap_nhat'),
      mutiline: true,
    },
    {
      label: 'Đơn vị tính',
      value: donViTinh(item) || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Số lượng',
      value: String(item?.soLuong || translate('slink:Chua_cap_nhat')),
    },
    {
      label: 'Định mức',
      value: item?.dinhMuc
        ? formatVND(item?.dinhMuc)
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Thành tiền',
      value: tongTien ? formatVND(tongTien) : translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Tiến độ hoàn thành',
      value: item?.tienDoHoanThanh || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Chứng từ yêu cầu',
      value: item?.chungTuYeuCau || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Tệp đính kèm',
      value: item?.tepDinhKem
        ? 'Xem chi tiết'
        : translate('slink:Chua_cap_nhat'),
      link: item?.tepDinhKem,
    },
    {
      label: 'Ghi chú',
      value: item?.ghiChu || translate('slink:Chua_cap_nhat'),
    },
  ];
};

const donViTinh = item => {
  switch (item?.donViTinh) {
    case 'NGUOI':
      return 'Người';
    case 'NGAY':
      return 'Ngày';
    case 'KHAC':
      return `Khác (${item?.donViTinhKhac})`;

    default:
      return translate('slink:Chua_cap_nhat');
  }
};
