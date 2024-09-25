/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text, View } from 'react-native';

import { compareFunction, HEIGHT } from '@common';
import moment from 'moment';

import CardInfo from './CardInfo';
import styles from './styles';

const ItemLichSinhNhat = (props: any) => {
  const { itemKeys, showDetail, onLayout } = props;

  const toDay = moment(new Date()).format('DD-MM-YYYY');

  const listEventinDay = itemKeys?.value?.sort(compareFunction);

  return (
    <View onLayout={onLayout}>
      <Text style={styles.textNgay}>
        {itemKeys?.key === toDay ? `Hôm nay, ${itemKeys?.key}` : itemKeys?.key}
      </Text>
      <View style={styles.listMon}>
        {listEventinDay?.map((item: any, index: number) => {
          return (
            <RenderItem
              item={item}
              key={index}
              index={index}
              showDetail={showDetail}
              isLast={index === itemKeys?.value?.length - 1}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ItemLichSinhNhat;
const RenderItem = ({ item, isLast, showDetail }: any) => {
  const showModal = () => {
    showDetail(item);
  };

  return (
    <View
      style={[styles.containerMon, { marginBottom: isLast ? 0 : HEIGHT(16) }]}>
      <CardInfo item={item} showDetail={showModal} />
    </View>
  );
};
