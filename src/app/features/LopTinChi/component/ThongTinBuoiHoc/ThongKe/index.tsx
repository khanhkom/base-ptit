import React from 'react';
import { processColor } from 'react-native';

import { PieChart } from 'react-native-charts-wrapper';

import R from '@assets/R';
import { ETrangThaiDiemDanh, getFontSize, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import { Actionsheet, FlatList, HStack, Text, useTheme } from 'native-base';

import { BuoiHocProps } from '../type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  listBuoiHoc?: BuoiHocProps[];
}
const ThongKeBuoiHoc = (props: Props) => {
  const { isOpen, onClose, listBuoiHoc = [] } = props;

  const chartData = [
    {
      label: translate('slink:Sum'),
      value: listBuoiHoc?.length,
      color: '#007eb9',
      thongKe: false,
    },
    {
      label: translate('slink:Attendance'),
      value: demSoPhanTu(listBuoiHoc, ETrangThaiDiemDanh.CO_MAT),
      color: '#50f252',
      thongKe: true,
    },
    {
      label: translate('slink:Back_early'),
      value: demSoPhanTu(listBuoiHoc, ETrangThaiDiemDanh.MUON_VE_SOM),
      color: '#3972ed',
      thongKe: true,
    },
    {
      label: translate('slink:Absence_with_permission'),
      value: demSoPhanTu(listBuoiHoc, ETrangThaiDiemDanh.VANG_CO_PHEP),
      color: '#cff03c',
      thongKe: true,
    },
    {
      label: translate('slink:Absence_without_permission'),
      value: demSoPhanTu(listBuoiHoc, ETrangThaiDiemDanh.VANG_KHONG_PHEP),
      thongKe: true,
      color: '#edaf42',
    },
    {
      label: translate('slink:No_attendance_yet'),
      value: demSoPhanTu(listBuoiHoc, ETrangThaiDiemDanh.CHUA_DIEM_DANH),
      color: '#eb4664',
      thongKe: true,
    },
  ];

  const handleSelect = (event: { nativeEvent: any }) => {
    const entry = event.nativeEvent;

    return entry;
  };

  const theme = useTheme();

  if (isOpen) {
    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <HStack borderRadius={WIDTH(8)} style={R.themes.shadowOffset}>
            <PieChart
              animation={{ durationY: 2000, easingY: 'EaseOutElastic' }}
              style={{
                height: WIDTH(200),
                width: WIDTH(200),
              }}
              styledCenterText={{
                text: `${listBuoiHoc?.length || '--'}\nTỔNG`,
                fontFamily: R.fonts.BeVietnamProMedium,
                color: processColor(theme.colors.primary[500]),
                size: getFontSize(12),
              }}
              logEnabled
              chartDescription={{ text: '' }}
              usePercentValues
              entryLabelColor={processColor(theme.colors.primary[500])}
              entryLabelTextSize={getFontSize(12)}
              rotationEnabled
              rotationAngle={45}
              // centerText={`${listBuoiHoc?.length || '--'}\nTỔNG`}
              holeRadius={HEIGHT(60)}
              holeColor={processColor(R.colors.transparent)}
              transparentCircleRadius={0}
              onSelect={handleSelect}
              onChange={event => {
                event.nativeEvent;
              }}
              drawEntryLabels={false}
              marker={{
                enabled: true,
                markerColor: processColor(theme.colors.gray[500]),
                textColor: processColor(theme.colors.white),
              }}
              legend={{
                enabled: false,
              }}
              data={{
                dataSets: [
                  {
                    values: chartData
                      ?.filter(item => item?.thongKe)
                      ?.map(item => {
                        return {
                          ...item,
                          value: item?.value >= 0 ? item?.value : 0,
                        };
                      }),
                    label: '',
                    config: {
                      colors: chartData
                        ?.filter(item => item?.thongKe)
                        ?.map(item => processColor(item?.color)),
                      visible: true,
                      sliceSpace: 1,
                      drawValues: true,
                      valueFormatter: '',
                      highlightEnabled: true,
                      valueTextSize: getFontSize(14),
                      valueTextColor: processColor(R.colors.transparent),
                    },
                  },
                ],
              }}
            />
            <FlatList
              data={chartData}
              alignSelf={'center'}
              renderItem={({ item, index }) => {
                return (
                  <HStack key={index} my="0.5">
                    <Text
                      fontFamily={R.fonts.BeVietnamProMedium}
                      mr="2"
                      w={WIDTH(20)}
                      fontSize="xs"
                      textAlign="right">
                      {item?.value}
                    </Text>
                    <Text
                      color={item?.color}
                      fontFamily={R.fonts.BeVietnamProMedium}
                      fontSize="xs">
                      {item?.label}
                    </Text>
                  </HStack>
                );
              }}
            />
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    );
  }

  return null;
};

export default ThongKeBuoiHoc;

const demSoPhanTu = (dsBuoiHoc: BuoiHocProps[], key: string) => {
  const listPhanTu =
    dsBuoiHoc?.filter(
      (item: BuoiHocProps) =>
        item?.trangThaiDiemDanhCaNhan === key ||
        item?.trangThaiDiemDanh === key,
    ) ?? [];

  return listPhanTu?.length ?? 0;
};
