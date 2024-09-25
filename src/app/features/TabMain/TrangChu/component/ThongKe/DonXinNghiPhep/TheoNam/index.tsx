/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { processColor, StyleSheet, View } from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';

// components
import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import { Text } from 'native-base';

const DonXinNghiPhepTheoNam = ({ data }: any) => {
  const chartData = () => {
    const months: any = [];

    for (let i = 1; i <= 12; i++) {
      months.push(data?.[`soNgayNghiThang${i}`] ?? 0);
    }

    return months ?? [];
  };

  const dataChart = chartData();

  const dataConfig = {
    dataSets: [
      {
        values: dataChart,
        label: '',
        config: {
          valueTextColor: processColor(R.colors.colorPink),
          valueTextSize: getFontSize(10),
          valueFormatter: '#0.0',
          color: processColor(R.colors.colorPink),
          fontFamily: R.fonts.BeVietnamProRegular,
        },
      },
    ],
    config: {
      barWidth: 1,

      // group: {
      //   fromX: 0,
      //   groupSpace: 0.1,
      //   barSpace: 0.1,
      // },
    },
  };

  return (
    <View style={styles.viewChart}>
      <BarChart
        style={styles.chart}
        xAxis={{
          valueFormatter: [
            'T1',
            'T2',
            'T3',
            'T4',
            'T5',
            'T6',
            'T7',
            'T8',
            'T9',
            'T10',
            'T11',
            'T12',
          ],
          //   granularityEnabled: true,
          //   granularity: 1,
          labelCount: 10,
          position: 'BOTTOM',
          drawGridLines: false,
          drawLabels: true,
          textSize: getFontSize(10),
          textColor: processColor(R.colors.colorABABAB),
          fontFamily: R.fonts.BeVietnamProRegular,
          //   centerAxisLabels: true,
        }}
        animation={{ durationY: 1500, easingY: 'EaseInCirc' }}
        visibleRange={{
          x: {
            min: 12,
            max: 12,
          },
        }}
        drawValueAboveBar
        highlightFullBarEnabled
        data={dataConfig}
        chartDescription={{
          text: '',
        }}
        legend={{
          enabled: false,
        }}
        yAxis={{
          left: {
            axisMinimum: 0,
            axisLineColor: processColor(R.colors.white),
            textSize: getFontSize(10),
            textColor: processColor(R.colors.colorABABAB),
            fontFamily: R.fonts.BeVietnamProRegular,
          },
          right: {
            enabled: false,
          },
        }}
        scaleEnabled={false}
      />
      <Text
        ml="4"
        mt="4"
        fontSize={'sm'}
        color={R.colors.colorPink}
        fontFamily={R.fonts.BeVietnamProRegular}>
        {translate('slink:Unit_PerMonth')}
      </Text>
    </View>
  );
};

export default DonXinNghiPhepTheoNam;

const styles = StyleSheet.create({
  chart: {
    width: WIDTH(320),
    height: HEIGHT(200),
    alignSelf: 'center',
    // marginVertical: HEIGHT(16),
  },

  viewChart: {
    width: WIDTH(342),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    alignSelf: 'center',
    marginTop: HEIGHT(16),
    padding: WIDTH(8),
    ...R.themes.shadowOffset,
  },
});
