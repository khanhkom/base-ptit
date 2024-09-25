/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { ECHART_NCKH_TYPE, HEIGHT, WIDTH } from '@common';
import ViewFilterNB from '@components/ViewFilterNB';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { getDanhSachNamHoc } from '@networking/user/KhaiBaoQuyTrinh';
import {
  dsLoaiHinhNCKH,
  thongKeGioDiemNCKH,
  thongKeNCKH,
} from '@networking/user/QuanLyKhoaHoc';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box, ScrollView } from 'native-base';

import BarchartThongKeNCKH from './BarChart';
import PieChartNCKH from './PieChart';
import { QuyDoiGioProps } from './type';

import { LoaiHinhNCKHProps, NamHocProps } from '../type';

const ThongKeNCKH = () => {
  const { account } = useSelector(selectAppConfig);

  const [listLH, setlistLH] = useState<LoaiHinhNCKHProps[]>([]);

  const [thongKeGio, setthongKeGio] = useState<QuyDoiGioProps[]>([]);

  const [thongKeDiem, setthongKeDiem] = useState<QuyDoiGioProps[]>([]);

  const [listDataNamHoc, setlistDataNamHoc] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    getNamHoc();
  }, []);

  const [loadingHocKi, setloadingHocKi] = useState(false);

  const getNamHoc = async () => {
    setloadingHocKi(true);

    const responseNamHoc: any = await getDanhSachNamHoc();

    const dataMap =
      responseNamHoc?.data?.data?.map((item: NamHocProps) => {
        return { label: item?.tenNamHoc || '', value: item?._id };
      }) ?? [];

    const idInit = dataMap?.[0]?.value;

    await getData(idInit);

    setlistDataNamHoc(dataMap);

    setloadingHocKi(false);
  };

  const [listThongKe, setlistThongKe] = useState(null);

  const getData = async (idNamHoc: string) => {
    const bodyLH = {
      sort: { createdAt: -1 },
    };

    const responseLoaiHinh: any = await dsLoaiHinhNCKH(bodyLH);

    setlistLH(responseLoaiHinh?.data?.data);

    const responseThongKe: any = await thongKeNCKH(
      idNamHoc,
      account?.ssoId || '',
    );

    const dataThongKe =
      responseThongKe?.data?.data?.map((ite: { _id: string }) => {
        const objectLH = responseLoaiHinh?.data?.data?.find(
          (e: { _id: string }) => ite?._id === e?._id,
        );

        const label = objectLH?.ten;

        return { ...ite, label };
      }) || [];

    setlistThongKe(dataThongKe);

    const bodyModeGio = { mode: 'GIO' };

    const responseQuyDoiGio: any = await thongKeGioDiemNCKH(
      idNamHoc,
      account?.ssoId || '',
      bodyModeGio,
    );

    setthongKeGio(responseQuyDoiGio?.data?.data || []);

    const bodyModeDiem = { mode: 'DIEM' };

    const responseQuyDoiDiem: any = await thongKeGioDiemNCKH(
      idNamHoc,
      account?.ssoId || '',
      bodyModeDiem,
    );

    setthongKeDiem(responseQuyDoiDiem?.data?.data || []);
  };

  const listLHTinhDiem = listLH?.filter(item => item?.tinhDiem);

  const onChange = (value: string) => {
    getData(value);
  };

  if (loadingHocKi) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title={translate('slink:Overview')} />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Overview')} />
      <ScrollView flex={1} contentContainerStyle={styles.content}>
        <ViewFilterNB data={listDataNamHoc} onChange={onChange} />
        <BarchartThongKeNCKH data={listThongKe} />
        <PieChartNCKH
          tieuDe={translate('slink:Standard_time_for_scientific_research')}
          thongKeGio={thongKeGio}
          listLH={listLH}
          type={ECHART_NCKH_TYPE.GIO}
        />
        <PieChartNCKH
          tieuDe={translate('slink:Point_of_scientific_work')}
          listLH={listLHTinhDiem}
          thongKeGio={thongKeDiem}
          type={ECHART_NCKH_TYPE.DIEM}
        />
      </ScrollView>
    </Box>
  );
};

export default ThongKeNCKH;

const styles = StyleSheet.create({
  content: {
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
    paddingHorizontal: WIDTH(12),
  },
});
