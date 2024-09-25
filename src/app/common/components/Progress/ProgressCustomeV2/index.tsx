/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

import moment from 'moment';

import { styles } from './styles';

const ProgressCustomeV2 = (props: { list: any[] }) => {
  const { list = [] } = props;

  list.sort(
    (a, b) => new Date(a.ngay)?.valueOf() - new Date(b.ngay)?.valueOf(),
  );

  const pastLesson =
    list?.filter((e: { ngay: string }) => {
      return new Date(e.ngay) < moment().endOf('day').toDate();
    }) ?? [];

  const percent =
    pastLesson?.length === 0 ?? list?.length === 0
      ? 0
      : (pastLesson?.length * 100) / list?.length;

  const progress = useRef(new Animated.Value(0));

  const curDay = list?.[list?.length - 1]?.ngay
    ? moment(list?.[list?.length - 1]?.ngay, 'YYYY-MM-DD').format('DD/MM')
    : '--';

  useEffect(() => {
    Animated.timing(progress.current, {
      toValue: percent,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progress.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textDayHtai}>{curDay}</Text> */}
      <View style={styles.viewAni}>
        <Animated.View style={[styles.anyProgress, { width: progressWidth }]} />
        <View style={styles.gap} />
      </View>
      <View style={styles.viewAniFlag}>
        <Animated.View style={[styles.aniFlag, { width: progressWidth }]} />
        <View style={styles.viewPercent}>
          <Text style={styles.textPercent}>{`${percent.toFixed()}%`}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressCustomeV2;
