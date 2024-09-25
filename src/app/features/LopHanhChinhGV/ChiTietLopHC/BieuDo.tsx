import React from 'react';
import { processColor, StyleSheet, Text, View } from 'react-native';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarChart } from 'react-native-charts-wrapper';

// components
import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
interface Props {
  listDiem?: any;
}
const BieuDoLHC = ({ data }: { data: any }) => {
  const listDiem = [
    data?.diemTichLuyNhoNhat || 0,
    data?.diemTichLuyTB || 0,
    data?.diemTichLuyLonNhat || 0,
  ];

  return (
    <View>
      <ViewChart listDiem={listDiem} />
    </View>
  );
};

export default BieuDoLHC;

const ViewChart = (props: Props) => {
  const { listDiem } = props;

  const listValueFormatter = ['Thấp nhất', 'Trung bình', 'Cao nhất'];

  return (
    <View style={styles.viewChart}>
      <Text style={styles.title}>Đơn vị: GPA</Text>
      <BarChart
        style={styles.chart}
        xAxis={{
          valueFormatter: listValueFormatter,
          granularityEnabled: true,
          granularity: 1,
          position: 'BOTTOM',
          drawGridLines: false,
          drawLabels: true,
          textColor: processColor(R.colors.colorABABAB),
          textSize: getFontSize(9),
        }}
        animation={{ durationY: 1500, easingY: 'EaseInCirc' }}
        visibleRange={{
          x: {
            min: 1,
            max: 3,
          },
        }}
        data={{
          dataSets: [
            {
              values: listDiem,
              label: '',
              config: {
                valueTextColor: processColor(R.colors.colorPink),
                valueTextSize: getFontSize(12),
                valueFormatter: '#0.00',
                color: processColor(R.colors.colorPink),
              },
            },
          ],
          config: {
            barWidth: WIDTH(0.2),
          },
        }}
        chartDescription={{
          text: '',
        }}
        legend={{
          enabled: false,
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
            textColor: processColor(R.colors.colorABABAB),
          },
          right: {
            enabled: false,
          },
        }}
        scaleEnabled={false}
      />
      <Text style={styles.tongGio}>
        {translate('slink:Class_cumulative_points')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    width: WIDTH(320),
    height: HEIGHT(300),
    alignSelf: 'center',
    marginVertical: HEIGHT(16),
  },
  tongGio: {
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.black0,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    alignSelf: 'center',
  },
  viewChart: {
    width: WIDTH(342),
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    alignSelf: 'center',
    marginTop: HEIGHT(24),
    padding: WIDTH(16),
  },
  title: {
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.colorABABAB,
    fontSize: getFontSize(11),
    // lineHeight: getLineHeight(14),
  },
});
