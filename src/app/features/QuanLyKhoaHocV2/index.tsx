import React from 'react';

import R from '@assets/R';
import FlatlistItem from '@features/TabMain/Item/FlatListItem';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const QuanLyKhoaHocV2 = () => {
  const LIST_CHUC_NANG = [
    {
      title: 'Tổng quan',
    },
    {
      title: 'Sản phẩm',
    },
    {
      title: 'Hoạt động',
    },
  ];

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('slink:Scientific_and_technological_results')}
      />
      <FlatlistItem data={LIST_CHUC_NANG} />
    </Box>
  );
};

export default QuanLyKhoaHocV2;
