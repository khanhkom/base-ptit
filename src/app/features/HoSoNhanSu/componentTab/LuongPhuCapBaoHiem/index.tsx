/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React from 'react';
import { ScrollView } from 'react-native';

import { useSelector } from 'react-redux';

import DienBienKhoan from '@features/HoSoNhanSu/Table/LuongPhuCapBaoHiem/DienBienKhoan';
import DienBienLuong from '@features/HoSoNhanSu/Table/LuongPhuCapBaoHiem/DienBienLuong';
import DienBienPhuCap from '@features/HoSoNhanSu/Table/LuongPhuCapBaoHiem/DienBienPhuCap';
import DienBienPhuCapTangThem from '@features/HoSoNhanSu/Table/LuongPhuCapBaoHiem/DienBienPhuCapTangThem';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';

import styles from './styles';

const LuongPhuCapBaoHiem = ({ onShowDetail, editVisible }: any) => {
  const { infoUserTCNS } = useSelector(infomationUserConfig);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DienBienLuong
        editVisible={editVisible}
        onShowDetail={onShowDetail}
        idUser={infoUserTCNS?._id}
      />
      <DienBienPhuCap
        editVisible={editVisible}
        onShowDetail={onShowDetail}
        idUser={infoUserTCNS?._id}
      />
      <DienBienKhoan
        editVisible={editVisible}
        onShowDetail={onShowDetail}
        idUser={infoUserTCNS?._id}
      />
      <DienBienPhuCapTangThem
        editVisible={editVisible}
        onShowDetail={onShowDetail}
        idUser={infoUserTCNS?._id}
      />
    </ScrollView>
  );
};

export default LuongPhuCapBaoHiem;
