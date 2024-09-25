/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { HEIGHT, LOAI_SU_KIEN, showToastError, WIDTH } from '@common';
import AddPlus from '@components/AddPlus';
import AgendaList from '@features/ThoiKhoaBieuV2/AgendaList';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getLichTuanNhapMany,
  getSettingTimeRegister,
} from '@networking/user/LichTuan';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import { Box, IconButton, useTheme } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import CalendarLichTuan from '../../component/Calendar';
import DuyetLichTuanBGD from '../../component/DuyetLichTuanBGD';
import SkeletonCalendarWeek from '../../component/SkeletonCalendarWeek';
import { chuyenDoiThu, LoaiDoiTuongChuTri } from '../../constant';
import { DataCalendarWeekProps } from '../../type';
interface Props {
  type: LoaiDoiTuongChuTri;
}
const formatMM = 'YYYY-MM-DD';

const RegisterCalendar = (props: Props) => {
  const { type } = props;

  const startOfNextWeek = moment()
    .startOf('isoWeek')
    .add(1, 'week')
    .format(formatMM);

  const [loading, setloading] = useState(false);

  const [day, setday] = useState(startOfNextWeek);

  const [listCalendar, setlistCalendar] = useState<DataCalendarWeekProps[]>([]);

  const [dataCauHinhThoiGian, setdataCauHinhThoiGian] = useState<any>();

  useEffect(() => {
    getData();
  }, [type]);

  useEffect(() => {
    getTime();
  }, []);

  const getTime = async () => {
    const responseTime = await getSettingTimeRegister();

    setdataCauHinhThoiGian(responseTime?.data?.data);
  };

  const thuHienTai = moment().toDate();

  const thuBatDauTrongTuan = moment(dataCauHinhThoiGian?.gioBatDau, 'HH:mm')
    .isoWeekday(dataCauHinhThoiGian?.thuBatDau ?? 0)
    .toDate();

  const thuKetThucTrongTuan = moment(dataCauHinhThoiGian?.gioKetThuc, 'HH:mm')
    .isoWeekday(dataCauHinhThoiGian?.thuKetThuc ?? 0)
    .toDate();

  const isOutofTime =
    thuHienTai < thuBatDauTrongTuan || thuHienTai > thuKetThucTrongTuan;

  const getData = async () => {
    setloading(true);

    const body =
      type === LoaiDoiTuongChuTri.TAT_CA
        ? {}
        : { condition: { loaiDoiTuong: type } };

    const responseCalendarWeek: any = await getLichTuanNhapMany(body);

    const filterLichChuaXoa = responseCalendarWeek?.data?.data?.filter(
      (item: DataCalendarWeekProps) => {
        return !item?.daXoa;
      },
    );

    const dsLich =
      filterLichChuaXoa?.map((item: DataCalendarWeekProps) => {
        return { ...item, loaiSuKien: LOAI_SU_KIEN?.LICH_TUAN };
      }) || [];

    setlistCalendar(dsLich);

    setloading(false);
  };

  const onDateChanged = (date: string) => {
    setday(date);
  };

  const tuan = moment(day, formatMM).week();

  const nam = moment(day, formatMM).year();

  const filterListCalendar = listCalendar?.filter(item => {
    return tuan === item?.tuan && nam === item?.nam;
  });

  const listCNHK = _.groupBy(filterListCalendar, item =>
    moment(item?.thoiGianBatDau)?.format('YYYY-MM-DD'),
  );

  const transformedDataHK =
    _.map(listCNHK, (data, title) => ({
      title,
      data,
    })) ?? [];

  const dataInit = _.sortBy(transformedDataHK, item => item.title);

  const navigateNewScreen = () => {
    if (isOutofTime) {
      showToastError(
        translate('slink:Time_config_lich_tuan', {
          timeStart: `${dataCauHinhThoiGian?.gioBatDau}/${chuyenDoiThu(
            dataCauHinhThoiGian?.thuBatDau,
          )}`,
          timeEnd: `${dataCauHinhThoiGian?.gioKetThuc}/${chuyenDoiThu(
            dataCauHinhThoiGian?.thuKetThuc,
          )}`,
        }),
      );

      return;
    }

    navigateScreen(APP_SCREEN.ADDNEWCALENDAR, { onRefresh: getData });
  };

  if (loading) {
    return (
      <Box flex={1}>
        <CalendarLichTuan
          onDateChanged={onDateChanged}
          dataInit={dataInit}
          initDate={startOfNextWeek}
        />
        <AddPlus onAdd={navigateNewScreen} />
        <SkeletonCalendarWeek />
        <DuyetLichTuanBGD />
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <CalendarLichTuan
        onDateChanged={onDateChanged}
        dataInit={dataInit}
        initDate={startOfNextWeek}
      />
      <AgendaList
        onRefresh={getData}
        visibleButtonLT={true}
        isWeekCalendar
        dataTKB={dataInit || []}
      />
      <AddPlus onAdd={navigateNewScreen} />
      <DuyetLichTuanBGD />
    </Box>
  );
};

export default RegisterCalendar;
