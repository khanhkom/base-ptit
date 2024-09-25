/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box, VStack } from 'native-base';

import ListKhaoSat from './ListKhaoSat';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import { HEIGHT, WIDTH } from '@common';
const DATA_LIST = [
  {
    key: 0,
    label: translate('slink:Havent_happened'),
    value: 'CHUA_DIEN_RA',
  },
  { key: 1, label: translate('slink:Happening'), value: 'DANG_DIEN_RA' },
  { key: 2, label: translate('slink:Happened'), value: 'DA_DIEN_RA' },
];
const KhaoSatTrucTuyen = () => {
  const [type, settype] = useState('DANG_DIEN_RA');
  const onChangeValue = (val: string) => {
    settype(val);
  };
  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Online_survey')} />
      <VStack pt={HEIGHT(24)} flex={1}>
        <SingleSelect
          width={WIDTH(343)}
          alignSelf="center"
          placeholder={translate('slink:Select_month')}
          onChangeValue={onChangeValue}
          defaultValue={'DANG_DIEN_RA'}
          data={DATA_LIST}
        />
        <ListKhaoSat type={type} />
      </VStack>
    </Box>
  );
};

export default KhaoSatTrucTuyen;
