/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { useSelector } from 'react-redux';

import ItemLopThucHanh from '@components/Item/ItemLopThucHanh';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getLopTinChiGVTheoKyHoc,
  getLopTinChiSVTheoKyHoc,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';

import styles from './styles';
import { translate } from '@utils/i18n/translate';

const LopThucHanh = (props: any) => {
  const itemLopTC = props?.route?.params?.infoClass;

  const { account } = useSelector(selectAppConfig);

  const [loading, setloading] = useState(false);

  const [listClass, setlistClass] = useState([]);

  useEffect(() => {
    getLopTH();
  }, []);

  const getLopTH = async () => {
    setloading(true);

    try {
      const body = {
        page: 1,
        limit: 15,
        condition: {
          loai: 'TH',
          tenCha: itemLopTC?.ten,
        },
      };

      let res: any;
      if (account?.isGiaoVien) {
        res = await getLopTinChiGVTheoKyHoc(body);
      } else {
        res = await getLopTinChiSVTheoKyHoc(body);
      }

      setlistClass(res?.data?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const onNavigate = (item: any) => {
    navigateScreen(APP_SCREEN.THONGTINCHUNGLTC, {
      nhomTH: true,
      infoClass: item,
    });
  };

  if (loading) {
    <View style={styles.container} testID="LopThucHanh">
      <HeaderReal title={translate('slink:Lop_thuc_hanh')} />
      <LoadingComponent loading={loading} />
    </View>;
  }

  return (
    <View style={styles.container} testID="LopThucHanh">
      <HeaderReal title={translate('slink:Lop_thuc_hanh')} />
      <FlatList
        testID="FlatList_LopThucHanh"
        data={listClass ?? []}
        extraData={listClass ?? []}
        style={styles.list}
        ListEmptyComponent={<ItemTrong content={'Không có lớp thực hành'} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item, index }) => (
          <ItemLopThucHanh
            item={item}
            index={index}
            handleNavigate={() => {
              onNavigate(item);
            }}
          />
        )}
      />
    </View>
  );
};

export default LopThucHanh;
