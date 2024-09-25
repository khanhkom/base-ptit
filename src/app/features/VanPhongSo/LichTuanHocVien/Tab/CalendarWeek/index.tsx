/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { DateData } from 'react-native-calendars';

import { getStartAndEndOfMonth, LOAI_SU_KIEN } from '@common';
import AgendaList from '@features/ThoiKhoaBieuV2/AgendaList';
import { getLichTuanMany } from '@networking/user/LichTuan';
import _ from 'lodash';
import moment from 'moment';
import { Box } from 'native-base';

import CalendarLichTuan from '../../component/Calendar';
import SkeletonCalendarWeek from '../../component/SkeletonCalendarWeek';
import { LoaiDoiTuongChuTri } from '../../constant';
import { DataCalendarWeekProps } from '../../type';

interface Props {
  type: LoaiDoiTuongChuTri;
  setDateCur: any;
}
const CalendarWeek = (props: Props) => {
  const { type, setDateCur } = props;

  const toDay = moment().format('YYYY-MM-DD');

  const [datePress, setdatePress] = useState<string>(toDay);

  const [loading, setloading] = useState(false);

  const fromDate = getStartAndEndOfMonth(false, datePress)?.start;

  const toDate = getStartAndEndOfMonth(false, datePress)?.end;

  const [listCalendar, setlistCalendar] = useState<DataCalendarWeekProps[]>([]);

  useEffect(() => {
    getData();
  }, [type, fromDate, toDate]);

  useEffect(() => {
    setDateCur(fromDate);
  }, [fromDate, toDate]);

  const getData = async () => {
    setloading(true);

    const filters = [
      {
        values: [fromDate],
        field: 'thoiGianBatDau',
        operator: 'gte',
      },
      {
        values: [toDate],
        field: 'thoiGianKetThuc',
        operator: 'lte',
      },
    ];

    const body =
      type === LoaiDoiTuongChuTri.TAT_CA
        ? {
            filters,
          }
        : {
            filters,
            condition: {
              loaiDoiTuong: type,
            },
          };

    const responseCalendarWeek: any = await getLichTuanMany(body);

    const filterLichChuaXoa = responseCalendarWeek?.data?.data?.filter(
      (item: DataCalendarWeekProps) => {
        return !item?.daXoa;
      },
    );

    const dsLich =
      filterLichChuaXoa?.map((item: DataCalendarWeekProps) => {
        return { ...item, loaiSuKien: LOAI_SU_KIEN?.LICH_LAM_VIEC_TUAN };
      }) || [];

    setlistCalendar(dsLich);

    setloading(false);
  };

  const onDateChanged = (date: string) => {
    setdatePress(date);
  };

  const onDayPress = (date: DateData) => {
    setdatePress(date?.dateString);
  };

  const listCNHK = _.groupBy(listCalendar, item =>
    moment(item?.thoiGianBatDau)?.format('YYYY-MM-DD'),
  );

  const transformedDataHK =
    _.map(listCNHK, (data, title) => ({
      title,
      data,
    })) ?? [];

  const dataInit = _.sortBy(transformedDataHK, item => item.title);

  if (loading) {
    return (
      <Box flex={1}>
        <CalendarLichTuan
          loading={loading}
          onDayPress={onDayPress}
          onDateChanged={onDateChanged}
          dataInit={dataInit}
        />
        <SkeletonCalendarWeek />
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <CalendarLichTuan
        loading={loading}
        onDayPress={onDayPress}
        onDateChanged={onDateChanged}
        dataInit={dataInit}
      />
      <AgendaList isWeekCalendar dataTKB={dataInit} datePress={datePress} />
    </Box>
  );
};

export default CalendarWeek;
