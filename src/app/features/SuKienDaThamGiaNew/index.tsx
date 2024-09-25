/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import TabbarCustome from '@components/TabbarCustome/Tabbar';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import DaDangKy from './DaDangKy';
import DaThamGia from './DaThamGia';

const SuKienDaThamGia = (props: any) => {
  const [index, setIndex] = useState(props?.route?.params?.isThamGia ?? 0);

  const [routes] = useState<any>([
    { key: 0, title: 'Đã đăng ký' },
    { key: 1, title: 'Đã tham gia' },
  ]);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 0:
        return <DaDangKy />;
      case 1:
        return <DaThamGia />;

      default:
        return null;
    }
  };

  return (
    <Box flex={1} bg={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Su_kien_da_tham_gia')} />
      <Box flex={1}>
        <TabbarCustome
          renderScene={renderScene}
          onIndexChange={onIndexChange}
          navigationState={{ index, routes }}
          lazy={false}
        />
      </Box>
    </Box>
  );
};

export default SuKienDaThamGia;
