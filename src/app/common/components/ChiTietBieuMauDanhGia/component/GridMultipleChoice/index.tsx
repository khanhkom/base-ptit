/* eslint-disable no-inline-comments */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
  HangCotProps,
  ItemCauHoiProps,
} from '@components/ChiTietBieuMauDanhGia/type';
import { FlatList, VStack } from 'native-base';

import SubItemGrid from './SubItemGrid';

import CauHoi from '../CauHoiTitle/CauHoi';

const GridMultipleChoice = (props: ItemCauHoiProps) => {
  const { data, indexs, defaultValue, disabled } = props;

  const renderItem = (item: HangCotProps, index: number) => {
    return (
      <SubItemGrid
        defaultValue={defaultValue}
        data={data}
        disabled={disabled}
        i={index}
        dataHang={item}
        isRequired={data?.batBuoc}
      />
    );
  };

  return (
    <VStack flex={1}>
      <CauHoi index={indexs} required={false} content={data?.noiDungCauHoi} />
      <FlatList
        data={data?.luaChonHang}
        extraData={data?.luaChonHang}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </VStack>
  );
};

export default GridMultipleChoice;
