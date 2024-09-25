/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import HeaderReal from '@libcomponents/header-real';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDanhSachDotChamDiem } from '@networking/user';

import ItemList from './Item/ItemList';
import styles from './styles';

const DanhGiaPhieuDiemRenLuyen = () => {
  const [danhSachKyHoc, setdanhSachKyHoc] = useState<any>([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getDataDanhSachKyHoc();
  }, []);

  const getDataDanhSachKyHoc = async () => {
    try {
      setloading(true);

      const res: any = await getDanhSachDotChamDiem();

      const listKyHoc = res?.data ?? [];

      setdanhSachKyHoc(listKyHoc);

      setloading(false);
    } catch (error) {}
  };

  const onNavigate = (item: any) => {
    // const currentTime = moment();

    // const isThoiGianDanhGia =
    //   currentTime.isAfter(item?.thoiGianSVChamDiem?.thoiGianBatDau) &&
    //   currentTime.isBefore(item?.thoiGianSVChamDiem?.thoiGianKetThuc);

    // const daNopPhieuDiem = item?.ketQua?.trangThaiChamSinhVien === 'Đã nộp';

    navigateScreen(APP_SCREEN.CHITIETPHIEUDIEM, {
      item,
      onRefresh: getDataDanhSachKyHoc,
      // daNop: daNopPhieuDiem || !isThoiGianDanhGia,
    });
  };

  return (
    <View style={styles.container}>
      <HeaderReal title={'Phiếu điểm rèn luyện'} />
      <FlatList
        data={danhSachKyHoc}
        extraData={danhSachKyHoc}
        onEndReachedThreshold={0.01}
        refreshing={loading}
        onRefresh={getDataDanhSachKyHoc}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }: any) => (
          <ItemList
            onRefresh={getDataDanhSachKyHoc}
            item={item}
            key={index}
            onNavigate={() => onNavigate(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DanhGiaPhieuDiemRenLuyen;
