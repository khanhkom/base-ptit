/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import R from '@assets/R';
import TabbarLong from '@components/TabbarCustome/TabbarLong';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { getChiTietTaiSanVatTu } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, View } from 'native-base';

import LichSuDieuChuyenTaiSan from './LichSuDieuChuyenTaiSan';
import LichSuSuDungTaiSan from './LichSuSuDungTaiSan';
import styles from './styles';
import ThongTinChung from './ThongTinChung';

const ChiTietTaiSanVatTu = (props: any) => {
  const id = props?.route?.params?.id;

  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState(props?.route?.params?.data ?? {});

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      setLoading(true);

      const res = await getChiTietTaiSanVatTu(id);

      setItem(res?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [routes] = useState<any>([
    { key: 0, title: translate('slink:General_information') },
    { key: 1, title: 'Lịch sử điều chuyển tài sản' },
    { key: 2, title: 'Lịch sử sử dụng tài sản' },
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 0:
        return <ThongTinChung item={item} />;
      case 1:
        return <LichSuDieuChuyenTaiSan item={item} />;
      case 2:
        return <LichSuSuDungTaiSan item={item} />;

      default:
        return null;
    }
  };

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderReal title={translate('slink:Assets_and_supplies')} />
        <LoadingComponent loading={loading} />
      </View>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Assets_and_supplies')} />
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

export default ChiTietTaiSanVatTu;
