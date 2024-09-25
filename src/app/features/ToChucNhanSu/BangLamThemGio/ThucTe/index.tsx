/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import R from '@assets/R';
import { WIDTH } from '@common';
import AddPlus from '@components/AddPlus';
import { EMapColorTrangThaiLamNgoaiGio } from '@features/VanPhongSo/LichTuanHocVien/constant';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getLichLamThemGioDuKien } from '@networking/user';
import moment from 'moment';
import { Skeleton, VStack } from 'native-base';

import LichLamCalendar from './Items/LichLamCalendar';
import ListEvent from './Items/ListEvent';

// item

const ThucTe = () => {
  const [day, setDay] = useState(moment(new Date()).format('DD/MM/YYYY'));

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();

  useEffect(() => {
    getData(new Date().getMonth() + 1, new Date().getUTCFullYear());
  }, []);

  const getData = async (month: number, year: number) => {
    try {
      setLoading(true);

      const condition = {
        condition: {
          thang: month,
          nam: year,
          loai: 'lam-ngoai-gio',
        },
      };

      const responseCalendarWeek: any = await getLichLamThemGioDuKien(
        condition,
      );

      setData(responseCalendarWeek?.data?.data?.danhSachDon ?? []);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <LichLamCalendar
          onChangeMonth={getData}
          data={dataToCalFormat(data)}
          onDayPress={setDay}
        />

        {loading ? (
          <VStack
            w={WIDTH(320)}
            space={2}
            overflow="hidden"
            rounded="md"
            alignSelf={'center'}
            mt="4">
            <Skeleton h="10" backgroundColor={'primary.500'} />
            <Skeleton.Text lines={1} w="30%" />
            <Skeleton.Text lines={1} w="50%" />
            <Skeleton.Text lines={1} w="30%" />
          </VStack>
        ) : (
          <ListEvent day={day} data={data} />
        )}
      </ScrollView>
      <AddPlus
        onAdd={() =>
          navigateScreen(APP_SCREEN.THEMMOILICHLAMTHEMGIO, {
            isThucTe: true,
            onRefresh: () => {
              getData(new Date().getMonth() + 1, new Date().getUTCFullYear());
            },
          })
        }
      />
    </View>
  );
};

export default ThucTe;
const dataToCalFormat = data => {
  const formatLichArr = data?.reduce((a, v) => {
    const curDotList = a?.[moment(v?.tuNgay).format('YYYY-MM-DD')]?.dots;

    return {
      ...a,
      [moment(v?.tuNgay).format('YYYY-MM-DD')]: {
        dots: [
          ...[curDotList ? curDotList : {}],
          {
            color:
              EMapColorTrangThaiLamNgoaiGio?.[v?.loaiLamThemGio] ??
              'tranparent',
          },
        ],
      },
    };
  }, {});

  return formatLichArr;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.white,
    flex: 1,
  },
});
