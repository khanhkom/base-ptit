/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React from 'react';
import { FlatList, ScrollView, Text } from 'react-native';

import ItemLabel from '@components/Item/ItemLabel';
import CuDiDaoTaoBoiDuong from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/CuDiDaoTaoBoiDuong';
import HocHam from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/HocHam';
import LyLuanChinhTri from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/LyLuanChinhTri';
import NgoaiNgu from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/NgoaiNgu';
import QuanLyHanhChinh from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/QuanLyHanhChinh';
import QuanLyNhaNuoc from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/QuanLyNhaNuoc';
import QuocPhongAnNinh from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/QuocPhongAnNinh';
import TinHoc from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/TinHoc';
import TrinhDoDaoTao from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/TrinhDoDaoTao';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const ThongTinDaoTao = ({ infoUser, onShowDetail }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InfoUser infoUser={infoUser} />
      <HocHam onShowDetail={onShowDetail} idUser={infoUser?._id} />
      <TrinhDoDaoTao onShowDetail={onShowDetail} idUser={infoUser?._id} />
      <LyLuanChinhTri idUser={infoUser?._id} onShowDetail={onShowDetail} />
      <QuanLyHanhChinh idUser={infoUser?._id} onShowDetail={onShowDetail} />
      <QuanLyNhaNuoc idUser={infoUser?._id} onShowDetail={onShowDetail} />
      <NgoaiNgu idUser={infoUser?._id} onShowDetail={onShowDetail} />
      <TinHoc idUser={infoUser?._id} onShowDetail={onShowDetail} />
      <QuocPhongAnNinh idUser={infoUser?._id} onShowDetail={onShowDetail} />
      <CuDiDaoTaoBoiDuong idUser={infoUser?._id} onShowDetail={onShowDetail} />
    </ScrollView>
  );
};

export default ThongTinDaoTao;

const InfoUser = ({ infoUser }: any) => {
  const listData = [
    {
      label: translate('hoSoNhanSu:trinhDoGiaoDucPhoThongId'),
      value: infoUser?.trinhDoGiaoDucPhoThongId ?? '--',
    },
    {
      label: translate('hoSoNhanSu:soTruongCongTac'),
      value: infoUser?.soTruongCongTac ?? '--',
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
          label={<Text>{item?.label}</Text>}
          value={item?.value}
          numberOfLines={2}
          textLabel={styles.textLabel2}
          isLast={index === listData?.length - 1}
        />
      )}
    />
  );
};
