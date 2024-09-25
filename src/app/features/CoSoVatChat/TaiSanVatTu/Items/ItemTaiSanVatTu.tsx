/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { Pressable, Text } from 'native-base';

const ItemTaiSanVatTu = (props: any) => {
  const { item, refreshData } = props;

  const navigateDetail = () => {
    navigateScreen(APP_SCREEN.CHITIETTAISANVATTU, {
      data: item,
      onRefresh: refreshData,
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
        {`Mã tài sản: ${item?.ma || ''}`}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Số hiệu: ${item?.soHieuTSCD || ''}`}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        {`Loại tài sản: ${item?.loaiTaiSan?.ten || ''}`}
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

export default ItemTaiSanVatTu;
