/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, UIManager } from 'react-native';

import { I18nextProvider } from 'react-i18next';
import codePush from 'react-native-code-push';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import {
  isIos,
  LONG_DELAY,
  ROLE_ACCOUNT_TU_XA,
  SHORT_DELAY,
  TYPE_NOTIFICATION,
} from '@common';
import ModalCapNhat from '@components/ModalCapNhat';
import {
  ANDROID_CODE_PUSH_DEVELOPMENT_KEY,
  IOS_CODE_PUSH_DEVELOPMENT_KEY,
  ONESIGNAL_KEY,
  SENTRY_KEY,
} from '@env';
import global from '@features/global';
import NewModuleScreen from '@features/NewModuleScreen';
import { PortalProvider } from '@gorhom/portal';
import { AppContainer } from '@navigation/app-navigation';
import { resetScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { requestNotificationPermission } from '@networking/helper';
import { gvGetLopHCById } from '@networking/user';
import * as Sentry from '@sentry/react-native';
import { store } from '@store/store';
import I18n from '@utils/i18n/i18n';
import { initMixpanel, MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { KEY_STORAGE, load } from '@utils/storage';
import { NativeBaseProvider } from 'native-base';

import { themeV2 } from './app/themesV2';
if (!isIos) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

Sentry.init({
  dsn: SENTRY_KEY,
  tracesSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
  },
});

export const MyApp = () => {
  const [visible, setvisible] = useState(false);

  const [progressPercent, setprogressPercent] = useState<number>();

  if (isIos) {
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log(response);
    });
  }

  OneSignal.setAppId(ONESIGNAL_KEY);

  OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
    const notif = notifReceivedEvent.getNotification();

    notifReceivedEvent.complete(notif);
  });

  OneSignal.setNotificationOpenedHandler(notification => {
    onOpened?.(notification);
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBackApp);

    initMixpanel();

    getData();

    codePush.sync(
      {
        deploymentKey: isIos
          ? IOS_CODE_PUSH_DEVELOPMENT_KEY
          : ANDROID_CODE_PUSH_DEVELOPMENT_KEY,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      downloadProgressCallback,
    );

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', goBackApp);
  }, []);

  const downloadProgressCallback = ({
    receivedBytes,
    totalBytes,
  }: {
    receivedBytes: number;
    totalBytes: number;
  }) => {
    const progress = receivedBytes / totalBytes;

    const percentage = Math.floor(progress * 100);

    setprogressPercent(percentage);
    // Hiển thị thông tin tiến trình tải xuống
  };

  const codePushStatusDidChange = (status: any) => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE: {
        setvisible(true);

        break;
      }

      case codePush.SyncStatus.INSTALLING_UPDATE: {
        setvisible(true);

        break;
      }

      case codePush.SyncStatus.UP_TO_DATE:
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED: {
        setvisible(false);

        break;
      }
    }
  };

  const goBackApp = () => {
    global.goToFirstTab && global.goToFirstTab();

    return true;
  };

  const getLopHCDetail = async (idLopHanhChinh: string, account: any) => {
    try {
      const responseLopHC: any = await gvGetLopHCById(idLopHanhChinh);

      const itemlopHC = responseLopHC?.data?.data;

      resetScreen(
        account?.isGiaoVien
          ? APP_SCREEN.LOPHANHCHINHGV
          : APP_SCREEN.LOPHANHCHINHSV,
        {
          item: itemlopHC,
          isFromOutside: true,
          fromDetailNotiScreen: true,
        },
      );
    } catch (error) {}
  };

  const onOpened = async ({ notification }: any) => {
    const timeDelay = global.isOpened ? SHORT_DELAY : LONG_DELAY;

    let account;
    const { notifType, idLopTinChi, idLopHanhChinh } =
      notification?.additionalData;

    if (notifType === TYPE_NOTIFICATION.LOP_HANH_CHINH) {
      account = await load(KEY_STORAGE.ACCOUNT);
    }

    switch (notifType) {
      case TYPE_NOTIFICATION.DICH_VU_MOT_CUA:
        setTimeout(() => {
          resetScreen(APP_SCREEN.CHITIETDONDV1C, {
            idDon: notification?.additionalData?.id ?? '',
            isFromOutside: true,
          });
        }, timeDelay);

        break;
      case TYPE_NOTIFICATION.LOP_HANH_CHINH:
        trackEvent(MixPanelEvent.XEM_LOP_HANH_CHINH);

        account?.vai_tro === ROLE_ACCOUNT_TU_XA.SINH_VIEN
          ? resetScreen(APP_SCREEN.LOPHANHCHINHSV, {
              isFromOutside: true,
              fromDetailNotiScreen: true,
            })
          : getLopHCDetail(idLopHanhChinh, account);

        break;
      case TYPE_NOTIFICATION.DIEM_DANH:
        setTimeout(() => {
          resetScreen(APP_SCREEN.CHITIETLOPTINCHI, {
            idLopTinChi,
            isFromOutside: true,
            isNotiDiemDanh: true,
          });
        }, timeDelay);

        break;
      case TYPE_NOTIFICATION.LOP_TIN_CHI:
        setTimeout(() => {
          resetScreen(APP_SCREEN.CHITIETLOPTINCHI, {
            idLopTinChi,
            isFromOutside: true,
          });
        }, timeDelay);

        break;
      case TYPE_NOTIFICATION.DAILY_NOTIF_ALL:
        setTimeout(() => {
          idLopTinChi
            ? resetScreen(APP_SCREEN.CHITIETLOPTINCHI, {
                idLopTinChi,
                isFromOutside: true,
              })
            : resetScreen(APP_SCREEN.THONGBAO, {
                isFromOutside: true,
              });
        }, timeDelay);

        break;
      case TYPE_NOTIFICATION.LICH_TUAN:
        setTimeout(() => {
          resetScreen(APP_SCREEN.LICHTUANHOCVIEN, {
            isFromOutside: true,
          });
        }, timeDelay);

        break;

      default:
        setTimeout(() => {
          resetScreen(APP_SCREEN.CHITIETTHONGBAO, {
            idNoti: notification?.additionalData?._id,
          });
        }, timeDelay);

        break;
    }
  };

  const getData = async () => {
    await OneSignal.getDeviceState();

    await requestNotificationPermission();
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <I18nextProvider i18n={I18n}>
          <Suspense fallback={null}>
            <PortalProvider>
              <NativeBaseProvider theme={themeV2}>
                <GestureHandlerRootView style={styles.root}>
                  <AppContainer />
                  <NewModuleScreen />
                  <ModalCapNhat
                    modalVisible={visible}
                    turnOffModel={() => setvisible(false)}
                    progressPercent={progressPercent}
                  />
                </GestureHandlerRootView>
              </NativeBaseProvider>
            </PortalProvider>
          </Suspense>
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
