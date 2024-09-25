/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { View } from 'react-native';

import InfoGiangVien from '@components/Item/InfoGiangVien';
import ListSinhVien from '@components/Item/ListSinhVien';
import ModalInfoSinhVien from '@components/Item/ModalInfoSinhVien';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const ThongTinChungSV = (props: any) => {
  const { dataLopHC } = props.route.params;

  const [isVisible, setisVisible] = useState(false);

  const [dataSinhVien, setdataSinhVien] = useState(null);

  const goToDetail = (item: any) => {
    setisVisible(true);

    setdataSinhVien(item);
  };

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:General_information')} />
      <InfoGiangVien
        url={dataLopHC?.avatar_path}
        name={dataLopHC?.canBo?.name}
        email={dataLopHC?.canBo?.email}
        sdt={dataLopHC?.canBo?.so_dien_thoai}
      />
      <ListSinhVien
        data={dataLopHC?.danhSachSinhVien ?? []}
        goToDetail={goToDetail}
      />
      <ModalInfoSinhVien
        closeButton={() => setisVisible(false)}
        isVisible={isVisible}
        dataSinhVien={dataSinhVien}
      />
    </View>
  );
};

export default ThongTinChungSV;
