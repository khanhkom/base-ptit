/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import moment from 'moment';
import { Badge, Pressable, Text } from 'native-base';

const ItemDonMinhChung = ({ item, index }) => {
  return (
    <Pressable
      w={WIDTH(343)}
      alignSelf={'center'}
      bgColor={'white'}
      // style={{ ...R.themes.shadowGray }}
      mt="4"
      padding={'2'}
      // disabled
      _pressed={R.themes.pressed}
      borderRadius={WIDTH(4)}
      onPress={() => {
        navigateScreen(APP_SCREEN.THEMMOIMINHCHUNG, {
          item: item,
          disable: true,
        });
      }}>
      <UpperItem status={item?.trangThai} />
      <Text fontSize={'md'} fontFamily={R.fonts.BeVietnamProMedium} my={'1'}>
        {index + 1}. {item?.hoTen ?? '--'} ({item?.maSinhVien})
      </Text>
      <Text
        fontSize={'xs'}
        fontFamily={R.fonts.BeVietnamProMedium}
        color={'gray.400'}>
        Ngày tạo: {moment(item?.createdAt).format('HH:mm DD/MM/YYYY')}
      </Text>
    </Pressable>
  );
};

export default ItemDonMinhChung;
const UpperItem = ({ status }: { status: string }) => {
  const getBgColor = (status: string) => {
    switch (status) {
      case 'Chờ xử lý':
        return 'yellow';
      case 'Duyệt':
        return 'green';
      case 'Xác nhận':
        return 'green';
      case 'Không duyệt':
        return 'red';

      default:
        return 'gray';
    }
  };

  return (
    <Badge
      alignSelf={'flex-start'}
      marginBottom={HEIGHT(4)}
      colorScheme={getBgColor(status)}>
      {status}
    </Badge>
  );
};
