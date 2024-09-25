/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { ScrollView } from 'native-base';

import HeaderInfo from './Items/HeaderInfo';
import ListCollapse from './Items/ListCollapse';

const ThongTinChung = ({ item }: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeaderInfo itemTaiSan={item} />
      <ListCollapse itemTaiSan={item} />
    </ScrollView>
  );
};

export default ThongTinChung;
