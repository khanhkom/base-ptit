/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Platform, processColor, StyleSheet } from 'react-native';

import { BarChart, LineChart } from 'react-native-charts-wrapper';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import { Text, VStack } from 'native-base';

import { BieuDoProp } from './type';
import { translate } from '@utils/i18n/translate';

const BangThongKeTinChi = ({ data }: { data: BieuDoProp[] }) => {
  const dataTongSoTinChi =
    data?.map(
      (
        item: {
          [x: string]: any;
          trungBinhHocKyThang4: any;
        },
        index: number,
      ) => {
        return {
          y: [
            item?.tongSoTinChiTichLuyHocKy ?? 0,
            item?.tongSoTinChiNoHocKy ?? 0,
          ],
          marker: ['TC tích lũy', 'TC nợ'],
        };
      },
    ) ?? [];

  const dataTinChiTichLuy =
    data?.map(
      (
        item: {
          [x: string]: any;
          trungBinhTichLuyToanKhoaThang4: any;
        },
        index: number,
      ) => {
        return {
          y: [
            item?.tongSoTinChiTichLuyToanKhoa ?? 0,
            item?.tongSoTinChiNoToanKhoa ?? 0,
          ],
          marker: ['Tổng TC tích lũy', 'Tổng TC nợ'],
        };
      },
    ) ?? [];

  const listValueFormatter = data?.map((item: { thuTuHocKy: any }) => {
    return `${item?.thuTuHocKy}`;
  });

  return (
    <VStack mb="4" px="4">
      <Text fontSize={getFontSize(12)} fontFamily={R.fonts.BeVietnamProMedium}>
        {translate('slink:Number_of_credits')}
      </Text>
      <BarChart
        style={styles.chart}
        xAxis={{
          valueFormatter: listValueFormatter,
          granularityEnabled: true,
          granularity: 1,
          position: 'BOTTOM',
          drawGridLines: false,
          drawLabels: true,
          fontFamily: R.fonts.BeVietnamProMedium,
          textColor: processColor(R.colors.colorABABAB),
          textSize: getFontSize(12),
          // gridLineWidth: 1000,
        }}
        animation={{ durationY: 1500, easingY: 'EaseInCirc' }}
        visibleRange={{
          x: {
            // min: 10,
            // max: 8,
          },
          y: {
            left: { min: 4 },
          },
        }}
        data={{
          dataSets: [
            {
              values: dataTongSoTinChi,
              label: 'Điểm cá nhân',
              config: {
                valueTextColor: processColor(R.colors.black0),
                valueTextSize: getFontSize(12),
                valueFormatter: '#0',
                colors: [processColor('#8FC8EF'), processColor('#FFF78C')],

                // drawValues: false,
              },
            },

            {
              values: dataTinChiTichLuy,
              label: 'Điểm toàn khóa',
              config: {
                valueTextColor: processColor(R.colors.black0),
                valueTextSize: getFontSize(12),
                valueFormatter: '#0',
                colors: [processColor('#C0FF8C'), processColor('#FC9168')],

                // drawValues: false,
              },
            },
          ],
          config: {
            barWidth: 0.325,
            group: {
              fromX: -0.5,
              groupSpace: 0.15,
              barSpace: 0.1,
            },
          },

          // config: {
          //   barWidth: 0.5,
          // },
        }}
        chartDescription={{
          text: '',
        }}
        extraOffsets={{
          bottom: Platform.OS === 'ios' ? 0 : 15,
          top: Platform.OS === 'ios' ? 25 : 5,
        }}
        legend={{
          enabled: true,
          verticalAlignment: 'BOTTOM',
          horizontalAlignment: 'CENTER',
          //   orientation: 'VERTICAL',
          // yEntrySpace: 100,
          formSize: WIDTH(14),
          form: 'CIRCLE',
          textSize: getFontSize(10),
          fontFamily: R.fonts.BeVietnamProMedium,
          custom: {
            colors: [
              processColor('#8FC8EF'),
              processColor('#FFF78C'),
              processColor('#C0FF8C'),
              processColor('#FC9168'),
            ],
            labels: [
              'Số TC tích lũy HK 1',
              'Số TC nợ HK',
              'Tổng số TC tích lũy',
              'Số TC nợ HK',
            ],
          },
          // yEntrySpace: 100,
        }}
        marker={{
          enabled: true,
          digits: 1,
        }}
        yAxis={{
          left: {
            axisMinimum: 0,
            axisLineColor: processColor(R.colors.white),
            textSize: getFontSize(12),
            fontFamily: R.fonts.BeVietnamProMedium,
            textColor: processColor(R.colors.colorABABAB),
            granularityEnabled: true,
            granularity: 1,
          },
          right: {
            enabled: false,
          },
        }}
        scaleEnabled={false}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  chart: {
    height: HEIGHT(200),
  },
});

export default BangThongKeTinChi;
