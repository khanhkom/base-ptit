/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import ViewFilterNB from '@components/ViewFilterNB';
import { HEIGHT, WIDTH } from '@config/function';
import moment from 'moment';

interface Props {
  onChange?: (e: number) => void;
  width?: number;
  marginBottom?: number;
}
const SelectTuan = (props: Props) => {
  const { onChange, width, marginBottom } = props;

  const onChangeValue = (value: any) => {
    onChange && onChange(value);
  };

  const curWeek = moment().week();

  return (
    <ViewFilterNB
      loading={false}
      width={width ?? WIDTH(343)}
      marginBottom={marginBottom ?? HEIGHT(16)}
      alignSelf="center"
      data={getWeeksInYear()?.map(item => {
        return {
          value: item?.weekIndex,
          label: `Tuần ${item?.weekIndex} (Từ ${item?.weekStart} đến ${item?.weekEnd})`,
        };
      })}
      onChange={onChangeValue}
      defaultValue={curWeek}
      marginTop={'4'}
    />
  );
};

export default SelectTuan;
function getWeeksInYear() {
  const year = moment().year();

  const weeks: any = [];

  const startDate = moment([year]).startOf('year').startOf('isoWeek');

  const endDate = moment([year]).endOf('year').endOf('isoWeek');

  const currentWeekStart = startDate.clone();

  const currentWeekEnd = startDate.clone().endOf('isoWeek');

  let weekIndex = 1;

  while (currentWeekStart.isBefore(endDate)) {
    weeks.push({
      weekIndex: weekIndex,
      weekStart: currentWeekStart.clone().format('DD/MM'),
      weekEnd: currentWeekEnd.clone().format('DD/MM'),
    });

    currentWeekStart.add(1, 'week');

    currentWeekEnd.add(1, 'week');

    weekIndex++;
  }

  return weeks;
}
