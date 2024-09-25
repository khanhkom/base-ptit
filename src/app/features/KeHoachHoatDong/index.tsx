import React from 'react';

import R from '@assets/R';
import FlatlistItem from '@features/TabMain/Item/FlatListItem';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const listFunc = [
  { title: translate('slink:Year_work_plan') },
  { title: translate('slink:Activity_plan_list') },
];

const KeHoachHoatDong = () => {
  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Activity_plan')} />
      <FlatlistItem data={listFunc} />
    </Box>
  );
};

export default KeHoachHoatDong;
