/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import HeaderReal from '@libcomponents/header-real';
import ItemTrong from '@components/Item/ItemTrong';
import styles from './styles';
import ItemSubject from '@components/Item/ItemSubject';

const MonTuChon = (props: any) => {
  const data = props?.route?.params?.data;
  const hinhThucDanhGia = props?.route?.params?.hinhThucDanhGia;

  return (
    <View style={styles.container} testID="MonTuChon">
      <HeaderReal title={data?.ten ?? ''} />
      <FlatList
        data={data?.hocPhanCtdtList ?? []}
        extraData={data?.hocPhanCtdtList ?? []}
        bounces={false}
        numColumns={2}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={styles.listContainer}
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
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MonTuChon;
