/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

import ItemLopHanhChinhSV from '@components/Item/ItemLopHanhChinhGV';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import {
  goBack,
  navigateScreen,
  resetScreen,
} from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getAllLopHC } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import { Box, FlatList } from 'native-base';

import styles from './styles';

const LopHanhChinhGV = (props: any) => {
  const isFromOutside = props.route.params?.isFromOutside;

  const [listClass, setlistClass] = useState<Array<any>>([]);

  const [loading, setloading] = useState(true);

  const handleBackPress = () => {
    if (isFromOutside && !_.isUndefined(isFromOutside)) {
      resetScreen(APP_SCREEN.TABMAIN);
    } else {
      goBack();
    }

    return true;
  };

  const getDataGiangVien = async () => {
    setloading(true);

    try {
      const body = {
        page: 1,
        limit: 20,
      };

      const responseGetLopHC: any = await getAllLopHC(body);

      setlistClass(responseGetLopHC?.data?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    getDataGiangVien();

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <Box style={styles.container}>
      <HeaderReal
        title={translate('slink:Lop_hanh_chinh')}
        onButton={handleBackPress}
      />
      <FlatList
        data={listClass}
        extraData={listClass}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={getDataGiangVien}
        ListEmptyComponent={<ItemTrong />}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item, index }) => (
          <ItemLopHanhChinhSV
            handleNavigate={() => {
              navigateScreen(APP_SCREEN.CHITIETLOPHC, { item });
            }}
            item={item}
            index={index}
          />
        )}
      />
    </Box>
  );
};

export default LopHanhChinhGV;
