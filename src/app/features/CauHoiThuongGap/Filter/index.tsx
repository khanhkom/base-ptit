/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { COMON_TOPIC, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { getCommonTopic } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

const FilterCauHoiThuongGap = (props: any) => {
  const onFilter = props?.route?.params?.onFilter;

  const title = props?.route?.params?.title;

  const chuDeChoose = props?.route?.params?.chuDeChoose;

  const [itemChoose, setitemChoose] = useState<any>(chuDeChoose);

  const [listTopic, setlistTopic] = useState([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);

    const body = {
      condition: { type: COMON_TOPIC.CAU_HOI_THUONG_GAP },
    };

    const responseTopicCauHoi: any = await getCommonTopic(body);

    const list = responseTopicCauHoi?.data?.data;

    list.sort((a: any, b: any) => a.order - b.order);

    setlistTopic(
      list?.map((item: any, index: number) => {
        return { ...item, index };
      }) ?? [],
    );

    setloading(false);
  };

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
        title={title ?? translate('slink:News')}
        childrenRight={
          <View style={{ flexDirection: 'row' }}>
            <Text onPress={onSave} style={styles.textSave}>
              {translate('slink:Filter')}
            </Text>
          </View>
        }
      />
      <FlatList
        data={listTopic}
        extraData={listTopic}
        refreshing={loading}
        ListEmptyComponent={<ItemTrong />}
        onRefresh={getData}
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

export default FilterCauHoiThuongGap;
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
