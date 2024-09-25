/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

import ItemEvenInDay from '@components/Item/ItemEvenInDay';
import ItemPindDay from '@components/Item/ItemPinDay';
import ItemTrong from '@components/Item/ItemTrong';
import { findClosestIndexGreaterThan } from '@features/ThoiKhoaBieuV2/LichLamCalendar/agendaItems';
import { debounce } from 'lodash';

import styles from './styles';

interface Props {
  dataTKB: { data: any[]; title: string }[];
  datePress?: string;
  onDayScroll?: (e: string) => void;
  onRefresh?: () => void;
  isWeekCalendar?: boolean;
  visibleButtonLT?: boolean;
}

export const thu = [
  'Chủ nhật',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];
const AgendaList = (props: Props) => {
  const { dataTKB, datePress, onRefresh } = props;

  const scrollRef = useRef<any>(null);

  const [toDay, settoDay] = useState('');

  const result = useRef<number[]>([]);

  const onLayout = (event: LayoutChangeEvent) => {
    result.current.push(event?.nativeEvent?.layout?.y);

    if (result.current.length === dataTKB?.length) {
      const positions = result.current.sort((a, b) => a - b);

      scrollToCurrent(positions);
    }
  };

  useEffect(() => {
    if (result.current.length === dataTKB?.length) {
      const positions = result.current.sort((a, b) => a - b);

      scrollToCurrent(positions);
    }
  }, [datePress]);

  const scrollToCurrent = (positions: number[]) => {
    const index = dataTKB?.findIndex(
      (item: { data: any[]; title: string }) => item?.title === datePress,
    );

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

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    const index = findClosestIndexGreaterThan(result.current, offsetY);

    const currentDay = dataTKB?.[index]?.title;

    handleScrollDebounced(currentDay);
  };

  const handleScrollDebounced = debounce(currentPosition => {
    requestAnimationFrame(() => {
      settoDay(currentPosition);
    });
  }, 100);

  //Lịch tuần

  return (
    <View style={styles.content}>
      <ItemPindDay isVisible={!!toDay} ngayPindCur={toDay} />
      <ScrollView
        ref={handleRef}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={20}
        onScroll={onScroll}
        nestedScrollEnabled
        contentContainerStyle={styles.contentContainer}
        style={styles.list}>
        {dataTKB?.length === 0 ? (
          <ItemTrong />
        ) : (
          dataTKB?.map((item, index) => (
            <ItemEvenInDay
              key={`${index}-${item?.title}`}
              onRefresh={onRefresh}
              onLayout={onLayout}
              itemKeys={item}
              indexKeys={index}
              showDetail={() => {}}
              {...props}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default AgendaList;
