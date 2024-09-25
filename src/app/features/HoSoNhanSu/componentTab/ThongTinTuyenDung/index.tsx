/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React from 'react';
import { FlatList, ScrollView } from 'react-native';

import ItemLabel from '@components/Item/ItemLabel';
import DienBienCongTac from '@features/HoSoNhanSu/Table/TuyenDung/QuaTrinhCongTac';
import ViTriChucDanhQuyHoach from '@features/HoSoNhanSu/Table/TuyenDung/ViTriChucDanhQuyHoach';
import { AccountProps } from '@model/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

import styles from './styles';

import ViTriTuyenDung from '../../Table/TuyenDung/ViTriTuyenDung';

const ThongTinTuyenDung = ({ infoUser, onShowDetail }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InfoUser infoUser={infoUser} />
      <ViTriTuyenDung
        visibleEdit={false}
        infoUser={infoUser}
        onShowDetail={onShowDetail}
      />
      <ViTriChucDanhQuyHoach
        visibleEdit={false}
        infoUser={infoUser}
        onShowDetail={onShowDetail}
      />
      <DienBienCongTac idUser={infoUser?._id} onShowDetail={onShowDetail} />
    </ScrollView>
  );
};

export default ThongTinTuyenDung;

const InfoUser = ({ infoUser }: { infoUser: AccountProps }) => {
  const listData = [
    {
      label: translate('hoSoNhanSu:ngayBatDauLamViecTaiTruong'),
      value: infoUser?.ngayTuyenDung
        ? moment(infoUser?.ngayTuyenDung).format('DD-MM-YYYY')
        : '--',
    },
    {
      label: translate('hoSoNhanSu:ngayBatDauTinhBHXH'),
      value: infoUser?.ngayBatDauLamViecTaiTruong
        ? moment(infoUser?.ngayBatDauLamViecTaiTruong).format('DD-MM-YYYY')
        : '--',
    },
    {
      label: translate('hoSoNhanSu:donViTuyenDungId'),
      required: true,
      value: infoUser?.donViTuyenDung?.ten
        ? `${infoUser?.donViTuyenDung?.ten} (${infoUser?.donViTuyenDung?.maDonVi})`
        : infoUser?.tenDonViTuyenDung
        ? infoUser?.tenDonViTuyenDung
        : '--',
    },
    {
      label: translate('hoSoNhanSu:donViViTriTuyenDungId'),
      value:
        infoUser?.donViViTriTuyenDung?.tenChucVu ||
        infoUser?.tenDonViViTriTuyenDung ||
        '--',
    },
    {
      label: translate('hoSoNhanSu:hinhThucTuyenDungId'),
      value: infoUser?.hinhThucTuyenDung?.ten ?? '--',
    },
    {
      label: translate('hoSoNhanSu:dotTuyenDungId'),
      value: infoUser?.dotTuyenDung?.tenDotTuyenDung
        ? `${infoUser?.dotTuyenDung?.tenDotTuyenDung} (${infoUser?.dotTuyenDung?.nam})`
        : '--',
    },

    {
      label: translate('hoSoNhanSu:soBaoDanh'),
      value: infoUser?.soBaoDanh ?? '--',
    },

    {
      label: translate('hoSoNhanSu:ngayVaoNganh'),
      value: infoUser?.ngayVaoNganh
        ? moment(infoUser?.ngayVaoNganh).format('DD-MM-YYYY')
        : '--',
    },
  ];

  return (
    <FlatList
      style={styles.contentBox}
      data={listData}
      scrollEnabled={false}
      bounces={false}
      nestedScrollEnabled={false}
      renderItem={({ item, index }) => (
        <ItemLabel
          label={item?.label}
          value={item?.value}
          textLabel={styles.textLabel2}
          isLast={index === listData?.length - 1}
        />
      )}
    />
  );
};
