/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// import HeaderReal from '@components/header-real';
import { ENguoiTraLoiDrl, ETrangThaiPhieuDiemRL } from '@common';
import HeaderReal from '@libcomponents/header-real';
import { getDiemCuaPhieuDaNhap } from '@networking/user';
import moment from 'moment';

import FormPhieuDiem from './FormPhieuDiem';
import Status from './Items/Status';
import TabbarDRL from './Items/TabbarDRL';
import styles from './styles';

const ChiTietPhieuDiem = (props: any) => {
  const data = props?.route?.params?.item;

  const onRefresh = props?.route?.params?.onRefresh;

  // const daNop = props?.route?.params?.daNop;

  const [index, setIndex] = useState(0);

  const [daNop, setDaNop] = useState(false);

  const [trangThai, setTrangThai] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const getDuLieu = await getDiemCuaPhieuDaNhap(data?._id);

      setTrangThai(getDuLieu?.data?.trangThaiNopSV);

      const now = moment();

      if (getDuLieu?.data?.trangThaiNopSV === ETrangThaiPhieuDiemRL.DA_GUI) {
        setDaNop(true);
      }

      if (
        now.isBefore(data?.thoiGianSVChamDiem?.thoiGianBatDau) ||
        now.isAfter(data?.thoiGianSVChamDiem?.thoiGianKetThuc)
      ) {
        setDaNop(true);
      }
    } catch (error) {}
  };

  const [routes] = useState<any>([
    { key: 0, title: 'Sinh viên đánh giá', field: ENguoiTraLoiDrl.SINH_VIEN },
    { key: 1, title: 'CVHT chấm điểm', field: ENguoiTraLoiDrl.CO_VAN_HOC_TAP },
    { key: 2, title: 'CTSV chấm điểm', field: ENguoiTraLoiDrl.CTSV },
  ]);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const renderScene = ({ route }: any) => {
    return (
      <>
        <FormPhieuDiem
          disabled
          duLieuDot={data}
          key={route?.key}
          field={route?.field}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderReal title={'Phiếu điểm rèn luyện'} />
      <Status status={trangThai} />
      {daNop ? (
        <TabbarDRL
          renderScene={renderScene}
          onIndexChange={onIndexChange}
          navigationState={{ index, routes }}
          containerStyle={styles.tabContainer}
        />
      ) : (
        <FormPhieuDiem
          onRefresh={onRefresh}
          duLieuDot={data}
          field={ENguoiTraLoiDrl.SINH_VIEN}
        />
        // <></>
      )}
    </View>
  );
};

export default ChiTietPhieuDiem;
