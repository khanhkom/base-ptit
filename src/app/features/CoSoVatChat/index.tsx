import React from 'react';

import R from '@assets/R';
import FlatlistItem from '@features/TabMain/Item/FlatListItem';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const listFunc = [{ title: translate('slink:Assets_and_supplies') }];

const CoSoVatChat = () => {
  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Infrastructure')} />
      <FlatlistItem data={listFunc} />
    </Box>
  );
};

export default CoSoVatChat;
