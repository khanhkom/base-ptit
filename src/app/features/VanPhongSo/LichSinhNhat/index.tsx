/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { HEIGHT, MONTH_OPTIONS, sortDay, WIDTH } from '@common';
import ItemLichSinhNhat from '@components/Item/ItemLichSinhNhat';
import ItemPindDay from '@components/Item/ItemPinDay';
import ModalThongTinCanBo from '@components/Item/ModalThongTinCanBo';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import { findClosestIndexGreaterThan } from '@features/ThoiKhoaBieuV2/LichLamCalendar/agendaItems';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { lichSinhNhat } from '@networking/user';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import _ from 'lodash';
import moment from 'moment';
import { Box, ScrollView } from 'native-base';

import styles from './styles';
import { translate } from '@utils/i18n/translate';

const LichSinhNhat = () => {
  const [loading, setloading] = useState(false);

  const [thongTinCanBo, setthongTinCanBo] = useState<any>(null);

  const defaultValue = moment().format('MM');

  const scrollRef = useRef<any>(null);

  const [visibleModal, setvisibleModal] = useState(false);

  const [listSinhNhat, setlistSinhNhat] = useState<any[]>([]);

  const [toDay, settoDay] = useState('');

  const result = useRef<number[]>([]);

  useEffect(() => {
    trackEvent(MixPanelEvent.XEM_LICH_SINH_NHAT);

    getData(defaultValue);
  }, []);

  const getData = async (month: string) => {
    try {
      setloading(true);

      const res: any = await lichSinhNhat(month);

      const dataSort = res?.data?.data?.sort(sortDay);

      const data = groupData(dataSort);

      const transformedDataHK =
        _.map(data, (value, key) => ({
          key,
          value,
        })) ?? [];

      setlistSinhNhat(transformedDataHK);

      setloading(false);
    } catch (error) {}
  };

  const showModal = (item: any) => {
    setthongTinCanBo(item);

    setvisibleModal(true);
  };

  const onChangeValue = (value: string) => {
    result.current = [];

    settoDay('');

    getData(value);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    const index = findClosestIndexGreaterThan(result.current?.sort(), offsetY);

    const currentDay = listSinhNhat?.[index]?.key;

    settoDay(currentDay);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    result.current.push(event?.nativeEvent?.layout?.y);

    if (result.current.length === listSinhNhat.length) {
      const positions = result.current.sort((a, b) => a - b);

      scrollToCurrent(positions);
    }
  };

  const handleRef = (ref: any) => {
    scrollRef.current = ref;
  };

  const scrollToCurrent = (positions: number[]) => {
    const index = listSinhNhat.findIndex(
      (item: { key: string }) => item?.key === moment().format('DD-MM-YYYY'),
    );

    if (index !== -1) {
      scrollRef.current?.scrollTo({
        x: 0,
        y: positions?.[index],
        animated: true,
      });
    }
  };

  if (loading) {
    return (
      <Box style={styles.container}>
        <HeaderReal title={translate('slink:BirthDayCal')} />
        <Box flex={1} paddingTop={HEIGHT(24)}>
          <SingleSelect
            width={WIDTH(343)}
            alignSelf="center"
            placeholder={translate('slink:Select_month')}
            onChangeValue={onChangeValue}
            defaultValue={defaultValue}
            data={MONTH_OPTIONS}
          />
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box style={styles.container}>
      <HeaderReal title={translate('slink:BirthDayCal')} />
      <Box flex={1} paddingTop={HEIGHT(24)}>
        <SingleSelect
          width={WIDTH(343)}
          alignSelf="center"
          placeholder={translate('slink:Select_month')}
          onChangeValue={onChangeValue}
          defaultValue={defaultValue}
          data={MONTH_OPTIONS}
        />
        <Box flex={1}>
          <ItemPindDay
            format="DD-MM-YYYY"
            isVisible={!!toDay}
            ngayPindCur={toDay}
          />
          <ScrollView
            ref={handleRef}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={onScroll}
            style={styles.content}
            contentContainerStyle={styles.contentContainer}>
            {listSinhNhat?.map((item, index) => (
              <ItemLichSinhNhat
                onLayout={onLayout}
                showDetail={showModal}
                itemKeys={item}
                key={index}
              />
            ))}
          </ScrollView>
        </Box>
      </Box>
      <ModalThongTinCanBo
        data={thongTinCanBo}
        isVisible={visibleModal}
        closeButton={() => setvisibleModal(false)}
      />
    </Box>
  );
};

export default LichSinhNhat;

function groupData(list: any) {
  const newList = list?.map((item: any) => {
    return {
      ...item,
      thoiGian: `${moment(item?.ngaySinh).format(
        'DD-MM',
      )}-${new Date().getFullYear()}`,
    };
  });

  return newList.reduce((acc: any, item: any) => {
    const { thoiGian } = item;

    if (!acc[thoiGian]) {
      // Nếu không có phần tử trong object mới với giá trị thoiGianBatDau này, thì tạo một phần tử mới với giá trị thoiGianBatDau này.
      acc[thoiGian] = [item];
    } else {
      // Ngược lại, thêm phần tử mới vào array có sẵn.
      acc[thoiGian].push(item);
    }

    return acc;
  }, {});
}
