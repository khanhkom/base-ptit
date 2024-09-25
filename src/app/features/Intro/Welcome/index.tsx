import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { WIDTH } from '@common';
import { replaceScreen } from '@navigation/navigation-service';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Text } from 'native-base';

import styles from './styles';

const Welcome = () => {
  const opacity = useRef(new Animated.Value(0));

  const { account } = useSelector(selectAppConfig);

  useEffect(() => {
    startAnimation();
    changeScreen(APP_SCREEN.TABMAIN);
  }, []);

  const startAnimation = () => {
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  const changeScreen = (routeName: keyof RootStackParamList) => {
    setTimeout(() => {
      replaceScreen(routeName);
    }, 1500);
  };

  return (
    <Animated.View style={[styles.container]}>
      <Text
        color="white"
        textAlign="center"
        flexWrap="wrap"
        width={WIDTH(343)}
        fontSize={'md'}
        fontFamily={R.fonts.BeVietnamProMedium}>
        {`${translate('slink:Hello')}, ${
          account?.data?.fullname || account?.fullname || '--'
        }!`}
      </Text>
    </Animated.View>
  );
};

export default Welcome;
