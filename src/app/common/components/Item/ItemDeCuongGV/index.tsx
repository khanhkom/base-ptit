import React from 'react';
import { Image, Text, View } from 'react-native';

import R from '@assets/R';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import { ItemTrongProps } from './type';

const InforValue = ({ content, style }: any) => (
  <Text style={[styles.detail, style]}>{content}</Text>
);

const ItemDeCuongGV = (props: ItemTrongProps) => {
  const { item } = props;

  return (
    <View style={styles.viewInfoGV}>
      <View style={styles.viewAva}>
        <Image
          source={R.images.logoApp}
          resizeMode="stretch"
          style={styles.imgNoti}
        />
      </View>
      <View style={styles.viewInfo}>
        <InforValue
          style={styles.txtTen}
          content={item?.hoTen ?? translate('slink:Chua_cap_nhat')}
        />
        <InforValue
          content={item?.soDienThoai ?? translate('slink:Chua_cap_nhat')}
        />
        <InforValue
          content={item?.diaChi ?? translate('slink:Chua_cap_nhat')}
        />
      </View>
    </View>
  );
};

export default ItemDeCuongGV;
