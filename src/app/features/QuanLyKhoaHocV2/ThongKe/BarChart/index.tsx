import React from 'react';
import { processColor, StyleSheet } from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import TextLabelTCNS from '@components/BoxHSNS/TextLabelTCNS';
import { translate } from '@utils/i18n/translate';
import { Box, HStack, Text, useTheme } from 'native-base';

const LIST_STATUS = [
  'Chưa có kết quả tiếp nhận',
  'Chỉnh sửa lại',
  'Đã chỉnh sửa lại',
  'Duyệt',
  'Không duyệt',
];

interface Props {
  home?: boolean;
  data:
    | {
        _id: string;
        'Chưa có kết quả tiếp nhận': number;
        Duyệt: number;
        'Không duyệt': number;
        'Chỉnh sửa lại': number;
        'Đã chỉnh sửa lại': number;
        label: string;
      }[]
    | null;
}
const LIST_COLOR = ['#0d6efd', '#ffca2c', '#0dcaf0', '#1fba36', '#dc3545'];

const BarchartThongKeNCKH = ({ data, home }: Props) => {
  const theme = useTheme();

  const barData = {
    dataSets: [
      {
        values:
          data?.map(item => {
            const resultArray = LIST_STATUS.map(status => item[status] || 0);

            return {
              y: resultArray,
              marker: item?.label,
            };
          }) || [],
        label: '',
        config: {
          valueTextColor: processColor(theme.colors.white),
          valueTextSize: getFontSize(12),
          valueFormatter: '#0',
          colors: LIST_STATUS?.map((item, index) =>
            processColor(LIST_COLOR?.[index]),
          ),
          stackLabels: LIST_STATUS,
        },
      },
    ],

    config: {
      barWidth: WIDTH(0.5),
    },
  };

  const heightChart = home ? HEIGHT(250) : HEIGHT(300);

  return (
    <Box mb="2">
      {!home && <TextLabelTCNS label={translate('slink:Product_details')} />}
      <BarChart
        animation={{ durationY: 2000, easingY: 'EaseOutElastic' }}
        highlights={[
          { x: 1, stackIndex: 2 },
          { x: 2, stackIndex: 1 },
        ]}
        scaleEnabled={true}
        scaleXEnabled
        scaleYEnabled
        style={[styles.chart, { height: heightChart }]}
        data={barData}
        drawValueAboveBar={false}
        yAxis={{
          left: {
            axisMinimum: 0,
            enabled: true,
            axisLineColor: processColor(theme.colors.white),
            textSize: getFontSize(12),
            textColor: processColor(theme.colors.gray[500]),
          },
          right: {
            enabled: false,
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
          markerColor: processColor(theme.colors.gray[500]),
          textColor: processColor(theme.colors.white),
        }}
        xAxis={{
          drawGridLines: false,
          valueFormatter: undefined,
          drawLabels: false,
        }}
      />
      {!home && (
        <Box flexWrap={'wrap'} flexDirection={'row'} w="full">
          {LIST_STATUS?.map((item, index) => {
            return (
              <HStack key={index} mr={'2'} alignItems="center">
                <Box
                  height={WIDTH(8)}
                  width={WIDTH(8)}
                  mr="2"
                  backgroundColor={LIST_COLOR?.[index]}
                />
                <Text
                  fontFamily={R.fonts.BeVietnamProRegular}
                  fontSize={'xs'}
                  numberOfLines={1}>
                  {item}
                </Text>
              </HStack>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default BarchartThongKeNCKH;

const styles = StyleSheet.create({
  chart: {
    height: HEIGHT(300),
    width: '100%',
  },
});
