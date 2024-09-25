/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import { getLichNghiTuan } from '@networking/user/LichTuan';
import _ from 'lodash';
import moment from 'moment';
import { Box, FlatList } from 'native-base';

import ItemDonXinNghi from './Item/ItemDonXinNghi';
import styles from './styles';

const DanhSachDonXinNghi = props => {
  const curDate = props?.route?.params?.curDate;

  const [listClass, setlistClass] = useState<Array<any>>([]);

  const weekMoment = moment(curDate).week();

  const [weekCur, setWeekCur] = useState(weekMoment);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getDataLichNghi(weekCur);
  }, []);

  const getDataLichNghi = async week => {
    setloading(true);

    try {
      const res: any = await getLichNghiTuan(moment().year(), week ?? weekCur);

      const formatData = processData(res?.data?.data);

      setlistClass(formatData ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  return (
    <Box style={styles.container}>
      <HeaderReal title={'Lịch nghỉ'} />
      <FlatList
        data={listClass}
        extraData={listClass}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={() => getDataLichNghi(weekCur)}
        ListEmptyComponent={<ItemTrong />}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item, index }) => (
          <ItemDonXinNghi item={item} index={index} />
        )}
      />
    </Box>
  );
};

export default DanhSachDonXinNghi;
const processData = (data: any[]) => {
  const calculateHoursDifference = (start: any, end: any) => {
    const startTime = new Date(start).getTime();

    const endTime = new Date(end).getTime();

    return (endTime - startTime) / (1000 * 60 * 60);
  };

  const formatDate = (date: any) => {
    const d = new Date(date);

    const day = d.getDate();

    const month = d.getMonth() + 1;

    return `${day}/${month}`;
  };

  const summary = _.sortBy(data, ['thoiGianBatDau']).reduce(
    (acc: any, item: any) => {
      const { ssoId, ten, tenDonVi } = item?.chuTri?.[0];

      const hours = calculateHoursDifference(
        item?.thoiGianBatDau,
        item?.thoiGianKetThuc,
      );

      if (!acc[ssoId]) {
        acc[ssoId] = {
          ten,
          tenDonVi,
          totalHours: 0,
          restTimes: [],
        };
      }

      acc[ssoId].totalHours += hours;

      acc?.[ssoId]?.restTimes.push({
        start: item?.thoiGianBatDau,
        end: item?.thoiGianKetThuc,
        hours,
      });

      return acc;
    },
    {},
  );

  return Object.values(summary).map((person: any) => {
    const totalDaysOff = person?.totalHours / 8;

    let formattedRestTimes = '';
    if (totalDaysOff === 0.5) {
      formattedRestTimes = person?.restTimes
        ?.map((time: any) => {
          const startHour = new Date(time?.start).getHours();

          const period = startHour < 12 ? 'Buổi sáng' : 'Buổi chiều';

          const date = formatDate(time?.start);

          return `${period} ${date}`;
        })
        .join(', ');
    } else if (totalDaysOff >= 1) {
      formattedRestTimes = person?.restTimes
        .map((time: any, index: any, restTimes: any) => {
          const startHour = new Date(time?.start).getHours();

          const period = startHour < 12 ? 'Buổi sáng' : 'Buổi chiều';

          const date = formatDate(time?.start);

          const sameDayRestTimes = restTimes?.filter((t: any) => {
            const tDate = new Date(t?.start);

            return tDate.getDate() === new Date(time?.start).getDate();
          });

          const totalHours = sameDayRestTimes.reduce(
            (acc: any, t: any) => acc + t.hours,
            0,
          );

          if (totalHours === 8) {
            return `Cả ngày ${date}`;
          } else {
            return `${period} ${date}`;
          }
        })
        .reduce((unique: any, item: any) => {
          return unique.includes(item) ? unique : [...unique, item];
        }, [])
        .join(', ');
    }

    return {
      ten: `Đ/c ${person?.ten}`,
      tenDonVi: person?.tenDonVi,
      totalDaysOff: `${totalDaysOff} ngày`,
      restTimes: formattedRestTimes,
    };
  });
};
