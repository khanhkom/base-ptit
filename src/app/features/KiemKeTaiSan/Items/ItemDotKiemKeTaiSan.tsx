/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import moment from 'moment';
import { Pressable, Text } from 'native-base';

const ItemDotKiemKeTaiSan = (props: any) => {
  const { item } = props;

  const navigateDetail = () => {
    navigateScreen(APP_SCREEN.PHONGKIEMKETAISAN, {
      dotKiemKe: item,
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
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        {item?.ten || ''}
      </Text>
      <Text
        marginTop={HEIGHT(8)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Năm: ${item?.nam || ''}`}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Thời gian bắt đầu: ${
          item?.thoiGianBatDau
            ? moment(item?.thoiGianBatDau).format('DD/MM/YYYY')
            : ''
        }`}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Thời gian kết thúc: ${
          item?.thoiGianKetThuc
            ? moment(item?.thoiGianKetThuc).format('DD/MM/YYYY')
            : ''
        }`}
      </Text>
      {/* <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Tình trạng sử dụng: ${
          listTinhTrang?.find(itemTT => itemTT?.ma === item?.maTinhTrangSuDung)
            ?.tinhTrangSuDung || ''
        }`}
      </Text> */}
    </Pressable>
  );
};

export default ItemDotKiemKeTaiSan;
