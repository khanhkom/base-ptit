/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { DateData } from 'react-native-calendars';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { CallRatingApp, getStartAndEndOfMonth, LOAI_SU_KIEN } from '@common';
import AddPlus from '@components/AddPlus';
import SkeletonCalendarWeek from '@features/VanPhongSo/LichTuanHocVien/component/SkeletonCalendarWeek';
import HeaderReal from '@libcomponents/header-real';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getLichKhaoThiNVFromTo,
  getLichKhaoThiSVFromTo,
  getLichNVFromTo,
  getLichSuKien,
  getLichSVFromTo,
  getLichTuanMe,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import { Box } from 'native-base';
// import Icon from 'react-native-vector-icons/Feather';
import AgendaList from './AgendaList';
import LichLamCalendar from './LichLamCalendar/LichLamCalendar';
import styles from './styles';
import { LichProp } from './type';

const ThoiKhoaBieuV2 = () => {
  const { account } = useSelector(selectAppConfig);
  // const [visibleFilter, setvisibleFilter] = useState(false);
  const [dataTKB, setdataTKB] = useState<any[]>([]);

  const toDay = moment().format('YYYY-MM-DD');

  const [datePress, setdatePress] = useState<string>(toDay);

  const [dayScroll, setdayScroll] = useState<string>(toDay);

  const [loading, setloading] = useState<boolean>(false);

  const [position, setPosition] = useState<boolean>(false);

  const fromDate = getStartAndEndOfMonth(position, datePress)?.start;

  const toDate = getStartAndEndOfMonth(position, datePress)?.end;

  useEffect(() => {
    getData();
  }, [fromDate, toDate]);

  const getData = async () => {
    try {
      setloading(true);

      const body = {};

      let lichHoc: any;
      let lichKhaoThi: any;
      let lichSuKien: any;
      let lichBanThan: any = [];
      if (!account?.isGiaoVien) {
        lichHoc = await getLichSVFromTo(fromDate, toDate);

        lichKhaoThi = await getLichKhaoThiSVFromTo(fromDate, toDate);

        lichSuKien = await getLichSuKien(body, fromDate, toDate);
      } else {
        lichHoc = await getLichNVFromTo(fromDate, toDate);

        lichKhaoThi = await getLichKhaoThiNVFromTo(fromDate, toDate);

        lichSuKien = await getLichSuKien(body, fromDate, toDate);

        lichBanThan = await getLichTuanMe(fromDate, toDate);
      }

      await Promise.all([lichHoc, lichKhaoThi, lichSuKien, lichBanThan]);

      const lichHocNew =
        lichHoc?.data?.data?.map((item: any) => {
          return {
            ...item,
            loaiSuKien: account?.isGiaoVien
              ? LOAI_SU_KIEN.LICH_GIANG_DAY
              : LOAI_SU_KIEN.LICH_HOC,
          };
        }) ?? [];

      const lichThiNew =
        lichKhaoThi?.data?.data?.map((item: any) => {
          return {
            ...item,
            loaiSuKien: account?.isGiaoVien
              ? LOAI_SU_KIEN.LICH_COI_THI
              : LOAI_SU_KIEN.LICH_THI,
          };
        }) ?? [];

      const lichSuKienNew =
        lichSuKien?.data?.data?.map((item: any) => {
          return { ...item };
        }) ?? [];

      const lichBanThanNew =
        lichBanThan?.data?.data?.map((item: any) => {
          return { ...item, loaiSuKien: LOAI_SU_KIEN.LICH_TUAN };
        }) ?? [];

      const listLich = [
        ...lichHocNew,
        ...lichSuKienNew,
        ...lichThiNew,
        ...lichBanThanNew,
      ];

      const listCNHK = _.groupBy(listLich, (item: LichProp) =>
        moment(item?.thoiGianBatDau)?.format('YYYY-MM-DD'),
      );

      const transformedDataHK =
        _.map(listCNHK, (data, title) => ({
          title,
          data,
        })) ?? [];

      setdataTKB(_.sortBy(transformedDataHK, item => item.title));

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const onDayScroll = (date: string) => {
    setdayScroll(date);
  };

  const onDayPress = (date: DateData) => {
    setdatePress(date?.dateString);
  };

  const onChangedDate = (dateString: string) => {
    setdatePress(dateString);
  };

  const onRefresh = () => {
    getData();

    setTimeout(CallRatingApp, 2000);
  };

  const onAdd = () => {
    navigateScreen(APP_SCREEN.ADDEVENTCALENDAR, { onRefresh });
  };

  const onPosition = (val: boolean) => {
    setPosition(val);
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal
          title={
            account?.isGiaoVien
              ? translate('slink:Calendar')
              : translate('slink:TimeTable')
          }
        />
        <View style={styles.content}>
          <LichLamCalendar
            loading
            onPosition={onPosition}
            onChangedDate={onChangedDate}
            dayScroll={dayScroll}
            onDayPress={onDayPress}
            data={dataTKB}
          />
          <SkeletonCalendarWeek />
          <AddPlus onAdd={onAdd} />
        </View>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={
          account?.isGiaoVien
            ? translate('slink:Calendar')
            : translate('slink:TimeTable')
        }
      />
      <View style={styles.content}>
        <LichLamCalendar
          loading={loading}
          onPosition={onPosition}
          onChangedDate={onChangedDate}
          dayScroll={dayScroll}
          onDayPress={onDayPress}
          // onChangeMonth={onChangeMonth}
          data={dataTKB}
        />
        <AgendaList
          onRefresh={getData}
          onDayScroll={onDayScroll}
          datePress={datePress}
          dataTKB={dataTKB}
        />
        <AddPlus onAdd={onAdd} />
      </View>
    </Box>
  );
};

export default ThoiKhoaBieuV2;
