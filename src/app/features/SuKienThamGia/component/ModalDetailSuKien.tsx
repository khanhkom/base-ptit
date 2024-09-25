/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import ItemLabel from '@components/Item/ItemLabel';
import { HocKyProps } from '@components/SelectHocKy/type';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { ModalProps } from '@libcomponents/modal/modal-custome/type';
import { getDSKyHoc } from '@networking/user/DangKyTinChi';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { FlatList } from 'native-base';

import { SuKienMeProps } from '../type';

interface Props extends ModalProps {
  item: SuKienMeProps;
}
const ModalDetailSuKien = (props: Props) => {
  const { item } = props;

  const [tenKyHoc, settenKyHoc] = useState(item?.hoatDongCtsv?.maHocKy);

  useEffect(() => {
    props?.isVisible && getHocKy();
  }, [props?.isVisible]);

  const getHocKy = async () => {
    try {
      const bodyKyHoc = { condition: { active: true }, sort: { ma: -1 } };

      const responseKyHoc = await getDSKyHoc(bodyKyHoc);

      const findSemester = responseKyHoc?.data?.data?.find(
        (e: HocKyProps) => e?.ma === item?.hoatDongCtsv?.maHocKy,
      );

      settenKyHoc(findSemester?.ten || item?.hoatDongCtsv?.maHocKy || '--');
    } catch (error) {}
  };

  const data = [
    {
      label: translate('slink:Ten_hoat_dong'),
      value: item?.hoatDongCtsv?.ten || '--',
    },
    { label: translate('slink:Loai'), value: item?.hoatDongCtsv?.loai || '--' },
    {
      label: translate('slink:Semester'),
      value: tenKyHoc || '--',
    },
    {
      label: translate('slink:So_luong_tham_gia'),
      value: item?.hoatDongCtsv?.soLuongThamGia
        ? `${item?.hoatDongCtsv?.soLuongThamGia} người`
        : '--',
    },
    {
      label: translate('slink:Time_start'),
      value: item?.hoatDongCtsv?.thoiGianBatDau
        ? moment(item?.hoatDongCtsv?.thoiGianBatDau).format('HH:mm DD-MM-YYYY')
        : '--',
    },
    {
      label: translate('slink:Time_end'),
      value: item?.hoatDongCtsv?.thoiGianKetThuc
        ? moment(item?.hoatDongCtsv?.thoiGianKetThuc).format('HH:mm DD-MM-YYYY')
        : '--',
    },
    {
      label: translate('slink:Location'),
      value: item?.hoatDongCtsv?.diaDiem || '--',
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

export default ModalDetailSuKien;
