/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { processColor } from 'react-native';

import { PieChart } from 'react-native-charts-wrapper';

import R from '@assets/R';
import { ECHART_NCKH_TYPE, getFontSize, HEIGHT } from '@common';
import TextLabelTCNS from '@components/BoxHSNS/TextLabelTCNS';
import { LoaiHinhNCKHProps } from '@features/QuanLyKhoaHocV2/type';
import { translate } from '@utils/i18n/translate';
import { Box, useTheme } from 'native-base';

import ChuThich from './ChuThich';

import { QuyDoiGioProps } from '../type';

const LIST_COLOR = ['#008ffb', '#00e396', '#ffb01a', '#ff4560', '#775dd0'];

interface Props {
  thongKeGio: QuyDoiGioProps[];
  tieuDe: string;
  listLH?: LoaiHinhNCKHProps[];
  type: ECHART_NCKH_TYPE;
  home?: boolean;
}
const PieChartNCKH = (props: Props) => {
  const { tieuDe, listLH, thongKeGio, type, home } = props;

  const theme = useTheme();

  const dataLoaiHinh =
    listLH?.map(item => {
      const dataGio = thongKeGio?.find(e => item?._id === e?.loaiHinhNckhId);

      return { ...item, value: dataGio?.gioQuyDoi?.tongGio || 0 };
    }) || [];

  const total = dataLoaiHinh?.reduce(
    (acc: any, item: { value: any }) => acc + item.value,
    0,
  );

  const titleMain =
    type === ECHART_NCKH_TYPE.DIEM
      ? `${translate('slink:Total_point')}\n${total}`
      : `${translate('slink:Total_time')}\n${total}`;

  const data = {
    dataSets: [
      {
        values: dataLoaiHinh?.map((item: { ten: any; value: any }) => {
          return { label: item?.ten, value: item?.value, marker: item?.ten };
        }),
        label: '',
        config: {
          colors: dataLoaiHinh?.map((item: any, index: number) => {
            const indexColor = index % 5;

            return processColor(LIST_COLOR?.[indexColor]);
          }),

          valueTextSize: getFontSize(12),
          valueTextColor: processColor(theme.colors.white),
          valueFormatter: "#'%'",
          valueLineColor: processColor(theme.colors.primary[500]),
          valueLinePart1Length: 0.5,
        },
      },
    ],
  };

  const handleSelect = (event: { nativeEvent: any }) => {
    const entry = event.nativeEvent;

    return entry;
  };

  const heightChart = home ? HEIGHT(250) : HEIGHT(200);

  return (
    <Box mb="2" justifyContent="flex-start">
      {!home && <TextLabelTCNS label={tieuDe} />}
      <PieChart
        animation={{ durationY: 2000, easingY: 'EaseOutElastic' }}
        style={{ height: heightChart }}
        logEnabled
        chartDescription={{ text: '' }}
        data={data}
        legend={{
          enabled: false,
          textSize: getFontSize(12),
          fontFamily: R.fonts.BeVietnamProRegular,
          form: 'SQUARE',
          horizontalAlignment: 'RIGHT',
          verticalAlignment: 'CENTER',
          orientation: 'VERTICAL',
          wordWrapEnabled: true,
        }}
        highlights={[{ x: 2 }]}
        entryLabelColor={processColor(theme.colors.primary[500])}
        entryLabelTextSize={getFontSize(12)}
        rotationEnabled
        rotationAngle={45}
        marker={{
          enabled: true,
          markerColor: processColor(theme.colors.gray[500]),
          textColor: processColor(theme.colors.white),
        }}
        usePercentValues
        styledCenterText={{
          text: titleMain,
          fontFamily: R.fonts.BeVietnamProMedium,
          color: processColor(theme.colors.primary[500]),
          size: getFontSize(12),
        }}
        centerTextRadiusPercent={100}
        holeRadius={65}
        transparentCircleRadius={0}
        drawEntryLabels={false}
        holeColor={processColor(R.colors.transparent)}
        onSelect={handleSelect}
        onChange={event => {
          event.nativeEvent;
        }}
      />
      {!home && <ChuThich {...props} />}
    </Box>
  );
};

export default PieChartNCKH;
