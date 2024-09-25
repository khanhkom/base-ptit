import React from 'react';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { ModalProps } from '@libcomponents/modal/modal-custome/type';
import { FlatList } from 'native-base';
import ItemLabel from '@components/Item/ItemLabel';
import { LopHocPhanDKTCProps } from '../type';
import { translate } from '@utils/i18n/translate';
interface Props extends ModalProps {
  data: LopHocPhanDKTCProps;
  infoDetail: string | string[];
  hocPhi: string;
}
const ModalDetailLHP = (props: Props) => {
  const data = [
    { label: 'Tên học phần', value: props?.data?.hocPhan?.ten || '--' },
    { label: 'Mã học phần', value: props?.data?.hocPhan?.ma || '--' },
    {
      label: 'Thứ tự lớp',
      value: props?.data?.soThuTuLop || '--',
    },
    {
      label: translate('slink:Number_of_credits'),
      value: props?.data?.hocPhan?.soTinChi || '--',
    },
    {
      label: 'Thông tin chi tiết',
      value: props?.infoDetail,
    },
    {
      label: 'Mã khoá ngành',
      value: props?.data?.maKhoaNganh || '--',
    },
    {
      label: translate('slink:Hoc_phi_du_kien'),
      value: props?.hocPhi || '--',
    },
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

export default ModalDetailLHP;
