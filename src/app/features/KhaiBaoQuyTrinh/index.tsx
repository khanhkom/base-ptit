/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import { EKhaiBaoQuyTrinh } from '@common';
import TabbarCustome from '@components/TabbarCustome/Tabbar';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import DonDichVu from './DonDichVu';
import LichSuGuiDon from './LichSuGuiDon';

const KhaiBaoQuyTrinh = () => {
  const [index, setIndex] = useState(0);

  const [refresh, setrefresh] = useState(false);

  const [routes] = useState<any>([
    { key: 0, title: EKhaiBaoQuyTrinh.DON_DICH_VU },
    { key: 1, title: EKhaiBaoQuyTrinh.LICH_SU_GUI_DON },
  ]);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const onRefresh = (curindex: number) => {
    setIndex(curindex);

    setrefresh(!refresh);
  };

  const renderScene = ({ route }) => {
    switch (route.title) {
      case EKhaiBaoQuyTrinh.DON_DICH_VU:
        return <DonDichVu onIndexChange={onRefresh} />;
      case EKhaiBaoQuyTrinh.LICH_SU_GUI_DON:
        return <LichSuGuiDon refresh={refresh} />;

      default:
        return null;
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Administrative_service')} />
      <TabbarCustome
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
      />
    </Box>
  );
};

export default KhaiBaoQuyTrinh;
