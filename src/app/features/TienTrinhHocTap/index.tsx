/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import HeaderSongNganh from '@components/HeaderSongNganh';
import { KhoaNganh } from '@components/HeaderSongNganh/type';
import TabbarCustome from '@components/TabbarCustome/Tabbar';
import { getHinhThucDanhGia } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import ChuongTrinhKhung from './ChuongTrinhKhung';
import styles from './styles';
import TienTrinhThucTe from './TienTrinhThucTe';

const TienTrinhHocTap = () => {
  const [index, setIndex] = useState(0);

  const [hinhThucDG, sethinhThucDG] = useState([]);

  const [routes] = useState<any>([
    { key: 0, title: translate('slink:Actual_progress') },
    { key: 1, title: translate('slink:Education_program') },
  ]);

  const [khoaNganhCurrent, setkhoaNganhCurrent] = useState<KhoaNganh>();

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resHTDG: any = await getHinhThucDanhGia();

      sethinhThucDG(resHTDG?.data?.data ?? []);
    } catch (error) {}
  };

  const renderScene = ({ route }: any) => {
    switch (route?.key) {
      case 0:
        return (
          <TienTrinhThucTe
            khoaNganhCurrent={khoaNganhCurrent}
            hinhThucDG={hinhThucDG}
          />
        );

      case 1:
        return (
          <ChuongTrinhKhung
            khoaNganhCurrent={khoaNganhCurrent}
            hinhThucDG={hinhThucDG}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderSongNganh
        onChangeKhoaNganh={setkhoaNganhCurrent}
        title={translate('slink:Learning_process')}
      />
      <TabbarCustome
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
      />
    </View>
  );
};

export default TienTrinhHocTap;
