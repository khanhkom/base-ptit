import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import { Props } from './type';

const ItemLopHanhChinhSV = (props: Props) => {
  const { item, handleNavigate, index } = props;

  const handlePress = () => {
    handleNavigate && handleNavigate();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      testID={`itemLopHanhChinhGV-${index}`}
      onPress={handlePress}
      style={styles.itemNavStyle}>
      <View>
        <Image source={R.images.bgLogo} resizeMode="cover" style={styles.img} />
      </View>
      <View style={styles.content}>
        <Text style={styles.tenLop}>{`${
          item?.ten ?? translate('slink:Chua_cap_nhat')
        }`}</Text>
        <View style={[styles.viewMaLop, { marginVertical: HEIGHT(8) }]}>
          <ItemIconSVG
            title="Khối ngành"
            height={WIDTH(24)}
            width={WIDTH(24)}
          />
          <Text style={styles.maLop}>
            {item?.nganh?.ma ?? translate('slink:Chua_cap_nhat')}
          </Text>
        </View>
        <View style={styles.viewMaLop}>
          <ItemIconSVG title="Ngành-LHC" height={WIDTH(24)} width={WIDTH(24)} />
          <Text style={styles.maLop}>
            {item?.nganh?.ten ?? translate('slink:Chua_cap_nhat')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemLopHanhChinhSV;
