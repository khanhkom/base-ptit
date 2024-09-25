/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { showImage, WIDTH } from '@common';
import { SinhVienProps } from '@features/LopTinChi/component/ThongTinChung/type';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';
import { Pressable } from 'native-base';

import styles from './styles';

const ListSinhVien = (props: {
  data: SinhVienProps[];
  goToDetail?: (item: SinhVienProps) => void;
}) => {
  const { data, goToDetail } = props;

  const listAva = data?.map(item => {
    const source = item?.sinhVien?.anhDaiDienUrl
      ? { uri: item.sinhVien?.anhDaiDienUrl }
      : R.images.logoApp;

    const name = [item?.sinhVien?.lastName, item?.sinhVien?.firstName]
      ?.filter(e => e !== undefined)
      ?.join(' ');

    return {
      source,
      title: name,
    };
  });

  return (
    <View style={styles.container}>
      <TabBar />
      <FlatList
        style={styles.list}
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={styles.content}
        data={data ?? []}
        extraData={data}
        renderItem={({ item, index }) => (
          <RenderItem
            listAva={listAva}
            item={item}
            index={index}
            goToDetail={() => goToDetail?.(item)}
          />
        )}
      />
    </View>
  );
};

export default ListSinhVien;

const RenderItem = (props: {
  item: SinhVienProps;
  index: number;
  goToDetail: () => void;
  listAva: any[];
}) => {
  const { item, index, goToDetail, listAva } = props;

  const name = [item?.sinhVien?.lastName, item?.sinhVien?.firstName]?.filter(
    e => e !== undefined,
  );

  return (
    <TouchableOpacity disabled onPress={goToDetail} style={styles.viewItem}>
      <View style={styles.viewCenter}>
        <Text style={styles.viewSTT}>{index + 1}</Text>
        <View style={styles.viewCenter}>
          <Pressable
            _pressed={R.themes.pressed}
            onPress={() => showImage(listAva, index)}
            style={styles.avaSinhVien}>
            <FastImage
              style={styles.avaSinhVien}
              source={listAva?.[index]?.source}
              resizeMode="contain"
            />
          </Pressable>
          <View style={styles.viewTTSV}>
            <Text style={styles.name}>{name?.join(' ')}</Text>
            <Text style={styles.maDinhDanh}>{item?.sinhVien?.ma ?? ''}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={goToDetail}
        style={styles.viewMess}>
        <ItemIconSVG
          title={translate('slink:See')}
          width={WIDTH(24)}
          height={WIDTH(24)}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const TabBar = () => {
  return (
    <View style={styles.viewTabbar}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.textTabbar}>{translate('slink:No')}</Text>
        <View>
          <Text style={[styles.textTabbar, { marginLeft: WIDTH(36) }]}>
            {translate('slink:Fullname')}
          </Text>
        </View>
      </View>
      <Text style={styles.textTabbar} />
    </View>
  );
};
