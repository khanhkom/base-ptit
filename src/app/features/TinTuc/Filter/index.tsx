/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { useSelector } from 'react-redux';

import { WIDTH } from '@common';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

const FilterTinTuc = (props: any) => {
  const onFilter = props?.route?.params?.onFilter;

  const chuDeChoose = props?.route?.params?.chuDeChoose;

  const { loaiTinTuc } = useSelector(selectAppConfig);

  const [itemChoose, setitemChoose] = useState<any>(chuDeChoose);

  const list = loaiTinTuc?.map((val, ind) => ({
    ...val,
    index: ind,
  }));

  const onSave = () => {
    if (itemChoose) {
      onFilter?.(itemChoose);
    } else {
      onFilter?.(undefined);
    }

    goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:News')}
        childrenRight={
          <View style={{ flexDirection: 'row' }}>
            <Text onPress={onSave} style={styles.textSave}>
              Lọc
            </Text>
          </View>
        }
      />
      <FlatList
        data={list}
        extraData={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemFilter
            item={item}
            hasCheck={index === itemChoose?.index}
            onPress={() => {
              if (index === itemChoose?.index) {
                setitemChoose(undefined);
              } else {
                setitemChoose(item);
              }
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerNews}
        style={styles.flatListNews}
      />
    </View>
  );
};

export default FilterTinTuc;
const ItemFilter = ({ item, onPress, hasCheck }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.viewItem}>
      <Text style={styles.textChuDe}>{item?.name ?? ''}</Text>
      {hasCheck && (
        <View style={styles.viewCheck}>
          <Entypo name="check" size={WIDTH(16)} color={'#399500'} />
        </View>
      )}
    </TouchableOpacity>
  );
};
