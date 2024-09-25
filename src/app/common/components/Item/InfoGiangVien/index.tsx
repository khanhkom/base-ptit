import React from 'react';
import { Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { showImage } from '@config/function';
import { translate } from '@utils/i18n/translate';
import { Pressable } from 'native-base';

import styles from './styles';
import { ItemTrongProps } from './type';

const InforValue = ({ label, content }: any) => (
  <Text style={styles.titleInfor}>
    {`${label}: `}
    <Text style={styles.detail}>{content}</Text>
  </Text>
);

const InfoGiangVien = (props: ItemTrongProps) => {
  const { url, name, email, sdt } = props;

  const anhGV = url ? { uri: url } : R.images.giangVien;

  return (
    <View style={styles.viewInfoGV}>
      <Pressable
        _pressed={R.themes.pressed}
        onPress={() => showImage([{ source: anhGV, title: name ?? '' }])}
        style={styles.viewAva}>
        <FastImage style={styles.ava} resizeMode="contain" source={anhGV} />
      </Pressable>
      <View style={styles.viewInfo}>
        <InforValue
          label={'Cố vấn học tập'}
          content={name || translate('slink:Chua_cap_nhat')}
        />
        <InforValue
          label={'Email'}
          content={email || translate('slink:Chua_cap_nhat')}
        />
        <InforValue
          label={translate('slink:Phone_number')}
          content={sdt || translate('slink:Chua_cap_nhat')}
        />
      </View>
    </View>
  );
};

export default InfoGiangVien;
