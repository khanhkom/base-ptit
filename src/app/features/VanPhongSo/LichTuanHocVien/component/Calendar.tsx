import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';

import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';

import { getMarkedDates } from '@features/ThoiKhoaBieuV2/LichLamCalendar/agendaItems';
import testIDs from '@features/ThoiKhoaBieuV2/LichLamCalendar/testIDs';
import {
  getTheme,
  themeColor,
} from '@features/ThoiKhoaBieuV2/LichLamCalendar/theme';
import moment from 'moment';

const CalendarLichTuan = props => {
  const { initDate, loading, dataInit, onDateChanged, onDayPress } = props;

  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });

  const theme = useRef(getTheme());

  const marked = getMarkedDates(dataInit);

  return (
    <CalendarProvider
      date={initDate ?? moment().format('YYYY-MM-DD')}
      disabledOpacity={0.6}
      onDateChanged={onDateChanged}
      theme={todayBtnTheme.current}
      todayBottomMargin={16}>
      <ExpandableCalendar
        displayLoadingIndicator={loading}
        onDayPress={onDayPress}
        testID={testIDs.expandableCalendar.CONTAINER}
        initialPosition={ExpandableCalendar.positions.CLOSED}
        calendarStyle={styles.calendar}
        theme={theme.current}
        disablePan
        firstDay={1}
        hideKnob
        maximumZoomScale={100}
        markedDates={marked}
        scrollEnabled
      />
    </CalendarProvider>
  );
};

export default CalendarLichTuan;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
