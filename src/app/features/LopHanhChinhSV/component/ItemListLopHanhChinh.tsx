/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getFontSize, HEIGHT, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import Icon from 'react-native-vector-icons/Feather';

import R from '../../../assets/R';

const ItemListLopHanhChinh = (props: {
  item: any;
  onNavigate: any;
  color: string;
}) => {
  const { item, onNavigate, color } = props;

  return (
    <TouchableOpacity
      style={styles.itemNavStyle}
      activeOpacity={0.6}
      onPress={() => onNavigate && onNavigate()}
      disabled={!item.active}>
      <View style={styles.contentLeft}>
        <ItemIconSVG
          title={item?.title}
          color={color ?? R.colors.white}
          width={WIDTH(21)}
          height={WIDTH(21)}
        />
        <Text
          style={[
            styles.textNav,
            { color: item.active ? R.colors.black0 : R.colors.blueGrey550 },
          ]}
          numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <Icon
        name="chevron-right"
        size={WIDTH(24)}
        color={item?.active ? R.colors.grey400 : R.colors.lightGrayEEE}
      />
    </TouchableOpacity>
  );
};

export default ItemListLopHanhChinh;

const styles = StyleSheet.create({
  itemNavStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    minHeight: HEIGHT(60),
    paddingVertical: HEIGHT(18),
    paddingLeft: WIDTH(19),
    paddingRight: WIDTH(16),
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(12),
    borderRadius: WIDTH(8),
  },
  contentLeft: {
    width: WIDTH(270),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textNav: {
    fontSize: getFontSize(16),
    color: R.colors.black0,
    marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});
