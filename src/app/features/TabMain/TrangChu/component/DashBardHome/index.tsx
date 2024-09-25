/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';

import { ECHART_NCKH_TYPE, HEIGHT, WIDTH } from '@common';
import ViewFilterNB from '@components/ViewFilterNB';
import BarchartThongKeNCKH from '@features/QuanLyKhoaHocV2/ThongKe/BarChart';
import PieChartNCKH from '@features/QuanLyKhoaHocV2/ThongKe/PieChart';
import { QuyDoiGioProps } from '@features/QuanLyKhoaHocV2/ThongKe/type';
import { LoaiHinhNCKHProps, NamHocProps } from '@features/QuanLyKhoaHocV2/type';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDanhSachNamHoc } from '@networking/user/KhaiBaoQuyTrinh';
import {
  dsLoaiHinhNCKH,
  thongKeGioDiemNCKH,
  thongKeNCKH,
} from '@networking/user/QuanLyKhoaHoc';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { VStack } from 'native-base';

import ItemTextBlue from '../ItemTextBlue';

const DashBardHome = () => {
  const { account } = useSelector(selectAppConfig);

  useEffect(() => {
    getNamHoc();
  }, []);

  const [loading, setloading] = useState(false);

  const [listLH, setlistLH] = useState<LoaiHinhNCKHProps[]>([]);

  const [thongKeGio, setthongKeGio] = useState<QuyDoiGioProps[]>([]);

  const [thongKeDiem, setthongKeDiem] = useState<QuyDoiGioProps[]>([]);

  const [listThongKe, setlistThongKe] = useState(null);

  const [listDataNamHoc, setlistDataNamHoc] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const getNamHoc = async () => {
    setloading(true);

    const responseNamHoc: any = await getDanhSachNamHoc();

    const dataMap =
      responseNamHoc?.data?.data?.map((item: NamHocProps) => {
        return { label: item?.tenNamHoc || '', value: item?._id };
      }) ?? [];

    setlistDataNamHoc(dataMap);

    const idInit = dataMap?.[0]?.value;

    await getData(idInit);

    setloading(false);
  };

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

  if (loading) {
    return null;
  }

  const getMore = () => {
    navigateScreen(APP_SCREEN.QUANLYKHOAHOCV2);
  };

  return (
    <VStack>
      <ItemTextBlue
        label={translate('slink:Scientific_research')}
        onPress={getMore}
      />
      <ViewFilterNB
        marginTop={HEIGHT(20)}
        width={WIDTH(343)}
        alignSelf="center"
        data={listDataNamHoc}
        onChange={onChange}
      />
      <Swiper autoplay style={{ height: HEIGHT(310) }}>
        <BarchartThongKeNCKH data={listThongKe} home={true} />
        <PieChartNCKH
          tieuDe={translate('slink:Standard_time_for_scientific_research')}
          thongKeGio={thongKeGio}
          home={true}
          listLH={listLH}
          type={ECHART_NCKH_TYPE.GIO}
        />
        <PieChartNCKH
          tieuDe={translate('slink:Point_of_scientific_work')}
          listLH={listLHTinhDiem}
          home={true}
          thongKeGio={thongKeDiem}
          type={ECHART_NCKH_TYPE.DIEM}
        />
      </Swiper>
    </VStack>
  );
};

export default DashBardHome;
