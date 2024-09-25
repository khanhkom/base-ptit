/* eslint-disable react-native/split-platform-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRef } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

import {
  CODE_SUCCESS,
  CODE_TIME_OUT,
  dispatch,
  ERROR_NETWORK_CODE,
  handleErrorApi,
  logout,
  RESULT_CODE_PUSH_OUT,
  STATUS_TIME_OUT,
} from '@common';
import { ParamsNetwork } from '@config/type';
import { AccountProps } from '@model/app';
import { appActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { KEY_STORAGE, save } from '@utils/storage';
import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import { getGiangVienProfile, getStudentProfile, getUserMe } from './user';

const responseDefault: ResponseBase<Record<string, unknown>> = {
  code: -500,
  status: false,
  msg: translate('error:have_error'),
};

export const onPushLogout = async () => {
  logout();
  /**
   * do something when logout
   */
};

export const controller = createRef<AbortController>();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// init controller
controller.current = new AbortController();

export const cancelAllRequest = () => {
  controller.current?.abort();

  // reset controller, if not. all request cannot execute
  // because old controller was aborted
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  controller.current = new AbortController();
};

export const handleResponseAxios = <T = Record<string, unknown>>(
  res: AxiosResponse<T>,
): ResponseBase<T> => {
  if (res.data) {
    return { code: CODE_SUCCESS, status: true, data: res.data };
  }

  return responseDefault as ResponseBase<T>;
};

export const handleErrorAxios = <T = Record<string, unknown>>(
  error: AxiosError,
): ResponseBase<T> => {
  if (error.code === STATUS_TIME_OUT) {
    // timeout
    return handleErrorApi(CODE_TIME_OUT) as unknown as ResponseBase<T>;
  }

  if (error.response) {
    if (error.response.status === RESULT_CODE_PUSH_OUT) {
      return handleErrorApi(RESULT_CODE_PUSH_OUT) as unknown as ResponseBase<T>;
    } else {
      return handleErrorApi(error.response) as unknown as ResponseBase<T>;
    }
  }

  return handleErrorApi(ERROR_NETWORK_CODE) as unknown as ResponseBase<T>;
};

export const handlePath = (
  url: string,
  path: ParamsNetwork<undefined, undefined>['path'],
) => {
  if (!path || Object.keys(path).length <= 0) {
    return url;
  }

  let resUrl = url;
  Object.keys(path).forEach(k => {
    resUrl = resUrl.replaceAll(`{${k}}`, String(path[k]));

    resUrl = resUrl.replaceAll(`:${k}`, String(path[k]));
  });

  return resUrl;
};

export const handleParameter = <
  T extends ParamsNetwork<Param, Body>,
  Param,
  Body,
>(
  props: T,
  method: Method,
): ParamsNetwork<Param, Body> => {
  const { url, body, path, params } = props;

  return {
    ...props,
    method,
    url: handlePath(url, path),
    data: body,
    params,
  };
};

export const getVaiTroByToken = async (Account: AccountProps | null) => {
  axios.defaults.headers.common.Authorization = `Bearer ${Account?.token}`;

  try {
    const myProfile: any = await getUserMe();
    const extraInfo: any = Account?.isGiaoVien
      ? await getGiangVienProfile()
      : await getStudentProfile();
    const newAccount = {
      ...(Account || {}),
      ...(myProfile?.data?.data || {}),
      ...(extraInfo?.data?.data || {}),
    };
    save(KEY_STORAGE.ACCOUNT, newAccount);

    save(KEY_STORAGE.USER_NAME, newAccount?.username);

    dispatch(appActions.setAppAccount(newAccount));

    return newAccount;
  } catch (error) {}
};
export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS')
        .then(async response => {
          if (!response) {
            await PermissionsAndroid.request(
              'android.permission.POST_NOTIFICATIONS',
              {
                title: 'Notification',
                message:
                  'App needs access to your notification ' +
                  'so you can get Updates',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
          }
        })
        .catch(err => {
          console.log('Notification Error=====>', err);
        });
    } catch (err) {
      console.log('Notification Error=====>', err);
    }
  }
};
