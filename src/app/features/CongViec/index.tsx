/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import { ECongViec } from '@common';
import TabbarCustome from '@components/TabbarCustome/Tabbar';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import DanhSachCongViec from './Items/DanhSachCongViec';

const CongViec = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState<any>([
    { key: 0, title: ECongViec.PHU_TRACH },
    { key: 1, title: ECongViec.PHOI_HOP },
  ]);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const renderScene = ({ route }) => {
    switch (route.title) {
      case ECongViec.PHU_TRACH:
        return <DanhSachCongViec type={ECongViec.PHU_TRACH} />;
      case ECongViec.PHOI_HOP:
        return <DanhSachCongViec type={ECongViec.PHOI_HOP} />;

      default:
        return null;
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Personal_work')} />
      <TabbarCustome
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
      />
    </Box>
  );
};

export default CongViec;
