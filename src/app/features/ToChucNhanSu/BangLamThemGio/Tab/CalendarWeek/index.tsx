/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { DateData } from 'react-native-calendars';

import { getStartAndEndOfMonth, LOAI_SU_KIEN } from '@common';
import AddPlus from '@components/AddPlus';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getLichLamThemGioDuKien } from '@networking/user';
import _ from 'lodash';
import moment from 'moment';
import { Box } from 'native-base';

import CalendarLichTuan from '../../component/Calendar';
import SkeletonCalendarWeek from '../../component/SkeletonCalendarWeek';
import { DataCalendarWeekProps } from '../../type';
import AgendaList from '../AgendaList';

// const formatMM = 'YYYY-MM-DD';

const CalendarWeek = () => {
  const toDay = moment().format('YYYY-MM-DD');

  const [datePress, setdatePress] = useState<string>(toDay);

  const [loading, setloading] = useState(false);

  const fromDate = getStartAndEndOfMonth(false, datePress)?.start;

  const toDate = getStartAndEndOfMonth(false, datePress)?.end;

  const [listCalendar, setlistCalendar] = useState<DataCalendarWeekProps[]>([]);

  useEffect(() => {
    getData();
  }, [fromDate, toDate]);

  const getData = async () => {
    setloading(true);

    const condition = {
      condition: {
        thang: moment(fromDate).month() + 1,
        nam: moment(fromDate).year(),
        tuan: moment(fromDate).week(),
        loai: 'lam-ngoai-gio-du-kien',
      },
    };

    const responseCalendarWeek: any = await getLichLamThemGioDuKien(condition);

    const type = responseCalendarWeek?.data.data.danhSachDon?.map(item => {
      return {
        ...item,
        loaiSuKien: LOAI_SU_KIEN.LICH_LAM_THEM,
      };
    });

    setlistCalendar(type ?? []);

    // setlistCalendar(dsLich);

    setloading(false);
  };

  const onDateChanged = (date: string) => {
    setdatePress(date);
  };

  const onDayPress = (date: DateData) => {
    setdatePress(date?.dateString);
  };

  const listCNHK = _.groupBy(listCalendar, item =>
    moment(item?.tuNgay)?.format('YYYY-MM-DD'),
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
      <AddPlus
        onAdd={() =>
          navigateScreen(APP_SCREEN.THEMMOILICHLAMTHEMGIO, {
            isThucTe: false,
            onRefresh: () => {
              getData();
            },
          })
        }
      />
    </Box>
  );
};

export default CalendarWeek;
