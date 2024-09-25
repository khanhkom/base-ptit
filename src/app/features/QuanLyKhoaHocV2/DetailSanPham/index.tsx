import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box, ScrollView } from 'native-base';

import DetailRender from './DetailRender';

import { KetQuaKhaiBaoProps, LoaiHinhNCKHProps } from '../type';
interface Props {
  route: {
    params: { dataLoaiHinh?: LoaiHinhNCKHProps; data: KetQuaKhaiBaoProps };
  };
}
const DetailSanPham = (props: Props) => {
  const data = props?.route?.params.data;

  const dataLoaiHinh = props?.route?.params.dataLoaiHinh;

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Product_details')} />
      <ScrollView
        paddingLeft={WIDTH(16)}
        paddingRight={WIDTH(16)}
        contentContainerStyle={{
          paddingTop: HEIGHT(24),
          paddingBottom: HEIGHT(30),
        }}
        flex={1}
        backgroundColor={R.colors.backgroundColorNew}>
        <DetailRender data={data} dataLoaiHinh={dataLoaiHinh} />
      </ScrollView>
    </Box>
  );
};

export default DetailSanPham;
