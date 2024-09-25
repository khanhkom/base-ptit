/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { WIDTH } from '@config/function';
import RenderItemValue from '@features/KhaiBaoQuyTrinh/component/RenderItemValue';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import HeaderReal from '@libcomponents/header-real';
import { Box, FlatList } from 'native-base';

interface Props {
  route: {
    params: {
      item: CauHinhLoaiHinhProps;
      dataInit?: any;
    };
  };
}
const ViewTable = (props: Props) => {
  const itemForm = props?.route?.params?.item;

  const dataInit = props?.route?.params?.dataInit;

  const formKhaiBaoWithValue =
    itemForm?.danhSachCot?.map(item => {
      const value = dataInit?.[item?.ma];

      return { ...item, value: { value } };
    }) ?? [];

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={itemForm?.ten ?? 'Thông tin'} />
      <Box width={WIDTH(343)} alignSelf="center">
        <FlatList
          data={formKhaiBaoWithValue}
          renderItem={({ item, index }) => {
            return (
              <RenderItemValue
                key={index}
                item={item}
                index={index}
                formKhaiBaoWithValue={formKhaiBaoWithValue}
              />
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default ViewTable;
