/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';

import R from '@assets/R';
import { findObject, HEIGHT, LOAI_LOP, WIDTH } from '@common';
import ItemChucNang from '@components/Item/ItemChucNang';
import ModalInfoGiangVien from '@components/Item/ModalInfoGiangVien';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import {
  goBack,
  navigateScreen,
  replaceScreen,
} from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getListSVLopHC, svGetLopHC } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import { Box, Pressable, VStack } from 'native-base';

import ItemThongTinLopHC from './component/ItemThongTinLopHC';
import { LopHanhChinhProps } from './type';

const listChucNang = [{ label: translate('slink:Student_info'), icon: '' }];

const LopHanhChinhSV = (props: any) => {
  const [loading, setLoading] = useState(false);

  const [isVisibleGV, setisVisibleGV] = useState(false);

  const [listSinhVien, setlistSinhVien] = useState([]);

  const [dataLopHc, setDataLopHc] = useState<any>(null);

  const [listLopHCData, setlistLopHCData] = useState<
    { value: string; label: string }[]
  >([]);

  const [listLopHC, setlistLopHC] = useState<LopHanhChinhProps[]>([]);

  const handleBackPress = () => {
    const isFromOutside = props.navigation?.getParam?.('isFromOutside');

    if (isFromOutside && !_.isUndefined(isFromOutside)) {
      replaceScreen(APP_SCREEN.TABMAIN);
    } else {
      goBack();
    }

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    getData();

    return () => {
      const funGoBack = props.navigation?.getParam?.('funGoBack');

      funGoBack?.();

      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const getData = async () => {
    try {
      setLoading(true);

      const response1: any = await svGetLopHC({ page: 1, limit: 10 });

      setlistLopHC(response1?.data?.data?.result ?? []);

      setDataLopHc(response1?.data?.data?.result?.[0]);

      const listLopData =
        response1?.data?.data?.result?.map(
          (item: { ten: string; _id: string }) => {
            return {
              label: item?.ten,
              value: item?._id,
            };
          },
        ) ?? [];

      setlistLopHCData(listLopData);

      if (listLopData?.length < 2) {
        const listSV: any = await getListSVLopHC(listLopData?.[0]?.value);

        setlistSinhVien(listSV?.data?.data?.sinhVienList ?? []);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChangeValue = async (value: any) => {
    if (value) {
      const listSV: any = await getListSVLopHC(value);

      setlistSinhVien(listSV?.data?.data?.sinhVienList ?? []);

      const dataLop = findObject(listLopHC, '_id', value);

      setDataLopHc(dataLop);
    } else {
      setlistSinhVien([]);

      setDataLopHc(null);
    }
  };

  const goToFunc = (title: string) => {
    switch (title) {
      case translate('slink:Student_info'):
        navigateScreen(APP_SCREEN.THONGTINSINHVIENLHC, {
          listHS: listSinhVien,
          siSo: dataLopHc?.siSo ?? 0,
        });

        break;

      default:
        break;
    }
  };

  const onDetailNotify = () => {
    navigateScreen(APP_SCREEN.THONGBAOGV, {
      loaiLop: LOAI_LOP.LOP_HC,
      infoClass: dataLopHc,
    });
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        onButton={handleBackPress}
        title={translate('slink:Lop_hanh_chinh')}
        childrenRight={
          <ChildrenRight visible={!!dataLopHc} onPress={onDetailNotify} />
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getData} />
        }
        contentContainerStyle={styles.content}>
        {listLopHCData?.length > 1 && !loading && (
          <SingleSelect
            width={WIDTH(343)}
            mb="6"
            alignSelf="center"
            placeholder={translate('slink:Chon_lop_hanh_chinh')}
            onChangeValue={onChangeValue}
            defaultValue={listLopHCData?.[0]?.value}
            data={listLopHCData}
          />
        )}
        <VStack>
          <ItemThongTinLopHC
            isLoaded={!loading}
            sySo={listSinhVien?.length ?? 0}
            data={dataLopHc}
            onPress={() => setisVisibleGV(true)}
          />
          <Box paddingLeft={WIDTH(16)} paddingRight={WIDTH(16)}>
            {listChucNang?.map((item, index) => {
              return (
                <ItemChucNang
                  isLoaded={!loading}
                  key={index}
                  onPress={() => goToFunc(item?.label)}
                  content={item?.label}
                  icon={item?.label}
                />
              );
            })}
          </Box>
        </VStack>
      </ScrollView>
      <ModalInfoGiangVien
        data={dataLopHc?.giangVien}
        isVisible={isVisibleGV}
        closeButton={() => setisVisibleGV(false)}
      />
    </Box>
  );
};

export default LopHanhChinhSV;

const ChildrenRight = ({
  onPress,
  visible,
}: {
  onPress: () => void;
  visible: boolean;
}) => {
  if (visible) {
    return (
      <Pressable _pressed={R.themes.pressed} onPress={onPress}>
        <ItemIconSVG
          title={translate('slink:Notice_t')}
          color={R.colors.white}
          width={WIDTH(24)}
          height={WIDTH(24)}
        />
      </Pressable>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  content: { paddingTop: HEIGHT(24) },
});
