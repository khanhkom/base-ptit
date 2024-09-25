/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { processColor, StyleSheet, Text, View } from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';

// components
import R from '@assets/R';
import {
  getFontSize,
  getLineHeight,
  HEIGHT,
  roundNumberWith2DigitsAfterComma,
  WIDTH,
} from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { translate } from '@utils/i18n/translate';

interface Props {
  listGioGiang: any[];
  tongGioGiang: number;
}

const ViewChart = (props: Props) => {
  const { listGioGiang, tongGioGiang } = props;

  const listValueFormatter = listGioGiang
    ?.sort((a, b) => b?.gio - a?.gio)
    ?.map(item => item?.hinhThuc);

  const listValue = listGioGiang
    ?.sort((a, b) => b?.gio - a?.gio)
    ?.map(item => item?.gio);

  if (listGioGiang?.length === 0) {
    return <ItemTrong content={translate('slink:No_data')} />;
  }

  return (
    <View style={styles.viewChart}>
      <Text style={styles.title}>
        {translate('slink:Unit')}: {translate('slink:Hour')}
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
              values: listValue,
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
            barWidth: WIDTH(0.4),
            // group: {
            //   fromX: 0,
            //   groupSpace: 0.1,
            //   barSpace: 0.1,
            // },
          },
        }}
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
        {`${translate('slink:Tong_so_gio')}: `}
        <Text style={styles.valueGioGiang}>
          {roundNumberWith2DigitsAfterComma(tongGioGiang)}
        </Text>
      </Text>
    </View>
  );
};

export default ViewChart;

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
  valueGioGiang: {
    fontSize: getFontSize(14),
    color: R.colors.colorPink,
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  title: {
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.colorABABAB,
    fontSize: getFontSize(11),
    // lineHeight: getLineHeight(14),
  },
});
