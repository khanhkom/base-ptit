import React from 'react';

import R from '@assets/R';
import FlatlistItem from '@features/TabMain/Item/FlatListItem';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const listFunc = [{ title: translate('slink:Dorm_register') }];

const KyTucXa = () => {
  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Dormitory')} />
      <FlatlistItem data={listFunc} />
    </Box>
  );
};

export default KyTucXa;
