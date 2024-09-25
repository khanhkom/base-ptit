/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import { EQuaTrinhDaoTaoBoiDuong } from '@common';
import TabbarCustome from '@components/TabbarCustome/Tabbar';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import DanhSachQuaTrinhCuDi from './Items/DanhSachQuaTrinhCuDi';

const QuaTrinhCuDiDTBD = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState<any>([
    { key: 0, title: EQuaTrinhDaoTaoBoiDuong.TRUONG },
    { key: 1, title: EQuaTrinhDaoTaoBoiDuong.CA_NHAN },
  ]);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const renderScene = ({ route }) => {
    switch (route.title) {
      case EQuaTrinhDaoTaoBoiDuong.TRUONG:
        return <DanhSachQuaTrinhCuDi type={EQuaTrinhDaoTaoBoiDuong.TRUONG} />;
      case EQuaTrinhDaoTaoBoiDuong.CA_NHAN:
        return <DanhSachQuaTrinhCuDi type={EQuaTrinhDaoTaoBoiDuong.CA_NHAN} />;

      default:
        return null;
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Process_sending_for_training')} />
      <TabbarCustome
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
      />
    </Box>
  );
};

export default QuaTrinhCuDiDTBD;
