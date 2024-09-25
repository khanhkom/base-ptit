/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import R from '@assets/R';
import { HEIGHT } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

import styles from './styles';

const LichSuDiemDanh = (props: any) => {
  const data = props?.route?.params?.data;

  const vangCoPhep = data?.soBuoiVangCoPhep;

  const vangKoPhep = data?.soBuoiVang;

  const lichSuVang = [...vangKoPhep, ...vangCoPhep];

  const lichSu = lichSuVang?.sort(function (a, b) {
    return Date.parse(b.ngay_bd) - Date.parse(a.ngay_bd);
  });

  return (
    <View style={styles.container}>
      <HeaderReal title="Lịch sử vắng" />
      <View style={styles.content}>
        <ThongTinChung data={data} />
        <LichSu lichSu={lichSu} />
      </View>
    </View>
  );
};

export default LichSuDiemDanh;
const ThongTinChung = ({ data }: { data: any }) => {
  const listData = [
    {
      label: translate('slink:Absence_with_permission'),
      value: data?.soBuoiVangCoPhep?.length ?? '',
    },
    {
      label: translate('slink:Absence_without_permission'),
      value: data?.soBuoiVang?.length ?? '',
    },
  ];

  return (
    <View style={{}}>
      <Text style={styles.textTitle}>{translate('slink:Info_creater')}</Text>
      <FlatList
        style={styles.viewContent}
        data={listData}
        bounces={false}
        nestedScrollEnabled={false}
        renderItem={({ item, index }) => (
          <ItemLabel
            label={item?.label}
            value={item?.value}
            isLast={index === listData?.length - 1}
          />
        )}
      />
    </View>
  );
};

const LichSu = ({ lichSu }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Lịch sử vắng</Text>
      <FlatList
        style={styles.viewLichSu}
        data={lichSu}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ItemTrong content="Bạn chưa vắng buổi nào" />}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.viewItem}>
            <TextValue
              label="Ngày"
              value={moment(item?.ngay_bd).format('DD/MM/YYYY')}
            />
            <TextValue
              label="Thời gian"
              value={moment(item?.ngay_gio_hoc).format('HH:mm')}
            />
            <TextValue
              label={translate('slink:Status')}
              value={item?.trang_thai ?? ''}
              marginBottom={0}
            />
          </View>
        )}
      />
    </View>
  );
};

const TextValue = ({ label, value, marginBottom }: any) => {
  return (
    <Text
      style={[
        styles.textLabel,
        {
          marginBottom: marginBottom ?? HEIGHT(4),
        },
      ]}>
      {label}:{' '}
      <Text
        style={[
          styles.value,
          {
            color:
              value === translate('slink:Absence_with_permission')
                ? '#399500'
                : R.colors.redColor,
          },
        ]}>
        {value}
      </Text>
    </Text>
  );
};
