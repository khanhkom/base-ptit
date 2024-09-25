/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TouchableOpacity } from 'react-native';

import R from '@assets/R';
import { Text } from 'native-base';

import styles from './styles';
enum ETrangThaiKeHoachHoatDong {
  DU_THAO = 'Dự thảo',
  CHO_DUYET = 'Chờ duyệt',
  PHONG_TAI_CHINH_DUYET = 'Phòng tài chính duyệt',
  LANH_DAO_DUYET = 'Lãnh đạo duyệt',
  DA_DUYET = 'Đã duyệt',
}

const colorTrangThaiKeHoachHoatDong: Record<ETrangThaiKeHoachHoatDong, string> =
  {
    [ETrangThaiKeHoachHoatDong.DU_THAO]: R.colors.BG_WARN,
    [ETrangThaiKeHoachHoatDong.CHO_DUYET]: R.colors.BG_LINK,
    [ETrangThaiKeHoachHoatDong.PHONG_TAI_CHINH_DUYET]: R.colors.orange500,
    [ETrangThaiKeHoachHoatDong.LANH_DAO_DUYET]: '#DCF5F5',
    [ETrangThaiKeHoachHoatDong.DA_DUYET]: R.colors.BG_SUCCESS,
  };

const CardInfo = ({ showDetail, item }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={showDetail && showDetail}
      style={[styles.container]}>
      {/* <Text
        style={[
          styles.donVi,
          {
            backgroundColor: colorTrangThaiKeHoachHoatDong?.[item?.trangThai],
            color: 'white',
            paddingLeft: WIDTH(4),
            marginTop: HEIGHT(8),
            // maxWidth: item?.trangThai.length * WIDTH(7.5),
          },
        ]}>
        {`${item?.trangThai}`}
      </Text> */}
      <Text style={styles.fullname}>{`${item?.ten}`}</Text>
      <Text style={styles.donVi}>
        <Text color={'black'}>Thời gian:</Text> Tháng
        {` ${item?.keHoachNam?.tuThang} - ${item?.keHoachNam?.denThang}`}
      </Text>
      <Text
        style={[
          styles.donVi,
          { color: colorTrangThaiKeHoachHoatDong?.[item?.trangThai] },
        ]}>
        <Text color={'black'}>Trạng thái:</Text>
        {` ${item?.trangThai}`}
      </Text>
    </TouchableOpacity>
  );
};

export default CardInfo;
