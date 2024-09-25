/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import { Text, View } from 'react-native';

import { WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const ChiTietDiemCong = (props: any) => {
  const { diemInfor } = props?.route?.params;

  const tableHead = [
    translate('slink:No'),
    translate('slink:time'),
    translate('slink:Diem_cong'),
    translate('slink:Note'),
  ];

  const widthArr = [WIDTH(60), WIDTH(140), WIDTH(100), WIDTH(180)];

  const tableData =
    diemInfor?.diemCong?.[0]?.lichSuDiem?.map((item: any, index: number) => {
      return [
        `${index + 1}`,
        `${item?.thoiGian}`,
        `${item?.soDiemCong ?? 0}`,
        `${item?.ghiChu ?? ''}`,
      ];
    }) ?? [];

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Detail_t')} />
      <ThongTin infoSV={diemInfor} />
      <BaseTableComponent
        tableHead={tableHead}
        widthArr={widthArr}
        tableData={tableData}
      />
    </View>
  );
};

export default ChiTietDiemCong;
const ThongTin = ({ infoSV, onPress }: any) => {
  return (
    <View style={styles.containerContent}>
      <View style={styles.viewInfoItem}>
        <Text onPress={onPress} style={styles.ten}>
          {infoSV?.name ?? ''}
        </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.viewInfoItem}>
        <ItemIconSVG title="Lớp-TTSV" />
        <Text style={styles.tenLop}>{infoSV?.ma_dinh_danh ?? ''}</Text>
      </View>
    </View>
  );
};
