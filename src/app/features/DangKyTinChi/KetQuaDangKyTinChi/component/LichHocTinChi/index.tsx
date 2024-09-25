/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';

import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
} from 'react-native-calendars';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemPindDay from '@components/Item/ItemPinDay';
import ItemTrong from '@components/Item/ItemTrong';

import {
  findClosestIndexGreaterThan,
  getMarkedDates,
} from '@features/ThoiKhoaBieuV2/LichLamCalendar/agendaItems';
import testIDs from '@features/ThoiKhoaBieuV2/LichLamCalendar/testIDs';
import {
  getTheme,
  themeColor,
} from '@features/ThoiKhoaBieuV2/LichLamCalendar/theme';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import _, { debounce } from 'lodash';
import moment from 'moment';
import { Box, ScrollView } from 'native-base';

import ItemAgenda from './ItemAgenda';
import { ExtraThoiKhoaBieuList, LopHPSvList } from '../../type';
interface Props {
  route: { params: { listMonHoc: LopHPSvList[] } };
}
const LichHocTinChi = (props: Props) => {
  const listMonHoc = props?.route?.params?.listMonHoc;

  const calendarSubject: ExtraThoiKhoaBieuList[] = [];

  const theme = useRef(getTheme());

  const scrollRef = useRef<any>(null);

  const [toDay, settoDay] = useState('');

  const result = useRef<number[]>([]);

  listMonHoc?.forEach(item => {
    item?.lopHocPhan?.thoiKhoaBieuList?.forEach(e => {
      const oneSubjectinDay = {
        ...e,
        monHoc: item?.lopHocPhan?.hocPhan?.ten,
        maMonHoc: item?.lopHocPhan?.hocPhan?.ma,
      };

      calendarSubject.push(oneSubjectinDay);
    });
  });

  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });

  const listCNHK = _.groupBy(calendarSubject, (item: ExtraThoiKhoaBieuList) =>
    moment(item?.thoiGianBatDau)?.format('YYYY-MM-DD'),
  );

  const transformedDataHK =
    _.map(listCNHK, (data, title) => ({
      title,
      data,
    })) ?? [];

  const datainCalendar = _.sortBy(transformedDataHK, item => item.title);

  const marked = getMarkedDates(datainCalendar);

  const handleRef = (ref: any) => {
    scrollRef.current = ref;
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    const index = findClosestIndexGreaterThan(result.current, offsetY);

    const currentDay = datainCalendar?.[index]?.title;

    handleScrollDebounced(currentDay);
  };

  const handleScrollDebounced = debounce(currentPosition => {
    requestAnimationFrame(() => {
      settoDay(currentPosition);
    });
  }, 100);

  const onLayout = (event: LayoutChangeEvent) => {
    result.current.push(event?.nativeEvent?.layout?.y);
  };

  const scrollToCurrent = (positions: number[], dayValue?: string) => {
    const index = datainCalendar.findIndex(
      (item: { data: ExtraThoiKhoaBieuList[]; title: string }) =>
        item?.title === dayValue,
    );

    if (index !== -1) {
      scrollRef.current?.scrollTo({
        x: 0,
        y: positions?.[index],
        animated: true,
      });
    }
  };

  const onDayPress = (date: DateData) => {
    if (result.current.length === datainCalendar.length) {
      const positions = result.current.sort((a, b) => a - b);

      scrollToCurrent(positions, date?.dateString);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.white}>
      <HeaderReal title={translate('slink:Expected_class_schedule')} />
      <CalendarProvider
        date={datainCalendar?.[0]?.title || moment().format('YYYY-MM-DD')}
        disabledOpacity={0.6}
        theme={todayBtnTheme.current}
        todayBottomMargin={16}>
        <ExpandableCalendar
          onDayPress={onDayPress}
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
      <Box flex={1}>
        <ItemPindDay isVisible={!!toDay} ngayPindCur={toDay} />
        <ScrollView
          ref={handleRef}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={20}
          onScroll={onScroll}
          nestedScrollEnabled
          contentContainerStyle={styles.contentContainer}
          style={styles.list}>
          {datainCalendar?.length === 0 ? (
            <ItemTrong />
          ) : (
            datainCalendar.map((item, index) => (
              <ItemAgenda
                index={index}
                onLayout={onLayout}
                key={index}
                data={item}
              />
            ))
          )}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default LichHocTinChi;

const styles = StyleSheet.create({
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
