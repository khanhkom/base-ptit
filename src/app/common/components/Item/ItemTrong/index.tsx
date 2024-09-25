import React from 'react';
import { Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import { ItemTrongProps } from './type';

const ItemTrong = (props: ItemTrongProps) => {
  const { customStyle, content } = props;

  return (
    <View style={[styles.emptyView, customStyle]}>
      <FastImage
        source={R.images.emptyFolder}
        style={styles.imgEmpty}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.txtEmpty}>
        {content ?? translate('slink:No_data')}
      </Text>
    </View>
  );
};

export default ItemTrong;
