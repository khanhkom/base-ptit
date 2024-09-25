/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import moment from 'moment';
import { Pressable, Text } from 'native-base';

const ItemPhanCongNhiemVu = (props: any) => {
  const { item, onPress } = props;

  // const navigateDetail = () => {
  //   // navigateScreen(APP_SCREEN.CHITIETTAISANVATTU, {
  //   //   data: item,
  //   //   onRefresh: refreshData,
  //   // });
  // };

  return (
    <Pressable
      onPress={onPress}
      alignSelf="center"
      // paddingY={HEIGHT(12)}
      _pressed={R.themes.pressed}
      paddingX={WIDTH(16)}
      width={WIDTH(343)}
      backgroundColor="white"
      marginBottom={HEIGHT(12)}
      style={R.themes.shadowOffset}>
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        {item?.ten || ''}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Thời gian hoàn thành: ${
          item?.thoiGianKetThuc
            ? moment(item?.thoiGianKetThuc).format('DD/MM/YYYY')
            : ''
        }`}
      </Text>

      <Text
        mb={'1'}
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Cá nhân phụ trách: ${item?.caNhanPhuTrach?.ten || ''}`}
      </Text>
    </Pressable>
  );
};

export default ItemPhanCongNhiemVu;
