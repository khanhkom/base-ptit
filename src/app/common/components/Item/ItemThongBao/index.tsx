import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { HEIGHT } from '@common';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

import styles from './styles';
import { ItemProps } from './type';

const ItemThongBao = (props: ItemProps) => {
  const { data, index, onPress } = props;

  return (
    <TouchableOpacity
      testID={`TypeNew ${index}`}
      activeOpacity={0.7}
      key={index}
      style={[styles.container]}
      onPress={onPress}>
      <View style={styles.cntImage}>
        <FastImage
          source={R.images.tinTuc}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.cntImage}
        />
      </View>
      <View style={styles.viewContent}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.textTitle} numberOfLines={3}>
            {data?.title?.toString()?.trim() ||
              translate('slink:Chua_cap_nhat')}
          </Text>
        </View>
        <View>
          <Text style={[styles.textTime, { marginBottom: HEIGHT(4) }]}>
            {`${moment(data.createdAt ?? new Date()).format(
              'HH:mm DD/MM/YYYY',
            )}`}
          </Text>
          <Text numberOfLines={1} style={styles.textTime}>{`${
            data?.senderName ?? ''
          }`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemThongBao;
