/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
  LocaleConfig,
} from 'react-native-calendars';

import { ARRAY_DAY, ARRAY_MONTH, ARRAY_SHORT_DAY } from '@common';
import moment from 'moment';

import { getMarkedDates } from './agendaItems';
import testIDs from './testIDs';
import { getTheme, themeColor } from './theme';

import { LichProp } from '../type';
interface Props {
  data: { title: string; data: LichProp[] }[];
  onChangeMonth?: (dateString: string) => void;
  onDayPress: (date: DateData) => void;
  dayScroll: string;
  onChangedDate: (e: string) => void;
  onPosition: (e: boolean) => void;
  loading: boolean;
}
LocaleConfig.locales.vn = {
  monthNames: ARRAY_MONTH,
  dayNames: ARRAY_DAY,
  dayNamesShort: ARRAY_SHORT_DAY,
};

LocaleConfig.defaultLocale = 'vn';

const LichLamCalendar = (props: Props) => {
  const {
    data,
    onChangeMonth,
    onDayPress,
    dayScroll,
    onChangedDate,
    loading,
    onPosition,
  } = props;

  const [marked, setmarked] = useState();

  useEffect(() => {
    setmarked(getMarkedDates(data));
  }, [data]);

  const theme = useRef(getTheme());

  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });

  const onDateChanged = useCallback((date: string) => {
    onChangedDate(date);
  }, []);

  const onMonthChange = useCallback(
    ({ dateString }: { dateString: string }) => {
      onChangeMonth?.(dateString);
    },
    [],
  );

  return (
    <View
      onLayout={(event: LayoutChangeEvent | undefined) =>
        console.log('event', event?.nativeEvent.layout.height)
      }>
      <CalendarProvider
        date={dayScroll || moment().format('YYYY-MM-DD')}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        disabledOpacity={0.6}
        theme={todayBtnTheme.current}
        todayBottomMargin={16}>
        <ExpandableCalendar
          closeOnDayPress={false}
          displayLoadingIndicator={loading}
          onCalendarToggled={onPosition}
          onDayPress={onDayPress}
          testID={testIDs.expandableCalendar.CONTAINER}
          initialPosition={ExpandableCalendar.positions.CLOSED}
          calendarStyle={styles.calendar}
          theme={theme.current}
          firstDay={1}
          maximumZoomScale={100}
          markedDates={marked}
        />
      </CalendarProvider>
    </View>
  );
};

export default LichLamCalendar;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
