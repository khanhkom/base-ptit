/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH, XET_TOT_NGHIEP } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import ItemTag from '@components/Item/ItemTag';

import { ChiTietProps } from '../type';

const ItemTarget = ({ data, type }: { data: ChiTietProps; type: number }) => {
  const listInfoCDR = [
    {
      title: 'Phương thức tính điểm',
      value: data?.pttd,
      style: styles.stylePTTD,
    },
    ...(data?.dkToiThieu
      ? [
          {
            title: 'Điều kiện đạt tối thiểu',
            value: data?.dkToiThieu,
            style: styles.styleDKTT,
          },
        ]
      : []),
  ];

  const listInfoCCMe = [
    {
      title: <ValueLabel label={'Ngày cấp'} value={data?.ngayCap} />,
      value: (
        <ValueLabel
          label={'Thời hạn CC'}
          type={'Thời hạn'}
          value={data?.chungChiCoThoiHan ? data?.ngayHetHan : 'Không'}
        />
      ),
      style: styles.stylePTTD,
    },
    {
      title: <ValueLabel label={'Đơn vị cấp'} value={data?.donViCap} />,
      value: (
        <ValueLabel
          label={'Trình độ'}
          value={data?.trinhDo}
          type={'Trình độ'}
        />
      ),
      style: styles.stylePTTD,
    },
  ];

  const list: any[] =
    type === XET_TOT_NGHIEP.CC_CHUAN_DAU_RA ? listInfoCDR : listInfoCCMe;

  return (
    <View style={styles.container}>
      <ItemTag
        visible={!!data?.ngoaiNgu}
        title={data?.ngoaiNgu}
        color={R.colors.white}
        backgroundColor={R.colors.colorMain}
        style={styles.tag}
      />
      <Text style={styles.title}>{data?.ten ?? ''}</Text>
      <FlatList
        data={list}
        style={styles.list}
        renderItem={({ item, index }) => {
          return (
            <ItemLabel
              key={index}
              style={styles.item}
              label={item?.title}
              textValue={item?.style}
              textLabel={styles.textLabel}
              value={item?.value}
              isLast
            />
          );
        }}
      />
    </View>
  );
};

export default ItemTarget;
const ValueLabel = (props: {
  type?: string;
  label: string;
  value: string | boolean | undefined;
}) => {
  const { label, value, type } = props;

  const giaTri = type === 'Trình độ' && value === true ? 'Đạt' : value;

  return (
    <Text style={styles.textLabel}>
      {`${label}`}:
      <Text
        style={
          type === 'Trình độ' ? styles.styleTrinhDo : styles.stylePTTD
        }>{` ${giaTri}`}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  styleTrinhDo: { color: R.colors.colorMain, fontSize: getFontSize(14) },
  stylePTTD: { color: R.colors.grayText },
  styleDKTT: {
    color: R.colors.colorMain,
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(14),
  },
  textLabel: { color: R.colors.colorABABAB },
  list: { width: '100%' },
  title: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  item: { paddingVertical: 0, paddingBottom: 0, marginTop: HEIGHT(10) },
  tag: { marginBottom: HEIGHT(12) },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: WIDTH(343),
    alignSelf: 'center',
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(16),
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(12),
    borderRadius: WIDTH(12),
    ...R.themes.shadowOffset,
  },
});
