/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { ETrangThaiDoiLichHoc, infoDoiLichHoc, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Box, Text } from 'native-base';

import styles from './styles';

export const thu = [
  'Chủ nhật',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];

const ItemThongTinDayBu = (props: any) => {
  const {
    customStyle,
    onShowDetail,
    data,

    onLayout,
  } = props;

  const ngayHoc = data?.tkb?.ngay
    ? moment(data?.tkb?.ngay).format('DD/MM/YYYY')
    : '--';

  const title = `Ngày ${ngayHoc}, tiết ${data?.tkb?.tietBatDau ?? '--'} - ${
    data?.tkb?.tietKetThuc ?? '--'
  }`;

  const phongHoc = data?.maPhongHocMoi ?? (data?.tkb?.phongHoc || '--');

  const onClick = () => {
    onShowDetail && onShowDetail(listdata());
  };

  const listdata = () => [
    {
      value: title,
      label: translate('slink:Lesson'),
    },
    { value: lichDayBu, label: translate('slink:Replace_lesson') },
    { value: phongHoc ?? '--', label: translate('slink:Classroom') },
    { value: data?.tenNhanSu ?? '--', label: translate('slink:Teacher') },
    {
      value: infoDoiLichHoc(status)?.label ?? '--',
      label: translate('slink:Status'),
    },
    {
      value: data?.lyDoDuyet ?? '--',
      label: translate('slink:Reason'),
    },
    {
      value: data?.updatedAt
        ? moment(data?.updatedAt).format('HH:mm DD/MM/YYYY')
        : '--',
      label: translate('slink:Reason'),
    },
    {
      value: data?.ghiChuDuyet ?? '--',
      label: translate('slink:Note'),
    },
  ];

  const status = data?.trangThai;

  const lichDayBu =
    'Ngày ' +
    moment(data?.ngayMoi).format('DD/MM/YYYY') +
    ', tiết ' +
    (data?.tietBatDauMoi ?? '--') +
    ' - ' +
    (data?.tietKetThucMoi ?? '--');

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onClick}
      onLayout={onLayout}
      style={[styles.container, customStyle]}>
      <ViewTieuDe title={title} diemDanh={status} />
      <Text
        flexDirection="row"
        alignItems="center"
        fontSize={'xs'}
        fontFamily={R.fonts.BeVietnamProRegular}
        mb="1">
        {'Lịch dạy bù'}: <Text color={'primary.500'}>{lichDayBu}</Text>
      </Text>
      <Text
        flexDirection="row"
        alignItems="center"
        fontSize={'xs'}
        fontFamily={R.fonts.BeVietnamProRegular}
        mb="1">
        {'Lý do'}: <Text color={'primary.500'}>{data?.lyDoDuyet}</Text>
      </Text>
      <View style={styles.viewSub}>
        <View style={styles.viewInfo}>
          <ItemIconSVG
            title={translate('slink:Address')}
            color={R.colors.black0}
            width={WIDTH(12)}
            height={WIDTH(12)}
          />
          <Text
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize="xs"
            color="black"
            marginLeft="1">
            {phongHoc}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemThongTinDayBu;
const ViewTieuDe = ({
  title,
  diemDanh,
}: {
  title: string;
  diemDanh: ETrangThaiDoiLichHoc;
}) => {
  const { type, label } = infoDoiLichHoc(diemDanh);

  if (type) {
    return (
      <Box style={styles.viewTitle}>
        <Text fontSize={'md'} fontFamily={R.fonts.BeVietnamProMedium} flex={1}>
          {title}
        </Text>
        <Badge colorScheme={type}>{label}</Badge>
      </Box>
    );
  }

  return null;
};
