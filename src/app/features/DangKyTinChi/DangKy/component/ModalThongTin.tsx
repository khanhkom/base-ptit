import React from 'react';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { ModalProps } from '@libcomponents/modal/modal-custome/type';
import { FlatList } from 'native-base';
import ItemLabel from '@components/Item/ItemLabel';
import { DotDangKyTCProps } from '../type';
import { HocKyProps } from '@components/SelectHocKy/type';
import moment from 'moment';
interface Props extends ModalProps {
  dotDangKyTC: DotDangKyTCProps | undefined;
  infoHocKy: HocKyProps | undefined;
}
const ModalThongTin = (props: Props) => {
  const data = [
    { label: 'Tên học kỳ', value: props?.infoHocKy?.ten || '--' },
    { label: 'Số tuần học', value: props?.infoHocKy?.soTuan || '--' },
    {
      label: 'Thời gian bắt đầu học kỳ',
      value: props?.infoHocKy?.thoiGianBatDau
        ? moment(props?.infoHocKy.thoiGianBatDau).format('DD/MM/YYYY')
        : '--',
    },
    ...(props?.dotDangKyTC
      ? [
          {
            label: 'Tên đợt đăng ký tín chỉ',
            value: props?.dotDangKyTC?.ten || '--',
          },
        ]
      : []),
  ];
  return (
    <ModalCustome {...props}>
      <FlatList
        data={data}
        extraData={data}
        renderItem={({ item, index }) => (
          <ItemLabel
            value={`${item?.value}`}
            label={item?.label}
            isLast={data?.length - 1 === index}
          />
        )}
      />
    </ModalCustome>
  );
};

export default ModalThongTin;
