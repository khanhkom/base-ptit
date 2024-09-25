/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Calendar, LocaleConfig } from 'react-native-calendars';

import R from '@assets/R';
import { WIDTH } from '@common';
import {
  getTheme,
  // themeColor,
} from '@features/ThoiKhoaBieuV2/LichLamCalendar/theme';
import moment from 'moment';

const LichLamCalendar = ({ data, onChangeMonth, onDayPress }: any) => {
  const theme = useRef(getTheme());

  const [selected, setSelected] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const markArray = {
    ...data,
    [selected]: { selectedColor: R.colors.colorPink, selected: true },
  };

  return (
    <Calendar
      firstDay={1}
      style={styles.calendar}
      theme={theme.current}
      markingType={'multi-dot'}
      current={moment(new Date()).format('YYYY-MM-DD')}
      onDayPress={day => {
        console.log('selected day', day);

        setSelected(day.dateString);

        if (onDayPress) {
          onDayPress(moment(day.dateString, 'YYYY-MM-DD').format('DD/MM/YYYY'));
        }
      }}
      hideExtraDays
      onMonthChange={month => {
        onDayPress(
          `01/${month.month >= 10 ? month.month : `0${month.month}`}/${
            month.year
          }`,
        );

        setSelected(
          `${month.year}-${
            month.month >= 10 ? month.month : `0${month.month}`
          }-01`,
        );

        if (onChangeMonth) {
          onChangeMonth(month.month, month.year);
        }
      }}
      markedDates={markArray}
    />
  );
};

const ARRAY_MONTH = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

const ARRAY_DAY = [
  'Chủ Nhật',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];

const ARRAY_SHORT_DAY = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

LocaleConfig.locales.vn = {
  monthNames: ARRAY_MONTH,
  dayNames: ARRAY_DAY,
  dayNamesShort: ARRAY_SHORT_DAY,
};

LocaleConfig.defaultLocale = 'vn';

export default LichLamCalendar;
// const themeCalendar: any = {
//   arrowColor: R.colors.grey400,
//   backgroundColor: R.colors.white,
//   calendarBackground: R.colors.white,
//   dayTextColor: R.colors.black0,
//   monthTextColor: R.colors.black0,
//   textDayFontFamily: R.fonts.BeVietnamProMedium,
//   textDayFontSize: getFontSize(15),
//   textDayHeaderFontFamily: R.fonts.BeVietnamProMedium,
//   textDayHeaderFontSize: getFontSize(15),
//   textMonthFontFamily: R.fonts.BeVietnamProMedium,
//   textMonthFontSize: getFontSize(16),
//   textMonthFontWeight: 'bold',
//   todayBackgroundColor: R.colors.white,
//   todayTextColor: R.colors.black0,
// };

const styles = StyleSheet.create({
  calendar: {
    alignSelf: 'center',
    width: WIDTH(350),
  },
});
