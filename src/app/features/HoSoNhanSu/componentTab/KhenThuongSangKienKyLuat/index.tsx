/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React from 'react';
import { ScrollView } from 'react-native';

import { useSelector } from 'react-redux';

import KhenThuong from '@features/HoSoNhanSu/Table/KhenThuongKyLuat/KhenThuong';
import KyLuat from '@features/HoSoNhanSu/Table/KhenThuongKyLuat/KyLuat';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';

import styles from './styles';

const KhenThuongSangKienKyLuat = ({ editVisible, onShowDetail }: any) => {
  const { infoUserTCNS } = useSelector(infomationUserConfig);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KhenThuong
        editVisible={editVisible}
        onShowDetail={onShowDetail}
        idUser={infoUserTCNS?._id}
      />
      <KyLuat
        editVisible={editVisible}
        onShowDetail={onShowDetail}
        idUser={infoUserTCNS?._id}
      />
    </ScrollView>
  );
};

export default KhenThuongSangKienKyLuat;
