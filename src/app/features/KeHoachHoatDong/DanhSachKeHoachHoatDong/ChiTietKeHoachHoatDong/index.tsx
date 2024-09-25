/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import TabbarLong from '@components/TabbarCustome/TabbarLong';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box, View } from 'native-base';

import ChiTietKeHoach from './ChiTietKeHoach';
import DuToanKinhPhi from './DuToanKinhPhi';
import styles from './styles';
import ThongTinKeHoachChuyenMon from './ThongTinKeHoachChuyenMon';

const ChiTietKeHoachHoatDong = (props: any) => {
  const item = props?.route?.params?.item;

  const listDot = props?.route?.params?.listDot;

  const [index, setIndex] = useState(0);

  const [routes] = useState<any>(
    item?.keHoachNam?.maNguonKinhPhi?.length === 0
      ? [
          { key: 0, title: 'Thông tin kế hoạch chuyên môn' },
          { key: 1, title: 'Chi tiết kế hoạch' },
        ]
      : [
          { key: 0, title: 'Thông tin kế hoạch chuyên môn' },
          { key: 1, title: 'Chi tiết kế hoạch' },
          { key: 2, title: 'Dự toán kinh phí' },
        ],
  );

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 0:
        return <ThongTinKeHoachChuyenMon item={item} listDot={listDot} />;
      case 1:
        return <ChiTietKeHoach item={item} />;
      case 2:
        return <DuToanKinhPhi item={item} />;

      default:
        return null;
    }
  };

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Activity_plan')} />
      <View style={styles.content}>
        <TabbarLong
          renderScene={renderScene}
          onIndexChange={onIndexChange}
          navigationState={{ index, routes }}
        />
      </View>
    </Box>
  );
};

export default ChiTietKeHoachHoatDong;
