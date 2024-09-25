/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React from 'react';
import { ScrollView } from 'react-native';

import { useSelector } from 'react-redux';

import QuanHeBanThan from '@features/HoSoNhanSu/Table/QuanHeGiaDinh/QuanHeBanThan';
import QuanHeBenVoChong from '@features/HoSoNhanSu/Table/QuanHeGiaDinh/QuanHeBenVoChong';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';

import styles from './styles';

const MoiQuanHeGiaDinh = ({ onShowDetail, editVisible }: any) => {
  const { infoUserTCNS } = useSelector(infomationUserConfig);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <QuanHeBanThan
        editVisible={editVisible}
        onShowDetail={onShowDetail}
        idUser={infoUserTCNS?._id}
      />
      <QuanHeBenVoChong
        editVisible={editVisible}
        onShowDetail={onShowDetail}
        idUser={infoUserTCNS?._id}
      />
    </ScrollView>
  );
};

export default MoiQuanHeGiaDinh;
