/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet } from 'react-native';

import { PieChart } from 'react-native-charts-wrapper';
import { processColor } from 'react-native-reanimated';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import { Box, FlatList, Text } from 'native-base';

const DonXinPhepTheoTyLe = ({ data }: any) => {
  const colorData = ['#5b8ff9', '#5ad8a6'];

  const chartData = [
    {
      label: 'Số ngày còn lại',
      value: data?.soNgayConLai ?? 0,
    },
    {
      label: 'Số ngày nghỉ',
      value: data?.soNgayDaNghiPhep ?? 0,
    },
  ];

  return (
    <Box
      height={HEIGHT(160)}
      flexDir={'row'}
      borderRadius={WIDTH(8)}
      alignItems={'center'}
      backgroundColor={'white'}
      w={WIDTH(343)}
      marginTop={'2'}
      style={{ ...R.themes.shadowOffset }}>
      <PieChart
        // rotationEnabled={false}
        usePercentValues
        centerText={`${
          Number(data?.soNgayConLai + data?.soNgayDaNghiPhep)
            ? Number(data?.soNgayConLai + data?.soNgayDaNghiPhep)
            : '--'
        } \nngày/năm`}
        holeRadius={HEIGHT(60)}
        holeColor={processColor(R.colors.transparent)}
        transparentCircleRadius={0}
        drawEntryLabels={false}
        chartDescription={{ text: '' }}
        style={{
          height: HEIGHT(140),
          width: WIDTH(120),
          // backgroundColor: 'red',
        }}
        legend={{
          enabled: false,
        }}
        data={{
          // drawWeb: true,
          dataSets: [
            {
              values: chartData?.map(item => {
                return { ...item, value: item?.value >= 0 ? item?.value : 0 };
              }),
              // description: { text: '' },
              label: '1',
              config: {
                // ...ConfigTypes.common,\
                colors: colorData?.map(item => processColor(item)),
                visible: true,
                sliceSpace: 1,
                drawValues: true,
                valueFormatter: '',
                highlightEnabled: true,
                valueTextSize: getFontSize(14),
                valueTextColor: processColor(R.colors.transparent),
                // valueFormatter: '',
              },
            },
          ],
        }}
      />
      <FlatList
        data={chartData}
        extraData={data}
        renderItem={({ item, index }) => (
          <Legend item={item} color={colorData?.[index]} />
        )}
      />
    </Box>
  );
};

export default DonXinPhepTheoTyLe;
const Legend = ({ item, color }: any) => {
  return (
    <Box
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: WIDTH(212),
        marginBottom: HEIGHT(2),
        marginLeft: WIDTH(-20),
      }}>
      <Box style={styles.BoxTextInfor}>
        <Box style={[styles.dot, { backgroundColor: color }]} />
        <Text
          fontSize={'xs'}
          color={'black'}
          fontFamily={R.fonts.BeVietnamProRegular}
          mb={'1'}>
          {item?.label ?? '--'}
        </Text>
      </Box>
      <Text style={styles.number}>{item?.value ?? '--'} ngày/năm</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  number: {
    color: R.colors.colorPink,
    fontWeight: '500',
    fontSize: getFontSize(13),
    // marginRight: WIDTH(12),
  },

  BoxTextInfor: { flexDirection: 'row', alignItems: 'center' },

  dot: {
    height: WIDTH(10),
    width: WIDTH(10),
    backgroundColor: R.colors.blue0084,
    borderRadius: WIDTH(100),
    marginRight: WIDTH(8),
    marginLeft: WIDTH(20),
    // alignSelf: 'flex-end',
  },
});
