/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { getFontSize, getLineHeight, getWidth, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';

const HeaderBelow = (props: { data: any; isGiaoVien: any }) => {
  const { data, isGiaoVien } = props;

  if (!isGiaoVien) {
    return <View />;
  }

  const list = [
    {
      label: translate('slink:Teacher'),
      value:
        data?.chucVu !== ''
          ? `${data?.chucVu ?? ''}. ${data?.hoTen ?? ''}`
          : `${data?.hoTen ?? ''}`,
    },
    {
      label: translate('slink:Phone_number'),
      value: data.sdt.replace(/(\d{4})(\d{3})/, '$1 $2 '),
    },
  ];

  const renderItem = ({ item }: any) => (
    <Text style={styles.label}>
      {item?.label ?? ''}
      <Text style={styles.value}>{item?.value ?? ''}</Text>
    </Text>
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList data={list} renderItem={renderItem} scrollEnabled={false} />
      </View>
      <View style={styles.imgView}>
        <FastImage
          style={styles.img}
          source={R.images.logoApp}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </View>
  );
};

export default HeaderBelow;

const styles = StyleSheet.create({
  container: {
    width: getWidth(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: HEIGHT(12),
    paddingBottom: HEIGHT(6),
    paddingHorizontal: WIDTH(20),
    backgroundColor: R.colors.white,
  },
  label: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    color: R.colors.textBlack,
    marginBottom: HEIGHT(6),
  },
  value: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    marginBottom: HEIGHT(6),
  },
  img: {
    width: WIDTH(48),
    height: WIDTH(48),
  },
  imgView: {
    width: WIDTH(48),
    height: WIDTH(48),
    borderRadius: WIDTH(48) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
