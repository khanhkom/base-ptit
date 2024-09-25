/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { WIDTH } from '@common';
import ItemThongTinBuoiHoc from '@components/Item/ItemThongTinBuoiHoc';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDanhSachBuoiHocGV, getDanhSachBuoiHocSV } from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Pressable, useDisclose, useTheme } from 'native-base';

import styles from './styles';
import ThongKeBuoiHoc from './ThongKe';
import { BuoiHocProps } from './type';

const ThongTinBuoiHoc = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const [listBuoiHoc, setlistBuoiHoc] = useState<BuoiHocProps[]>([]);

  const infoClass = props?.route?.params?.infoClass;

  const { account } = useSelector(selectAppConfig);

  const [loading, setloading] = useState(false);

  const currentDay = moment().format('YYYY-MM-DD');

  const currentTime = new Date().getTime();

  const scrollRef = useRef<any>(null);

  const result = useRef<number[]>([]);

  const getData = async () => {
    setloading(true);

    try {
      let res: any = null;
      if (account?.isGiaoVien) {
        res = await getDanhSachBuoiHocGV(infoClass?.ten);
      } else {
        res = await getDanhSachBuoiHocSV(infoClass?.ten);
      }

      setlistBuoiHoc(res?.data?.data ?? []);

      setloading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const scrollToCurrent = (positions: Array<number>) => {
    const index = listBuoiHoc?.findIndex((item: any) => {
      const ngayHoc = moment(item?.thoiGianBatDau).format('YYYY-MM-DD');

      return ngayHoc === currentDay;
    });

    if (index !== -1) {
      scrollRef.current?.scrollTo({
        x: 0,
        y: positions?.[index],
        animated: true,
      });
    }
  };

  const handleRef = (ref: any) => {
    scrollRef.current = ref;
  };

  const onLayout = (event: LayoutChangeEvent) => {
    result.current.push(event?.nativeEvent?.layout?.y);

    if (result.current.length === listBuoiHoc.length) {
      const positions = result.current.sort((a, b) => a - b);

      scrollToCurrent(positions);
    }
  };

  const onGoTo = (item: any, title: string) => {
    navigateScreen(
      account?.isGiaoVien
        ? APP_SCREEN.BUOIHOCGIANGVIEN
        : APP_SCREEN.CHITIETBUOIHOC,
      {
        funGoBack: getData,
        infoCard: item,
        title: title,
      },
    );
  };

  const onDetailFunc = () => {
    if (account?.isGiaoVien) {
      navigateScreen(APP_SCREEN.LICHSUDAYBU, { tenBuoiHoc: infoClass?.ten });
    } else {
      onOpen && onOpen();
    }
  };

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Buoi_hoc_information')}
        childrenRight={
          <RightComponent isGV={account?.isGiaoVien} onPress={onDetailFunc} />
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getData} />
        }
        showsVerticalScrollIndicator={false}
        ref={handleRef}
        style={styles.content}
        contentContainerStyle={styles.contentFL}>
        {listBuoiHoc?.length > 0 ? (
          listBuoiHoc.map((item, index) => (
            <ItemThongTinBuoiHoc
              key={index}
              index={index}
              onLayout={onLayout}
              currentDay={currentDay}
              currentTime={currentTime}
              listKeysByPeriod={listBuoiHoc?.map(e => e?.ngay) ?? []}
              data={item}
              onPress={onGoTo}
              account={account}
            />
          ))
        ) : (
          <ItemTrong content={translate('slink:Khong_co_thong_tin_lop_hoc')} />
        )}
      </ScrollView>
      <ThongKeBuoiHoc
        isOpen={isOpen}
        onClose={onClose}
        listBuoiHoc={listBuoiHoc}
      />
    </View>
  );
};

export default ThongTinBuoiHoc;
const RightComponent = (props: {
  onPress: () => void;
  isGV: boolean | undefined;
}) => {
  const { onPress, isGV } = props;

  const theme = useTheme();

  return (
    <Pressable
      hitSlop={R.themes.hitSlop}
      _pressed={R.themes.pressed}
      onPress={onPress}>
      <ItemIconSVG
        title={
          isGV
            ? translate('slink:Lich_su_dang_ky_day_bu')
            : translate('slink:Statistical')
        }
        color={theme.colors.white}
        width={WIDTH(24)}
        height={WIDTH(24)}
      />
    </Pressable>
  );
};
