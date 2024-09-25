/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FlatList, LayoutAnimation, Text, View } from 'react-native';

import { WIDTH } from '@common';
import { TouchableScale } from '@libcomponents';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';
import ItemSubject from '@components/Item/ItemSubject';
import { APP_SCREEN } from '@navigation/screen-types';
import { navigateScreen } from '@navigation/navigation-service';
import { HTDGProps } from '@features/LopTinChi/component/ThongTinChung/type';
import { ChuyenNganhProps } from './type';
interface Props {
  data: { key: string; data: ChuyenNganhProps[] };
  hinhThucDanhGia: HTDGProps[];
}
const ItemChuyenNganh = (props: Props) => {
  const { data, hinhThucDanhGia } = props;
  const [expand, setexpand] = useState(true);
  const showExpand = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleX,
        springDamping: 1.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 1.7,
      },
    });

    setexpand(!expand);
  };
  const onPressSubject = item => {
    navigateScreen(APP_SCREEN.MONTUCHON, {
      data: item,
      hinhThucDanhGia,
    });
  };
  return (
    <View style={styles.container}>
      <ButtonExpand expand={expand} title={data?.key} onPress={showExpand} />
      {expand && (
        <FlatList
          data={data?.data}
          extraData={data?.data}
          scrollEnabled={false}
          bounces={false}
          numColumns={2}
          renderItem={({ item, index }) => {
            const hpTuChon = item?.loaiHocPhanCtdt === 'Tự chọn';
            return (
              <ItemSubject
                tenMon={item?.ten || item?.hocPhan?.ten}
                soTinChi={item?.soTinChiTuChonPhaiHoc || item?.soTinChi}
                listPoint={item?.lichSuDiem?.map(e => e?.diemChu) || []}
                visiblePoint={!hpTuChon}
                hasModal={!hpTuChon}
                item={item}
                hinhThucDanhGia={hinhThucDanhGia}
                key={index}
                onPress={() => onPressSubject(item)}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ItemChuyenNganh;
const ButtonExpand = ({
  onPress,
  title,
  expand,
}: {
  onPress: () => void;
  title: string;
  expand: boolean;
}) => {
  return (
    <TouchableScale onPress={onPress} containerStyle={[styles.containerExpand]}>
      <Text style={[styles.tenChucNang]}>{title}</Text>
      <Icon
        color={'#848A95'}
        size={WIDTH(24)}
        name={expand ? 'chevron-up' : 'chevron-down'}
      />
    </TouchableScale>
  );
};
