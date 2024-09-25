import React from 'react';

import R from '@assets/R';
import AddPlus from '@components/AddPlus';
import HeaderReal from '@libcomponents/header-real';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const DangKyKyTucXa = () => {
  const onAdd = () => {
    navigateScreen(APP_SCREEN.ADDDANGKYKYTUCXA);
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Dorm_register')} />
      <AddPlus onAdd={onAdd} />
    </Box>
  );
};

export default DangKyKyTucXa;
