import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import { Props } from './type';

const ItemLopThucHanh = (props: Props) => {
  const { item, handleNavigate, index } = props;

  const handlePress = () => {
    handleNavigate && handleNavigate();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      testID={`ItemMotCua-${index}`}
      onPress={handlePress}
      style={styles.itemNavStyle}>
      <View>
        <Image source={R.images.bgLogo} resizeMode="cover" style={styles.img} />
      </View>
      <View style={styles.content}>
        <Text style={styles.tenLop}>
          {item?.hocPhan?.ten || translate('slink:Chua_cap_nhat')}
        </Text>
        <View style={styles.viewMaLop}>
          <ItemIconSVG
            title={translate('slink:Ma_lop_thuc_hanh')}
            height={WIDTH(24)}
            width={WIDTH(24)}
          />
          <Text style={styles.maLop}>
            {item?.ten || translate('slink:Chua_cap_nhat')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemLopThucHanh;
