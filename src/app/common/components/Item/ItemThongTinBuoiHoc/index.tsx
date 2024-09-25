/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { View } from 'react-native';

import R from '@assets/R';
import { ETrangThaiDiemDanh, HEIGHT, infoDiemDanh, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import { Badge, Box, Pressable, Text } from 'native-base';

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

const ItemThongTinBuoiHoc = (props: any) => {
  const {
    onPress,
    data,
    listKeysByPeriod,
    index,
    onLayout,
    currentDay,
    account,
  } = props;

  const ngayHoc = moment(data?.ngay ?? new Date()).format('DD/MM/YYYY');

  const nhomTH =
    !_.isNil(data?.nhom_lop_tin_chi_id?.[1]) &&
    data?.nhom_lop_tin_chi_id?.[1] !== false
      ? `(Nhóm TH: ${data?.nhom_lop_tin_chi_id?.[1]})`
      : '';

  const thuHoc = moment(data?.ngay).toDate().getDay() ?? 0;

  const title = `${thu?.[thuHoc]}, ngày ${ngayHoc} ${nhomTH}`;

  const ngayHocFormat = listKeysByPeriod[index]?.split(' ');

  const today = ngayHocFormat?.[0] === currentDay;

  const thoiGianBatDau = `Tiết ${data?.tietBatDau}`;

  const thoiGianKetThuc = ` - ${data?.tietKetThuc}`;

  const phongHoc = data?.phongHoc || '--';

  const onClick = () => {
    onPress?.(data, title);
  };

  const status = account?.isGiaoVien
    ? data?.trangThaiDiemDanh
    : data?.trangThaiDiemDanhCaNhan;

  return (
    <Pressable
      width={WIDTH(343)}
      marginBottom={HEIGHT(12)}
      alignSelf="center"
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(12)}
      paddingBottom={HEIGHT(12)}
      borderRadius={WIDTH(8)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      style={[R.themes.shadowOffset, today && { borderWidth: 1 }]}
      onPress={onClick}
      onLayout={onLayout}
      // style={[styles.container, customStyle, today && { borderWidth: 1 }]}
    >
      <ViewTieuDe title={title} diemDanh={status} />
      <Text
        flexDirection="row"
        alignItems="center"
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}
        mb="1">
        {translate('slink:Type_learning')}:{' '}
        <Text color={'primary.500'}>{data?.loaiHinhHocTap ?? '--'}</Text>
      </Text>
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginTop={HEIGHT(8)}>
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
        <View style={styles.viewInfo}>
          <ItemIconSVG
            title={translate('slink:time')}
            color={R.colors.black0}
            width={WIDTH(12)}
            height={WIDTH(12)}
          />
          <Text
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize="xs"
            color="black"
            marginLeft="1">{`${thoiGianBatDau}${thoiGianKetThuc}`}</Text>
        </View>
      </Box>
    </Pressable>
  );
};

export default ItemThongTinBuoiHoc;
const ViewTieuDe = ({
  title,
  diemDanh,
}: {
  title: string;
  diemDanh: ETrangThaiDiemDanh;
}) => {
  const { type, label } = infoDiemDanh(diemDanh);

  if (type) {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={HEIGHT(8)}>
        <Text
          flex={1}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={'sm'}
          color={'black'}
          numberOfLines={3}>
          {title}
        </Text>
        <Badge colorScheme={type}>{label}</Badge>
      </Box>
    );
  }

  return null;
};
