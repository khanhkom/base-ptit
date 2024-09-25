/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { View } from 'react-native';

import { HEIGHT } from '@common';

import CardInfo from './CardInfo';
import styles from './styles';

const ItemKeHoachHoatDong = (props: any) => {
  const { itemKeys, showDetail } = props;

  return (
    <RenderItem
      item={itemKeys}
      key={itemKeys}
      index={itemKeys}
      showDetail={showDetail}
      isLast={false}
    />
  );
};

export default ItemKeHoachHoatDong;
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
