/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ScrollView, View } from 'react-native';

import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';

import BuoiHocSinhVien from './BuoiHocSinhVien';
import HeaderBuoiHoc from './component/HeaderBuoiHoc';
import styles from './styles';

const ChiTietBuoiHoc = (props: any) => {
  const infoCard = props?.route?.params?.infoCard;

  const title = props?.route?.params?.title;

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Detail_t')} />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}>
        <HeaderBuoiHoc infoCard={infoCard} title={title} />
        <BuoiHocSinhVien infoCard={infoCard} />
      </ScrollView>
    </View>
  );
};

export default ChiTietBuoiHoc;
