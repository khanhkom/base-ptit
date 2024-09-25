/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import TabbarCustome from '@components/TabbarCustome/Tabbar';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import { LoaiBangLamThem } from './constant';
import CalendarWeek from './Tab/CalendarWeek';
import ThucTe from './ThucTe';

const BangLamThemGio = () => {
  const [index, setIndex] = useState(0);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const [routes] = useState<any>([
    { key: 0, title: LoaiBangLamThem.DU_KIEN },
    { key: 1, title: LoaiBangLamThem.THUC_TE },
  ]);

  const renderScene = ({ route }) => {
    switch (route.title) {
      case LoaiBangLamThem.DU_KIEN:
        return (
          <Box flex={1}>
            <CalendarWeek />
          </Box>
        );
      case LoaiBangLamThem.THUC_TE:
        return <ThucTe />;

      default:
        return null;
    }
  };

  return (
    <Box flex={1} backgroundColor="white">
      <HeaderReal title={translate('slink:Ot_table')} />
      <TabbarCustome
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
      />
    </Box>
  );
};

export default BangLamThemGio;
