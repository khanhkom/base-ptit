/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import { EDaLuu, MapKeyDaLuu } from '@common';
import HeaderReal from '@libcomponents/header-real';
import { Box } from 'native-base';

import TabDetail from './TabDetail';
import { translate } from '@utils/i18n/translate';
import TabbarLong from '@components/TabbarCustome/TabbarLong';

const DaLuu = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState<any>([
    { key: 0, title: EDaLuu.SU_KIEN },
    { key: 1, title: EDaLuu.TIN_TUC },
    { key: 2, title: EDaLuu.VBHD },
  ]);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const renderScene = ({ route }) => {
    return <TabDetail loaiThongTin={MapKeyDaLuu?.[route?.title]} />;
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Saved')} />
      <TabbarLong
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
      />
    </Box>
  );
};

export default DaLuu;
