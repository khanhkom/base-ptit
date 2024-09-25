/* eslint-disable import/order */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Image, ImageBackground } from 'react-native';

import { authorize } from 'react-native-app-auth';

import R from '@assets/R';
import {
  CONFIG_SSO,
  CONG_VWA,
  dispatch,
  getVaiTroSlink,
  HEIGHT,
  openSlinkSupport,
  popupOk,
  STORAGE_KEY_TOKEN,
  WIDTH,
} from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import { APP_DISPLAY_NAME } from '@env';
import ItemIconSVG from '@libcomponents/icon-svg';
import { replaceScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { AxiosInstance } from '@networking/service';
import { getPermission, getUserMe, logOutSSO } from '@networking/user';
import { appActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { KEY_STORAGE, save } from '@utils/storage';
import { Pressable, Text, VStack } from 'native-base';
import ChangeLanguage from './component/ChangeLanguage';
import styles from './styles';
import LoadingWithLogo from '@components/Loading/LoadingWithLogo';
import { getSettingLich } from '@networking/user/SettingLich';

const SignIn = () => {
  const [loading, setloading] = useState(false);

  const handleLoginSlink = async (
    response: any,
    phanQuyen?: any,
    token?: string,
  ) => {
    if (
      ![CONG_VWA?.CONG_CAN_BO, CONG_VWA.CONG_HOC_VIEN].includes(
        phanQuyen?.rsname,
      )
    ) {
      popupOk(
        translate('slink:Notice_t'),
        translate('slink:Not_the_role'),
        logOutSSO,
      );

      return;
    }

    const mAccount = {
      HoVaTen: `${response?.data?.family_name ?? ''} ${
        response?.data?.given_name ?? ''
      }`,
      hoTen: `${response?.data?.family_name ?? ''} ${
        response?.data?.given_name ?? ''
      }`,
      token,
      vai_tro: phanQuyen?.rsname,
      ChucVu: getVaiTroSlink(phanQuyen?.rsname),
      vaiTro: getVaiTroSlink(phanQuyen?.rsname),
      role: phanQuyen?.rsname,
      isCanBo: phanQuyen?.rsname === CONG_VWA.CONG_CAN_BO,
      isGiaoVien: phanQuyen?.rsname === CONG_VWA.CONG_CAN_BO,
      language: 'vi',
      username: response?.data?.preferred_username,
      accessToken: token,
      ...response?.data,
    };

    save(KEY_STORAGE.ACCOUNT, mAccount);

    save(KEY_STORAGE.USER_NAME, mAccount?.username);

    dispatch(appActions.setAppAccount(mAccount));

    replaceScreen(APP_SCREEN.TABMAIN);

    trackEvent(MixPanelEvent.LOG_IN);
  };

  const onLoginBySlinkID = async (token: string) => {
    setloading(true);

    try {
      const [responseUser, responsePhanQuyen, responseSettingLich] =
        await Promise.all([getUserMe(), getPermission(), getSettingLich()]);
      dispatch(
        appActions.setColorCalendar(
          responseSettingLich?.data?.data?.result[0]?.danhSachSettingLich,
        ),
      );
      setloading(false);

      const findObjectCN = responsePhanQuyen?.filter(
        (item: { rsname: string }) => {
          return [CONG_VWA?.CONG_CAN_BO, CONG_VWA.CONG_HOC_VIEN].includes(
            item?.rsname,
          );
        },
      );

      save(KEY_STORAGE.LIST_ROLE, findObjectCN);

      if (responseUser?.status) {
        if (findObjectCN?.length === 2) {
          replaceScreen(APP_SCREEN.SWITCHROLE, {
            infoUser: responseUser,
            listChucNang: findObjectCN,
            token,
          });

          return;
        }

        handleLoginSlink(responseUser, findObjectCN?.[0], token);
      } else {
        popupOk(
          translate('slink:Notice_t'),
          translate('slink:Da_co_loi_xay_ra'),
        );
      }
    } catch (error) {
      await logOutSSO();

      setloading(false);
    }
  };

  const onButtonSlinkID = async () => {
    try {
      const result = await authorize(CONFIG_SSO);

      save(KEY_STORAGE.RESPONSE_SSO, result);

      AxiosInstance.defaults.headers.common.AuthorizationKey = `Bearer ${
        result?.accessToken ?? ''
      }`;

      save(STORAGE_KEY_TOKEN, result?.accessToken);

      dispatch(appActions.setToken(result?.accessToken ?? ''));

      onLoginBySlinkID(result?.accessToken ?? '');
    } catch (error) {}
  };

  return (
    <ImageBackground
      source={R.images.backgr}
      resizeMode="cover"
      style={styles.container}>
      <VStack flex={1} justifyContent="center" alignItems={'center'}>
        <ChangeLanguage />
        <Image
          source={R.images.logowithoutbackground}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text
          color={'primary.500'}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize="md"
          marginTop={'3'}>{`${APP_DISPLAY_NAME}`}</Text>
        <BaseButtonNB
          title={translate('slink:Login_with', { name: APP_DISPLAY_NAME })}
          onPress={onButtonSlinkID}
          width={WIDTH(343)}
          isLoading={loading}
          isLoadingText={translate('slink:Logging_in')}
          marginTop={HEIGHT(40)}
        />
        <Footer />
      </VStack>
      <LoadingWithLogo loading={loading} />
    </ImageBackground>
  );
};

export default SignIn;
const Footer = () => {
  return (
    <VStack position={'absolute'} bottom={HEIGHT(30)} alignItems={'center'}>
      <Pressable
        hitSlop={R.themes.hitSlop}
        _pressed={R.themes.pressed}
        onPress={openSlinkSupport}>
        <ItemIconSVG
          title={translate('slink:Support')}
          color={R.colors.primaryColor}
          width={WIDTH(21)}
          height={WIDTH(21)}
        />
      </Pressable>
      <Text
        fontFamily={R.fonts.BeVietnamProMedium}
        color={'primary.500'}
        fontSize="xs"
        mt="1">
        {translate('slink:Support')}
      </Text>
    </VStack>
  );
};
