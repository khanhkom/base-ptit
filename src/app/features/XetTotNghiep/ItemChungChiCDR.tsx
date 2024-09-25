import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import ItemIconSVG from '@libcomponents/icon-svg';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';

import styles from './styles';
import { ThongTinCDRProps } from './type';

const ItemChungChiCDR = ({
  item,
  index,
  typeDiem,
  disabled,
}: {
  item: ThongTinCDRProps;
  index: number;
  typeDiem: boolean;
  disabled: boolean;
}) => {
  const datCDR = item?.datChuanDauRa;

  const gotoDetail = () => {
    navigateScreen(APP_SCREEN.CHITIETCDR, { data: item });
  };

  const backgroundColor = typeDiem || datCDR ? R.colors.white : '#f8eded';

  const color = typeDiem || datCDR ? R.colors.black0 : '#9b0000';

  return (
    <TouchableOpacity
      onPress={gotoDetail}
      disabled={disabled}
      activeOpacity={0.6}
      key={index}
      style={[styles.viewItemDK, { backgroundColor }]}>
      {typeDiem ? (
        <Badge
          hoanThanh={item?.hoanThanh}
          value={item?.value}
          target={item?.chuanDauRa}
        />
      ) : (
        <ItemIconSVG title={datCDR ? 'Hoàn thành' : 'Chưa hoàn thành'} />
      )}
      <Text style={[styles.titleItem, { color }]}>
        {item?.loaiChungChi?.ten || item?.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemChungChiCDR;
const Badge = (props: {
  value: string;
  target: string;
  hoanThanh: boolean;
}) => {
  const { value, target, hoanThanh } = props;

  const color = hoanThanh ? '#389500' : '#9b0000';

  const backgroundColor = hoanThanh ? '#d8eacb' : '#ffedef';

  return (
    <View style={[styles.viewBadge, { backgroundColor }]}>
      <Text style={[styles.textValue, { color }]}>
        {value || '--'}
        <Text style={styles.textTarget}>{` / ${target || '--'}`}</Text>
      </Text>
    </View>
  );
};
