/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import ItemLabel from '@components/Item/ItemLabel';
import { translate } from '@utils/i18n/translate';
import { FlatList } from 'native-base';

import styles from './styles';

import { BuoiHocProps } from '../../type';
import DanhSachHocLieu from '../BuoiHocGiangVien/NoiDungBuoiHoc/DanhSachHocLieu';

const BuoiHocSinhVien = (props: { infoCard: BuoiHocProps }) => {
  const { infoCard } = props;

  const danhSachData = [
    { label: translate('slink:Teacher'), value: infoCard?.tenNhanSu || '--' },
    {
      label: translate('slink:Tieu_de_bai_hoc'),
      value: infoCard?.tieuDeBaiHoc || '--',
    },
    // {
    //   label: translate('slink:Attachments'),
    //   value: infoCard?.urlBaiHoc ? translate('slink:See_details') : '--',
    //   link: infoCard?.urlBaiHoc || '',
    // },
    {
      label: translate('slink:Content'),
      value: infoCard?.noiDungBaiHoc,
      typeHTML: true,
    },
  ];

  return (
    <FlatList
      data={danhSachData}
      backgroundColor={'white'}
      contentContainerStyle={styles.content}
      renderItem={({ item, index }) => {
        return (
          <ItemLabel
            label={item?.label}
            value={item?.value}
            isLast={danhSachData?.length - 1 === index}
            typeHTML={item?.typeHTML && !!item?.value}
            // link={item?.link}
          />
        );
      }}
      ListFooterComponent={
        <DanhSachHocLieu
          disable
          defaultData={infoCard?.hocLieuList}
          onChange={() => {}}
        />
      }
    />
  );
};

export default BuoiHocSinhVien;
