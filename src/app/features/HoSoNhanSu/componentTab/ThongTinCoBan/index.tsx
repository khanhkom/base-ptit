/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import BoxHSNS from '@components/BoxHSNS';
import ItemLabel from '@components/Item/ItemLabel';
import { translate } from '@utils/i18n/translate';
import { FlatList, ScrollView } from 'native-base';

import styles from './styles';

const ThongTinCoBan = ({ infoUser }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.contentBox}>
      {listData(infoUser)?.map((e: { label: string; data: any[] }) => {
        return (
          <BoxHSNS visibleAdd={false} title={e?.label}>
            <FlatList
              scrollEnabled={false}
              style={styles.contentBox2}
              data={e?.data}
              bounces={false}
              nestedScrollEnabled={false}
              renderItem={({ item, index }) => (
                <ItemLabel
                  label={item?.label}
                  value={item?.value}
                  multiLine={item?.multiLine}
                  isLast={index === e?.data?.length - 1}
                />
              )}
            />
          </BoxHSNS>
        );
      })}
    </ScrollView>
  );
};

export default ThongTinCoBan;
const listData = (infoUser: any) => [
  {
    label: translate('hoSoNhanSu:noiSinh'),
    data: [
      {
        label: translate('hoSoNhanSu:tinh'),
        value: infoUser?.noiSinhThanhPhoTen || '--',
      },
      {
        label: translate('hoSoNhanSu:quan'),
        value: infoUser?.noiSinhQuanTen || '--',
      },
      {
        label: translate('hoSoNhanSu:phuong'),
        value: infoUser?.noiSinhXaTen || '--',
      },
    ],
  },
  {
    label: translate('hoSoNhanSu:queQuan'),
    data: [
      {
        label: translate('hoSoNhanSu:tinh'),
        value: infoUser?.queQuanThanhPhoTen || '--',
      },
      {
        label: translate('hoSoNhanSu:quan'),
        value: infoUser?.queQuanQuanTen || '--',
      },
      {
        label: translate('hoSoNhanSu:phuong'),
        value: infoUser?.queQuanXaTen || '--',
      },
    ],
  },
  {
    label: translate('hoSoNhanSu:hoKhau'),
    data: [
      {
        label: translate('hoSoNhanSu:tinh'),
        value: infoUser?.hoKhauThanhPhoTen || '--',
      },
      {
        label: translate('hoSoNhanSu:quan'),
        value: infoUser?.hoKhauQuanTen || '--',
      },
      {
        label: translate('hoSoNhanSu:phuong'),
        value: infoUser?.hoKhauXaTen || '--',
      },
      {
        label: translate('hoSoNhanSu:diaChiCuThe'),
        value: infoUser?.hoKhauSoNha || '--',
      },
    ],
  },
  {
    label: translate('hoSoNhanSu:noiOHienNay'),
    data: [
      {
        label: translate('hoSoNhanSu:tinh'),
        value: infoUser?.noiOThanhPhoTen || '--',
      },
      {
        label: translate('hoSoNhanSu:quan'),
        value: infoUser?.noiOQuanTen || '--',
      },
      {
        label: translate('hoSoNhanSu:phuong'),
        value: infoUser?.noiOXaTen || '--',
      },
      {
        label: translate('hoSoNhanSu:diaChiCuThe'),
        value: infoUser?.noiOSoNha || '--',
      },
    ],
  },
  {
    label: translate('hoSoNhanSu:thanhPhanBanThan'),
    data: [
      {
        label: translate('hoSoNhanSu:quocTichId'),
        value: infoUser?.tenQuocTich || '--',
      },
      {
        label: translate('hoSoNhanSu:tonGiaoId'),
        value: infoUser?.tenDanToc || '--',
      },
      {
        label: translate('hoSoNhanSu:maTonGiao'),
        value: infoUser?.tenTonGiao || '--',
      },
      {
        label: translate('hoSoNhanSu:tinhTrangHonNhanId'),
        value: infoUser?.tinhTrangHonNhan?.ten || '--',
      },
    ],
  },
];
