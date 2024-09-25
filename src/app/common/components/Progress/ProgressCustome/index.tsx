import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { translate } from '@utils/i18n/translate';

import { styles } from './styles';

const ProgressCustome = ({
  progressPercent,
  content,
}: {
  progressPercent: number;
  content: string;
}) => {
  const percent = progressPercent;

  const progress = useRef(new Animated.Value(0));

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
    <View style={styles.viewContainer}>
      <FastImage
        style={styles.img}
        source={R.images.flag}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.viewani}>
        <Animated.View style={[styles.animation, { width: progressWidth }]} />
        <View style={styles.gap} />
      </View>
      <View style={styles.viewAniFlag}>
        <Animated.View style={[styles.aniFlag, { width: progressWidth }]} />
        <View style={styles.viewPercent}>
          <Text style={styles.textPercent}>{`${content ?? 0} ${translate(
            'slink:Credits',
          )?.toLowerCase()}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressCustome;
