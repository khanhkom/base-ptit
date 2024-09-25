/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import R from '@assets/R';
import { getLineHeight, HEIGHT, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { dsLoaiHinhNCKH } from '@networking/user/QuanLyKhoaHoc';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Pressable, Text } from 'native-base';

import { LoaiHinhNCKHProps } from '../type';
interface Props {
  route: { params: { item: { title: string } } };
}
const LoaiHinhSanPhamHoatDong = (props: Props) => {
  const title = props?.route?.params?.item?.title;

  const [loading, setloading] = useState(false);

  const [listLoaiHinh, setlistLoaiHinh] = useState<LoaiHinhNCKHProps[]>();

  const getData = async () => {
    setloading(true);

    const body = {
      condition: { loai: title },
      sort: { createdAt: -1 },
    };

    const responseLoaiHinh: any = await dsLoaiHinhNCKH(body);

    setloading(false);

    const sortedArray =
      responseLoaiHinh?.data?.data.sort(
        (a: LoaiHinhNCKHProps, b: LoaiHinhNCKHProps) => {
          const tenA = a.ten.toLowerCase();

          const tenB = b.ten.toLowerCase();

          if (tenA < tenB) {
            return -1;
          }

          if (tenA > tenB) {
            return 1;
          }

          return 0;
        },
      ) ?? [];

    setlistLoaiHinh(sortedArray);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateList = (item: LoaiHinhNCKHProps) => {
    navigateScreen(APP_SCREEN.DANHSACHKHAIBAONCKH, { dataLoaiHinh: item });
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={title || translate('slink:Scientific_and_technological_results')}
      />
      <FlatList
        data={listLoaiHinh}
        refreshing={loading}
        ListEmptyComponent={<ItemTrong />}
        onRefresh={getData}
        contentContainerStyle={{
          paddingTop: WIDTH(24),
          paddingBottom: WIDTH(30),
        }}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                navigateList(item);
              }}
              backgroundColor={R.colors.white}
              paddingTop={WIDTH(12)}
              paddingBottom={WIDTH(12)}
              width={WIDTH(343)}
              alignSelf="center"
              paddingLeft={WIDTH(16)}
              paddingRight={WIDTH(16)}
              borderRadius={WIDTH(8)}
              style={{ ...R.themes.shadowOffset }}
              marginBottom={HEIGHT(12)}>
              <Text
                fontFamily={R.fonts.BeVietnamProMedium}
                lineHeight={getLineHeight(22)}
                textAlign="justify">
                {index + 1}: {item?.ten}
              </Text>
            </Pressable>
          );
        }}
      />
    </Box>
  );
};

export default LoaiHinhSanPhamHoatDong;
