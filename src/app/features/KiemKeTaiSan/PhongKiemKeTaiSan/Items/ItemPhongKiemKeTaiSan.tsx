/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { Box, Pressable, Text } from 'native-base';

const ItemPhongKiemKeTaiSan = (props: any) => {
  const { item, onRefresh } = props;

  const navigateDetail = () => {
    navigateScreen(APP_SCREEN.DSTAISANKIEMKE, {
      data: item,
      onRefresh: onRefresh,
    });
  };

  const backgroundColorStatus = () => {
    if (item?.soLuongTaiSanDaKiemKe === item?.soLuongTaiSanDaGiao) {
      return R.colors.green500;
    } else if (item?.soLuongTaiSanDaKiemKe === 0) {
      return R.colors.red500;
    } else {
      return R.colors.green500;
    }
  };

  return (
    <Pressable
      onPress={navigateDetail}
      alignSelf="center"
      // alignItems={'center'}
      // paddingY={HEIGHT(12)}
      _pressed={R.themes.pressed}
      // paddingX={WIDTH(16)}
      width={WIDTH(100)}
      // backgroundColor={'white'}
      marginBottom={HEIGHT(20)}
      style={R.themes.shadowOffset}
      // mr={'6'}

      borderRadius={WIDTH(8)}>
      <Box
        alignSelf="center"
        // alignItems={'center'}
        paddingY={HEIGHT(2)}
        paddingX={WIDTH(2)}
        width={WIDTH(100)}
        backgroundColor={'white'}
        height={HEIGHT(50)}
        justifyContent={'center'}
        alignItems={'center'}
        // marginBottom={HEIGHT(12)}
        // style={R.themes.shadowOffset}
        // mr={'6'}
        borderColor={backgroundColorStatus()}
        borderWidth={1}
        borderTopRadius={WIDTH(8)}>
        <Text
          textAlign={'center'}
          flex={1}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={'sm'}
          color={'black'}
          numberOfLines={2}>
          {item?.phong?.ten || ''}
        </Text>
      </Box>
      {/* <Text
        marginTop={HEIGHT(2)}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="xs">
        <Text bold>Đv quản lý:</Text>
        {` ${item?.phong?.tenDonViSuDung || '--'}`}
      </Text> */}
      <Box
        paddingY={HEIGHT(2)}
        paddingX={WIDTH(2)}
        width={WIDTH(100)}
        alignItems={'center'}
        height={HEIGHT(30)}
        backgroundColor={backgroundColorStatus()}
        borderBottomRadius={WIDTH(8)}>
        <Text
          numberOfLines={1}
          marginTop={HEIGHT(2)}
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize="xs">
          {/* <Text bold>Đã kiểm kê:</Text> */}
          {` ${item?.soLuongTaiSanDaKiemKe ?? '--'}/${
            item?.soLuongTaiSanDaGiao ?? '--'
          }`}
        </Text>
      </Box>
    </Pressable>
  );
};

export default ItemPhongKiemKeTaiSan;
