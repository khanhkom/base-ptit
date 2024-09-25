/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import R from '@assets/R';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const ItemAnhDaiDien = (props: any) => {
  const { anhDaiDien, setAnhDaiDien } = props;

  return (
    <Image
      style={styles.cntEvent}
      source={anhDaiDien}
      resizeMode="cover"
      onError={() => {
        setAnhDaiDien(R.images.tinTuc);
      }}
      defaultSource={R.images.tinTuc}
    />
  );
};

const TextTieuDe = ({ item }: any) => (
  <Text numberOfLines={2} style={styles.textTitle}>
    {item?.tieuDe ?? translate('slink:Null_t')}
  </Text>
);

const ItemSwiperNews = (props: any) => {
  const { itemNew } = props;

  const [anhDaiDien, setAnhDaiDien] = useState(null);

  useEffect(() => {
    const img =
      !!itemNew?.urlAnhDaiDien &&
      itemNew?.urlAnhDaiDien !== '' &&
      !itemNew?.urlAnhDaiDien?.includes('https://apiptit.aisenote.com')
        ? { uri: itemNew?.urlAnhDaiDien ?? '' }
        : R.images.tinTuc;

    setAnhDaiDien(img);
  }, [itemNew]);

  const gotoNewDetail = () => {};

  if (itemNew) {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        onPress={gotoNewDetail}>
        <ItemAnhDaiDien
          anhDaiDien={anhDaiDien}
          setAnhDaiDien={(value: any) => setAnhDaiDien(value)}
        />
        <TextTieuDe item={itemNew} />
      </TouchableOpacity>
    );
  }

  return null;
};

export default ItemSwiperNews;
