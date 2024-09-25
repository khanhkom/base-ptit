/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { ETrangThaiDanhGia, HEIGHT, WIDTH } from '@common';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, HStack, Pressable, Text, useTheme } from 'native-base';

const ItemHopDong = (props: { item: any }) => {
  const { item } = props;

  const timeStart = item?.tuNgay
    ? moment(item?.tuNgay || new Date()).format('DD/MM/YYYY')
    : '';

  const timeEnd = item?.denNgay
    ? moment(item?.denNgay || new Date()).format('DD/MM/YYYY')
    : '';

  const navigateDetail = () => {
    navigateScreen(APP_SCREEN.CHITIETHOPDONG, {
      data: item,
    });
  };

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
      <ViewStatus trangThai={item?.trangThaiHopDong} />
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        {item?.loaiHopDong?.ten || ''}
      </Text>
      <Text
        marginTop={HEIGHT(8)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Số hợp đồng: ${item?.soHopDong || ''}`}
      </Text>

      <ViewTime timeStart={timeStart} timeEnd={timeEnd} />
    </Pressable>
  );
};

export default ItemHopDong;
const ViewStatus = ({ trangThai }: { trangThai: ETrangThaiDanhGia }) => {
  return (
    <Badge
      alignSelf={'flex-start'}
      marginBottom={HEIGHT(12)}
      colorScheme={'orange'}>
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
