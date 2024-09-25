/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import moment from 'moment';
import { Pressable, Text } from 'native-base';

const ItemLichSuSuDungTaiSan = (props: any) => {
  const { item } = props;

  const navigateDetail = () => {
    // navigateScreen(APP_SCREEN.CHITIETTAISANVATTU, {
    //   data: item,
    //   onRefresh: refreshData,
    // });
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
      disabled
      borderRadius={WIDTH(8)}>
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        Người sử dụng: {item?.tenNguoiSuDung || ''}
      </Text>
      <Text
        marginTop={HEIGHT(8)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Thời gian bắt đầu sử dụng: ${
          item?.thoiGianBatDauSuDung
            ? moment(item?.thoiGianBatDauSuDung).format('DD/MM/YYYY')
            : ''
        }`}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Thời gian kế thúc sử dụng: ${
          item?.thoiGianKetThucSuDung
            ? moment(item?.thoiGianKetThucSuDung).format('DD/MM/YYYY')
            : ''
        }`}
      </Text>

      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Ghi chú: ${item?.ghiChu || ''}`}
      </Text>
    </Pressable>
  );
};

export default ItemLichSuSuDungTaiSan;
