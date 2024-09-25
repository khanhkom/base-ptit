import React from 'react';

import R from '@assets/R';
import {
  ETrangThaiDanhGia,
  HEIGHT,
  MapKeyColorTrangThaiDanhGia,
  showToastError,
  WIDTH,
} from '@common';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, HStack, Pressable, Text, useTheme } from 'native-base';

import { DotDanhGiaProps } from '../../CaNhan/type';

const ItemDotDGNS = (props: {
  item: DotDanhGiaProps;
  refreshData: () => void;
  onPress?: () => void;
}) => {
  const { item, refreshData, onPress } = props;

  const timeStart = item?.thoiGianBatDau
    ? moment(item?.thoiGianBatDau || new Date()).format('DD/MM/YYYY')
    : '';

  const timeEnd = item?.thoiGianKetThuc
    ? moment(item?.thoiGianKetThuc || new Date()).format('DD/MM/YYYY')
    : '';

  const start = new Date(item?.thoiGianBatDau);

  const end = new Date(item?.thoiGianKetThuc);

  const currentTime = new Date();

  const isTouch = currentTime >= start && currentTime <= end;

  const navigateDetail = () => {
    if (onPress) {
      onPress();
    } else {
      !isTouch
        ? showToastError('Ngoài thời gian đánh giá')
        : navigateScreen(APP_SCREEN.DETAILDANHGIACANHAN, {
            data: item,
            isDisabled: khongTheSuaDanhGia,
            onRefresh: refreshData,
          });
    }
  };

  const khongTheSuaDanhGia =
    item.trangThaiLam !== ETrangThaiDanhGia.CHUA_DANH_GIA &&
    item.trangThaiLam !== ETrangThaiDanhGia.DA_DANH_GIA_CHUA_GUI;

  return (
    <Pressable
      onPress={navigateDetail}
      alignSelf="center"
      paddingY={HEIGHT(12)}
      _pressed={R.themes.pressed}
      paddingX={WIDTH(16)}
      width={WIDTH(343)}
      backgroundColor="white"
      marginBottom={HEIGHT(12)}
      style={R.themes.shadowOffset}
      borderRadius={WIDTH(8)}>
      <ViewStatus trangThai={item?.trangThaiLam} />
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        {item?.tenDot || ''}
      </Text>
      <Text
        marginTop={HEIGHT(8)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`${translate('slink:Loai')}: ${item?.loaiDot || ''}`}
      </Text>
      {!!item?.ghiChu && (
        <Text
          marginTop={HEIGHT(4)}
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize="xs">
          {`${translate('slink:Note')}: ${item?.ghiChu || ''}`}
        </Text>
      )}
      <ViewTime timeStart={timeStart} timeEnd={timeEnd} />
    </Pressable>
  );
};

export default ItemDotDGNS;
const ViewStatus = ({ trangThai }: { trangThai: ETrangThaiDanhGia }) => {
  return (
    <Badge
      alignSelf={'flex-start'}
      marginBottom={HEIGHT(12)}
      colorScheme={MapKeyColorTrangThaiDanhGia?.[trangThai]}>
      {trangThai}
    </Badge>
  );
};

const ViewTime = ({
  timeStart,
  timeEnd,
}: {
  timeStart: string;
  timeEnd: string;
}) => {
  const theme = useTheme();

  if (timeStart !== '' && timeEnd !== '') {
    return (
      <HStack mt={HEIGHT(4)} justifyContent={'space-between'}>
        <Text
          color={theme.colors.gray[500]}
          fontSize="xs"
          fontFamily={R.fonts.BeVietnamProRegular}>
          {`${translate('slink:From')}: ${timeStart}`}
        </Text>
        <Text
          color={theme.colors.gray[500]}
          fontSize="xs"
          fontFamily={R.fonts.BeVietnamProRegular}>
          {`${translate('slink:To')}: ${timeEnd}`}
        </Text>
      </HStack>
    );
  } else {
    return (
      <Text
        color={theme.colors.gray[500]}
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {'Không giới hạn về thời gian'}
      </Text>
    );
  }
};
