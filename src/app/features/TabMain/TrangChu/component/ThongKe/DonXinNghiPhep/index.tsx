/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import { Box, HStack, Switch, Text } from 'native-base';

import DonXinNghiPhepTheoNam from './TheoNam';
import DonXinPhepTheoTyLe from './TheoTyLe';

const DonXinNghiPhep = ({ data }: any) => {
  const [loaiDon, setLoaiDon] = useState(false);

  return (
    <Box alignItems={'center'} mt={'4'}>
      <HStack alignItems="center" space={4}>
        <Text
          fontSize={'sm'}
          color={R.colors.colorPink}
          fontFamily={R.fonts.BeVietnamProRegular}>
          Theo tỷ lệ
        </Text>
        <Switch value={loaiDon} size="lg" onToggle={setLoaiDon} />
        <Text
          fontSize={'sm'}
          color={R.colors.colorPink}
          fontFamily={R.fonts.BeVietnamProRegular}>
          Theo năm
        </Text>
      </HStack>
      {!loaiDon ? (
        <DonXinPhepTheoTyLe data={data} />
      ) : (
        <DonXinNghiPhepTheoNam data={data} />
      )}
    </Box>
  );
};

export default DonXinNghiPhep;
