/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Platform, processColor, StyleSheet } from 'react-native';

import { LineChart } from 'react-native-charts-wrapper';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import { Text, VStack } from 'native-base';

import { BieuDoProp } from './type';

const BangThongKe = ({ data }: { data: BieuDoProp[] }) => {
  const dataTrungBinhHocKy =
    data?.map(
      (
        item: {
          [x: string]: any;
          trungBinhHocKyThang4: any;
        },
        index: number,
      ) => {
        return {
          y: item?.trungBinhHocKyThang4 ?? 0,
          x: index,
          marker: `${item?.trungBinhHocKyThang4}(cá nhân kì ${item?.thuTuHocKy})`,
        };
      },
    ) ?? [];

  const dataTrungBinhHocKyToanKhoa =
    data?.map(
      (
        item: {
          [x: string]: any;
          trungBinhTichLuyToanKhoaThang4: any;
        },
        index: number,
      ) => {
        return {
          y: item?.trungBinhTichLuyToanKhoaThang4 ?? 0,
          x: index,
          marker: `${item?.trungBinhTichLuyToanKhoaThang4} (toàn khóa kì ${item?.thuTuHocKy})`,
        };
      },
    ) ?? [];

  const listValueFormatter = data?.map((item: { thuTuHocKy: any }) => {
    return `${item?.thuTuHocKy}`;
  });

  return (
    <VStack mb="4" px="4">
      <Text fontSize={getFontSize(12)} fontFamily={R.fonts.BeVietnamProMedium}>
        {'Điểm trung bình'}
      </Text>
      <LineChart
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
              values: dataTrungBinhHocKy,
              label: 'Điểm cá nhân',
              config: {
                valueTextColor: processColor(R.colors.colorPink),
                valueTextSize: getFontSize(12),
                valueFormatter: '#0.00',
                color: processColor(R.colors.colorPink),
                drawCircles: false,
                drawFilled: true,
                fillAlpha: 60,
                fillColor: processColor(R.colors.colorPink),
              },
            },

            {
              values: dataTrungBinhHocKyToanKhoa,
              label: 'Điểm toàn khóa',
              config: {
                valueTextColor: processColor(R.colors.greenNew),
                valueTextSize: getFontSize(12),
                valueFormatter: '#0.00',
                color: processColor(R.colors.greenNew),
                drawCircles: false,
                drawFilled: true,
                fillAlpha: 60,
                fillColor: processColor(R.colors.greenNew),
              },
            },
            {
              values: [5],
              label: '',
              config: {
                valueTextColor: processColor(R.colors.white100),
                valueTextSize: getFontSize(12),
                valueFormatter: '#0',
                color: processColor(R.colors.white100),
                drawCircles: false,
              },
            },
          ],
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
          formSize: WIDTH(12),
          form: 'CIRCLE',
          textSize: getFontSize(12),
          fontFamily: R.fonts.BeVietnamProMedium,
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

export default BangThongKe;
