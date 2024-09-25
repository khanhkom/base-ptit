/* eslint-disable no-unsafe-optional-chaining */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// api

// config

// common

// navigation

import R from '@assets/R';
import { WIDTH } from '@common';
import { EMapColorTrangThaiChamCong } from '@config/constant';
import HeaderReal from '@libcomponents/header-real';
import {
  getBangChamCongTheoThang,
  getThongTinChamCong,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Skeleton, VStack } from 'native-base';

import Legend from './Items/Legend';
import LichLamCalendar from './Items/LichLamCalendar';
import ListEvent from './Items/ListEvent';

// item

const BangChamCong = () => {
  const [day, setDay] = useState(moment(new Date()).format('DD/MM/YYYY'));

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();

  const [dataCanBo, setDataCanBo] = useState();

  useEffect(() => {
    getData(new Date().getMonth() + 1, new Date().getUTCFullYear());
  }, []);

  const getData = async (month: number, year: number) => {
    try {
      setLoading(true);

      const bodyThongTinChamCong = {
        condition: {
          nam: year,
          thang: month,
        },
      };

      const resInfo = await getThongTinChamCong(bodyThongTinChamCong);

      setDataCanBo(resInfo);

      const bodyChamCong = {
        condition: {
          nam: year,
          thang: month,
          ssoId: resInfo?.ssoId,
        },
      };

      const res = await getBangChamCongTheoThang(bodyChamCong);

      setData(res ?? []);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Attendance_sheet')} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <LichLamCalendar
          onChangeMonth={getData}
          data={dataToCalFormat(data)}
          onDayPress={setDay}
        />
        <Legend />
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
          <ListEvent day={day} data={data} dataCanBo={dataCanBo} />
        )}
      </ScrollView>
    </View>
  );
};

export default BangChamCong;
const dataToCalFormat = data => {
  const formatLichArr = data?.reduce(
    (a, v) => ({
      ...a,
      [moment(v?.ngayCong).format('YYYY-MM-DD')]: a?.[
        moment(v?.ngayCong).format('YYYY-MM-DD')
      ]
        ? {
            dots:
              v?.buoi === 'Sáng'
                ? [
                    {
                      color:
                        EMapColorTrangThaiChamCong[v?.trangThaiChamCong] ??
                        'tranparent',
                    },

                    ...a?.[moment(v?.ngayCong).format('YYYY-MM-DD')]?.dots,
                  ]
                : [
                    ...a?.[moment(v?.ngayCong).format('YYYY-MM-DD')]?.dots,
                    {
                      color:
                        EMapColorTrangThaiChamCong[v?.trangThaiChamCong] ??
                        'tranparent',
                    },
                  ],
          }
        : {
            dots: [
              {
                color:
                  EMapColorTrangThaiChamCong[v?.trangThaiChamCong] ??
                  'tranparent',
              },
            ],
          },
    }),
    {},
  );

  return formatLichArr;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.white,
    flex: 1,
  },
});
