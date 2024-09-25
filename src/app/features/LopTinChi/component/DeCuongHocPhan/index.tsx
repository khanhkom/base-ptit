/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import TabbarLong from '@components/TabbarCustome/TabbarLong';
import { InfoClassProps } from '@features/LopTinChi/ChiTietLopTinChi/type';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { translate } from '@utils/i18n/translate';

import DeCuongDanhGiaKQHT from './component/DanhGiaKQHT';
import DCHPGiangVien from './component/GiangVien';
import DeCuongHocLieu from './component/HocLieu';
import DeCuongThongTinChung from './component/ThongTinChung';
import DeCuongLichTrinhCuThe from './component/TomTatHocPhan';
import styles from './styles';

interface Props {
  route: { params: { infoClass?: InfoClassProps; dataTienTrinh?: any } };
}
const DeCuongHocPhan = (props: Props) => {
  const infoClass = props?.route?.params?.infoClass;

  const dataTienTrinh = props?.route?.params?.dataTienTrinh;

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 0, title: translate('slink:General_information') },
    { key: 1, title: translate('slink:Tom_tat_hoc_phan') },
    { key: 2, title: translate('slink:Teacher') },
    { key: 3, title: translate('slink:Courseware') },
    { key: 4, title: translate('slink:Evaluate_KQHT') },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDeCuongHocLieu();
  }, []);

  const getDeCuongHocLieu = async () => {
    try {
      setLoading(true);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const deCuongId =
    infoClass?.hocPhan?.deCuongHienTaiId ||
    infoClass?.deCuong?.deCuongId ||
    dataTienTrinh?.hocPhan?.deCuongHienTaiId ||
    dataTienTrinh?.deCuong?.deCuongId;

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 0:
        return (
          <DeCuongThongTinChung
            infoClass={infoClass ?? dataTienTrinh}
            deCuongId={deCuongId}
          />
        );
      case 1:
        return <DeCuongLichTrinhCuThe deCuongId={deCuongId} />;
      case 2:
        return <DCHPGiangVien deCuongId={deCuongId} />;
      case 3:
        return <DeCuongHocLieu deCuongId={deCuongId} />;
      case 4:
        return (
          <DeCuongDanhGiaKQHT
            infoClass={infoClass ?? dataTienTrinh}
            deCuongId={deCuongId}
          />
        );

      default:
        return null;
    }
  };

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  if (loading) {
    <View style={styles.container}>
      <HeaderReal
        title={
          dataTienTrinh?.hocPhan?.ten ?? translate('slink:Course_document')
        }
      />
      <LoadingComponent />
    </View>;
  }

  return (
    <View style={styles.container}>
      <HeaderReal
        title={
          dataTienTrinh?.hocPhan?.ten ?? translate('slink:Course_document')
        }
      />
      <TabbarLong
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
      />
    </View>
  );
};

export default DeCuongHocPhan;
