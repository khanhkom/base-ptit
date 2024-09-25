/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box, Center, FlatList, HStack, Skeleton, VStack } from 'native-base';
import { HEIGHT, WIDTH } from '@common';
import { getLichThi } from '@networking/user';
import { LichThiProps } from './type';
import ItemTrong from '@components/Item/ItemTrong';
import ItemLichThi from './ItemLichThi';
import SelectHocKy from '@components/SelectHocKy';
const LichThi = () => {
  const [maKyHoc, setmaKyHoc] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const [listLichThi, setlistLichThi] = useState<LichThiProps[]>([]);
  const getTinChiValidate = async (maKy: string) => {
    try {
      setRefreshing(true);
      const responseLichThi = await getLichThi(maKy);
      setlistLichThi(responseLichThi?.data || []);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };
  const onChange = (value: string) => {
    getTinChiValidate(value);
    setmaKyHoc(value);
  };
  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Lich_thi')} />
      <Box flex={1} paddingTop={HEIGHT(24)}>
        <SelectHocKy onChange={onChange} />
        <FlatList
          data={listLichThi}
          extraData={listLichThi}
          refreshing={refreshing}
          onRefresh={() => getTinChiValidate(maKyHoc)}
          contentContainerStyle={{ paddingBottom: HEIGHT(30) }}
          ListEmptyComponent={<ItemTrong />}
          renderItem={({ item, index }) => {
            return <ItemLichThi key={index} data={item} />;
          }}
        />
      </Box>
    </Box>
  );
};

export default LichThi;
