/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';

import { getMarkedDates } from '@features/ThoiKhoaBieuV2/LichLamCalendar/agendaItems';
import testIDs from '@features/ThoiKhoaBieuV2/LichLamCalendar/testIDs';
import {
  getTheme,
  themeColor,
} from '@features/ThoiKhoaBieuV2/LichLamCalendar/theme';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import { Box, FlatList } from 'native-base';

import ItemAgenda from './ItemAgenda';
import { ExtraThoiKhoaBieuList } from '@features/DangKyTinChi/KetQuaDangKyTinChi/type';
import { LopHocPhanDKTCProps, ThoiKhoaBieuListProps } from '../type';
interface Props {
  route: { params: { listMonHoc: LopHocPhanDKTCProps[] } };
}
const XemTruocLichLTC = (props: Props) => {
  const listMonHoc = props?.route?.params?.listMonHoc;
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });
  const [dayPress, setdayPress] = useState<string>();
  const calendarSubject = listMonHoc?.reduce(
    (acc: ThoiKhoaBieuListProps[], item) => {
      const { hocPhan, ten, thoiKhoaBieuList } = item;
      const flattenedItems = thoiKhoaBieuList.map(thoiKhoaBieu => ({
        tenMonHoc: hocPhan?.ten,
        ten,
        ...thoiKhoaBieu,
      }));
      return acc?.concat(flattenedItems);
    },
    [],
  );

  const listCNHK = _.groupBy(
    calendarSubject,
    (item: ExtraThoiKhoaBieuList) => item?.ngay,
  );

  const transformedDataHK =
    _.map(listCNHK, (data, title) => ({
      title,
      data,
    })) ?? [];

  const datainCalendar = _.sortBy(transformedDataHK, item => item.title);

  const marked = getMarkedDates(datainCalendar);
  const onDateChanged = (val: string) => {
    setdayPress(val);
  };
  const listMonHocInDay =
    calendarSubject?.filter(item => {
      return dayPress
        ? item?.ngay == dayPress
        : item?.ngay === datainCalendar?.[0]?.title;
    }) || [];
  return (
    <Box flex={1} backgroundColor={R.colors.white}>
      <HeaderReal title={translate('slink:Expected_class_schedule')} />
      <CalendarProvider
        style={{ backgroundColor: 'yellow' }}
        date={datainCalendar?.[0]?.title || moment().format('YYYY-MM-DD')}
        disabledOpacity={0.6}
        onDateChanged={onDateChanged}
        theme={todayBtnTheme.current}
        todayBottomMargin={16}>
        <ExpandableCalendar
          testID={testIDs.expandableCalendar.CONTAINER}
          initialPosition={ExpandableCalendar.positions.OPEN}
          calendarStyle={styles.calendar}
          theme={theme.current}
          firstDay={1}
          maximumZoomScale={100}
          markedDates={marked}
          scrollEnabled
        />
      </CalendarProvider>
      <FlatList
        data={listMonHocInDay}
        extraData={listMonHocInDay}
        contentContainerStyle={styles.content}
        ListEmptyComponent={<ItemTrong />}
        renderItem={({ item, index }) => <ItemAgenda key={index} data={item} />}
      />
    </Box>
  );
};

export default XemTruocLichLTC;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentContainer: {
    paddingBottom: HEIGHT(20),
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(20),
  },
  list: { flex: 1, flexGrow: 1 },
});
