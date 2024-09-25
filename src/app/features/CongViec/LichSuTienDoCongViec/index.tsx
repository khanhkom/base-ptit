/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Box, FlatList, Pressable, Text } from 'native-base';

import styles from './styles';
import _ from 'lodash';

const LichSuTienDoCongViec = props => {
  const itemCongViec = props?.route?.params?.item;
  const data = _.orderBy(
    itemCongViec?.ghiChuTienDoCongViec || [],
    ['thoiGian'],
    ['desc'],
  );

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Work_history')} />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ItemTrong />}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: HEIGHT(30),
          paddingTop: HEIGHT(24),
        }}
        renderItem={({ item, index }) => (
          <ItemLichSuCongViec item={item} index={index} />
        )}
      />
    </Box>
  );
};

export default LichSuTienDoCongViec;
const ItemLichSuCongViec = ({ item, index }: any) => {
  return (
    <Pressable
      width={WIDTH(343)}
      marginBottom={HEIGHT(12)}
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(12)}
      // mt={'4'}
      paddingBottom={HEIGHT(12)}
      borderRadius={WIDTH(8)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      style={[styles.container]}>
      <Box alignItems="flex-start">
        <Badge
          mb="1"
          alignSelf={'flex-start'}
          colorScheme={
            colorTrangThaiTienDoCongViec?.[item?.trangThaiTienDoCongViec]
          }>
          {mapTrangThaiTienDoCongViec?.[item?.trangThaiTienDoCongViec]}
        </Badge>
        <Text
          flex={1}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={'sm'}
          color={R.colors.black0}
          numberOfLines={3}>
          {index + 1}. {item?.tenNguoiDienTienDo ?? '--'} (
          {item?.maNguoiDienTienDo ?? '--'})
        </Text>
      </Box>
      <Box bgColor={R.colors.white}>
        {!!item?.noiDungGhiChu && (
          <Text
            flex={1}
            mt="2"
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize={getFontSize(12)}
            numberOfLines={2}
            color={'gray.500'}>
            {translate('slink:Content')}: {item?.noiDungGhiChu}
          </Text>
        )}
        {item?.trangThaiTienDoCongViec ===
          ETrangThaiTienDoCongViec.CHAM_TIEN_DO && (
          <Text
            flex={1}
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize={getFontSize(12)}
            mt="2"
            numberOfLines={2}
            color={'gray.500'}>
            {translate('slink:Day_delay', { day: item?.soNgayChamTienDo })}
          </Text>
        )}
        <Text
          flex={1}
          mt="2"
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={getFontSize(12)}
          numberOfLines={2}
          color={'gray.500'}>
          {translate('slink:time')}:{' '}
          {moment(item?.thoiGian).format('HH:mm DD/MM/YYYY')}
        </Text>
      </Box>
    </Pressable>
  );
};

enum ETrangThaiTienDoCongViec {
  DUNG_TIEN_DO = 'DUNG_TIEN_DO',
  CHAM_TIEN_DO = 'CHAM_TIEN_DO',
}

const mapTrangThaiTienDoCongViec: Record<ETrangThaiTienDoCongViec, string> = {
  [ETrangThaiTienDoCongViec.DUNG_TIEN_DO]: 'Đúng tiến độ',
  [ETrangThaiTienDoCongViec.CHAM_TIEN_DO]: 'Chậm tiến độ',
};

const colorTrangThaiTienDoCongViec: Record<ETrangThaiTienDoCongViec, string> = {
  [ETrangThaiTienDoCongViec.DUNG_TIEN_DO]: 'green',
  [ETrangThaiTienDoCongViec.CHAM_TIEN_DO]: 'red',
};
