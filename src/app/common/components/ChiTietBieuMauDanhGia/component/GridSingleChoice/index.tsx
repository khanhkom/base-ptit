/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { View } from 'react-native';

import {
  HangCotProps,
  ItemCauHoiProps,
} from '@components/ChiTietBieuMauDanhGia/type';

import SubItemSingleGrid from './SubItemGrid';

import CauHoi from '../CauHoiTitle/CauHoi';

const GridSingleChoice = (props: ItemCauHoiProps) => {
  const { data, indexs, defaultValue, disabled } = props;

  const renderItem = (item: HangCotProps, index: number) => {
    return (
      <SubItemSingleGrid
        key={item?._id}
        data={data}
        defaultValue={defaultValue}
        disabled={disabled}
        dataHang={item}
        i={index}
        isRequired={data?.batBuoc}
      />
    );
  };

  if (data?.noiDungCauHoi) {
    return (
      <>
        <CauHoi index={indexs} required={false} content={data?.noiDungCauHoi} />
        {data?.luaChonHang?.map((item, index) => renderItem(item, index))}
      </>
    );
  }

  return <View />;
};

export default GridSingleChoice;
