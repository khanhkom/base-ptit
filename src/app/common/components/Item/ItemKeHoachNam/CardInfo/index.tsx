/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';

import { selectAppConfig } from '@redux-selector/app';
import { Text } from 'native-base';

import styles from './styles';

const CardInfo = ({ showDetail, item }: any) => {
  const { account } = useSelector(selectAppConfig);

  const maDonVi = account?.maDonViChinh;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={showDetail && showDetail}
      style={[styles.container]}>
      <Text style={styles.fullname}>{`${item?.noiDung}`}</Text>
      <Text style={styles.donVi}>
        <Text color={'black'}>Thời gian:</Text> Tháng
        {` ${item?.tuThang} - ${item?.denThang}`}
      </Text>
      <Text style={styles.donVi}>
        <Text color={'black'}>Tên lĩnh vực chung:</Text>{' '}
        {`${item?.linhVucChung?.ten}`}
      </Text>
      {item?.danhSachKeHoachHoatDong?.length === 0 ||
      item?.donViDauMoi?.maDonVi !== maDonVi ? (
        <></>
      ) : (
        <>
          <Text style={styles.donVi}>
            <Text color={'black'}>Kế hoạch hoạt động:</Text>{' '}
            {`${item?.danhSachKeHoachHoatDong?.length} kế hoạch`}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default CardInfo;
