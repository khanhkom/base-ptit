/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Image, View } from 'react-native';

import * as Animatable from 'react-native-animatable';
import OneSignal from 'react-native-onesignal';

import R from '@assets/R';
import { dispatch, STORAGE_KEY_TOKEN, WIDTH } from '@common';
import { APP_DISPLAY_NAME } from '@env';
import { replaceScreen } from '@navigation/navigation-service';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { delOnesignal } from '@networking/user';
import { appActions } from '@redux-slice';
import { KEY_STORAGE, load, save } from '@utils/storage';
import { Text } from 'native-base';

import styles from './styles';
import { getSettingLich } from '@networking/user/SettingLich';
interface Props {
  route: { params: { isExpired: boolean } };
}
const Intro: FC<any> = (props: Props) => {
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await load(KEY_STORAGE.ACCOUNT);
      const responseSettingLich = await getSettingLich();
      dispatch(
        appActions.setColorCalendar(
          responseSettingLich?.data?.data?.result[0]?.danhSachSettingLich,
        ),
      );

      if (Object.keys(res)?.length !== 0) {
        dispatch(appActions.setAppAccount(res));
        dispatch(appActions.setToken(res?.token));
        changeScreen(APP_SCREEN.WELCOME);
      } else {
        dispatch(appActions.setAppAccount(null));
        changeScreen(APP_SCREEN.SIGNIN);
      }
    } catch (error) {
      changeScreen(APP_SCREEN.SIGNIN);
    }
  };

  const changeScreen = (routeName: keyof RootStackParamList) => {
    setTimeout(() => {
      replaceScreen(routeName);
    }, 1600);
  };

  return (
    // <ImageBackground
    //   resizeMode="stretch"
    //   source={R.images.tetHomeScreen}
    //   style={styles.container}>
    <View style={styles.container}>
      <Animatable.View
        animation="bounceIn"
        direction="alternate"
        duration={4000}
        style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          source={R.images.logowithoutbackground}
          style={styles.image}
        />
      </Animatable.View>
      <Animatable.View
        animation="bounceInLeft"
        direction="alternate"
        duration={3500}
        style={styles.label}>
        <Text
          width={WIDTH(343)}
          mt="3"
          textAlign={'center'}
          color={'primary.500'}
          fontSize="md"
          fontFamily={R.fonts.BeVietnamProMedium}>
          {APP_DISPLAY_NAME}
        </Text>
      </Animatable.View>
    </View>
    // </ImageBackground>
  );
};

export default Intro;
