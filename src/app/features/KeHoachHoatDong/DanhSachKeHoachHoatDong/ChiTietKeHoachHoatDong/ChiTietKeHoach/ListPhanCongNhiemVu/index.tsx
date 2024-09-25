/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import ItemTrong from '@components/Item/ItemTrong';
import ModalChiTietNhanSu from '@features/HoSoNhanSu/componentTab/ModalChiTiet';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, FlatList } from 'native-base';

import ItemPhanCongNhiemVu from './Items/ItemPhanCongNhiemVu';
import styles from './styles';

const ListPhanCongNhiemVu = (props: any) => {
  const dataItem = props?.item;

  const [isVisible, setisVisible] = useState(false);

  const [dataShow, setdataShow] = useState<any[]>([]);

  return (
    <Box flex={1} backgroundColor={R.colors.white100}>
      <FlatList
        data={dataItem?.danhSachCongViecCuThe ?? []}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ItemPhanCongNhiemVu
            item={item}
            key={index}
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

export default ListPhanCongNhiemVu;
const formatData = item => {
  return [
    {
      label: 'Tên công việc',
      value: item?.ten || translate('slink:Chua_cap_nhat'),
      mutiline: true,
    },
    {
      label: 'Cá nhân phụ trách',
      value: item?.caNhanPhuTrach?.ten || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Đơn vị đầu mối',
      value: item?.donViDauMoi?.tenDonVi || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Đơn vị phối hợp',
      value:
        item?.donViPhoiHop?.map(item => item?.tenDonVi)?.toString() ||
        translate('slink:Chua_cap_nhat'),
      mutiline: true,
    },
    {
      label: 'Cá nhân phối hợp',
      value:
        item?.caNhanPhoiHop?.map(item => item?.ten)?.toString() ||
        translate('slink:Chua_cap_nhat'),
      mutiline: true,
    },
    {
      label: 'Thời gian bắt đầu',
      value: item?.thoiGianBatDau
        ? moment(item?.thoiGianBatDau).format('DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Thời gian kết thúc',
      value: item?.thoiGianKetThuc
        ? moment(item?.thoiGianKetThuc).format('DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Yêu cầu, kết quả chính cần đạt',
      value: item?.yeuCauCanDat || translate('slink:Chua_cap_nhat'),
      mutiline: true,
    },
  ];
};
