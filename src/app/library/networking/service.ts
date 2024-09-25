/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from 'react-native';

import { refresh } from 'react-native-app-auth';

import {
  CONFIG_SSO,
  dispatch,
  getState,
  RESULT_CODE_PUSH_OUT,
  TIME_OUT,
} from '@common';
import { ParamsNetwork } from '@config/type';
import { API_URL } from '@env';
import { AppState } from '@model/app';
import { appActions } from '@redux-slice';
import { KEY_STORAGE, load, save } from '@utils/storage';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  handleError,
  MESSAGE_CODE,
  showSuccessMessage,
} from './handleResponseAPI';
import {
  controller,
  handleErrorAxios,
  handleParameter,
  handleResponseAxios,
  onPushLogout,
} from './helper';
interface AdditionParamType {
  noAuth?: boolean;
  tokenParam?: string;
  message?: MESSAGE_CODE;
  useChatToken?: boolean;
}

const tokenKeyHeader = 'Authorization';
export const AxiosInstance = Axios.create({});
let isFirst = true;
AxiosInstance.interceptors.response.use(
  response => {
    isFirst = true;
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error &&
      error.response &&
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      isFirst = false;
      originalRequest._retry = true;

      const newToken = await refreshToken();

      if (!newToken || typeof newToken !== 'string') {
        return Promise.reject(error);
      }

      const res = await load(KEY_STORAGE.ACCOUNT);

      const newAccount = { ...res, token: newToken, accessToken: newToken };

      save(KEY_STORAGE.ACCOUNT, newAccount);

      dispatch(appActions.setToken(newToken));

      originalRequest.headers[tokenKeyHeader] = `Bearer ${newToken}`;

      const response = await AxiosInstance(originalRequest);

      return response;
    }
    return Promise.reject(error);
  },
);

// refresh token
async function refreshToken() {
  try {
    const res = await load(KEY_STORAGE.RESPONSE_SSO);

    const result = await refresh(CONFIG_SSO, {
      refreshToken: res?.refreshToken,
    });

    return result?.accessToken;
  } catch (error) {
    return error;
  }
}

// base
function Request<Params, Body, T = Record<string, unknown>>(
  config: ParamsNetwork<Params, Body>,
  additionParam?: AdditionParamType,
) {
  const { token }: AppState = getState('app');

  const defaultConfig: AxiosRequestConfig = {
    baseURL: config.baseURL || API_URL,
    ...(!!config?.responseType && { responseType: config?.responseType }),
    timeout: TIME_OUT,
    paramsSerializer: {
      serialize: (params: any) => {
        const parts: any = [];

        const encode = (val: any) => {
          return encodeURIComponent(val)
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+');
          // .replace(/%5B/gi, '[')
          // .replace(/%5D/gi, ']');
        };

        const convertPart = (key: any, val: any) => {
          if (val instanceof Date) {
            val = val.toISOString();
          } else if (val instanceof Object) {
            val = JSON.stringify(val);
          }

          parts.push(encode(key) + '=' + encode(val));
        };

        Object.entries(params).forEach(([key, val]) => {
          if (val === null || typeof val === 'undefined') {
            return;
          }

          if (Array.isArray(val)) {
            val.forEach((v, i) => convertPart(`${key}[${i}]`, v));
          } else {
            convertPart(key, val);
          }
        });

        return parts.join('&');
      },
    },
    headers: {
      ...config?.headers,
      ...(!additionParam?.noAuth && {
        [tokenKeyHeader]: `Bearer ${additionParam?.tokenParam || token || ''}`,
      }),
    },
  };

  return new Promise<ResponseBase<T> | null>((rs, rj) => {
    AxiosInstance.request(
      StyleSheet.flatten([
        defaultConfig,
        config,
        { signal: config?.controller?.signal || controller.current?.signal },
      ]),
    )
      .then((res: AxiosResponse<T>) => {
        const result = handleResponseAxios(res);

        rs(result);

        showSuccessMessage(additionParam?.message);
      })
      .catch((error: AxiosError<T>) => {
        if (error.code === AxiosError.ERR_CANCELED) {
          rs(null);
        }
        const result = handleErrorAxios(error);
        console.log('===>error', error);
        if (error?.response?.status === RESULT_CODE_PUSH_OUT) {
          onPushLogout();

          rs(null);
        } else {
          rs(result as ResponseBase<T>);

          rj(handleError(additionParam?.message, error));
        }
      });
  });
}

// get
async function Get<Param, T>(
  params: ParamsNetwork<Param, undefined>,
  additionParam?: AdditionParamType,
) {
  return Request<Param, undefined, T>(
    handleParameter<ParamsNetwork<Param, undefined>, Param, undefined>(
      params,
      'GET',
    ),
    additionParam,
  );
}

// post
async function PostSSO<Body, T>(
  params: ParamsNetwork<undefined, Body>,
  additionParam?: AdditionParamType,
) {
  const { token }: AppState = getState('app');

  const headers: AxiosRequestConfig['headers'] = {
    [tokenKeyHeader]: `Bearer ${token ?? ''}`,
    'content-type': 'application/x-www-form-urlencoded',
  };

  return Request<undefined, Body, T>(
    handleParameter<ParamsNetwork<undefined, Body>, undefined, Body>(
      { ...params, headers },
      'POST',
    ),
    additionParam,
  );
}

async function Post<Body, T>(
  params: ParamsNetwork<undefined, Body>,
  additionParam?: AdditionParamType,
) {
  return Request<undefined, Body, T>(
    handleParameter<ParamsNetwork<undefined, Body>, undefined, Body>(
      params,
      'POST',
    ),
    additionParam,
  );
}

// post FormData
async function PostFormData<Body, T>(
  params: ParamsNetwork<undefined, Body>,
  additionParam?: AdditionParamType,
) {
  const { token }: AppState = getState('app');

  const headers: AxiosRequestConfig['headers'] = {
    [tokenKeyHeader]: `Bearer ${token ?? ''}`,
    'Content-Type': 'multipart/form-data',
  };

  return Request<undefined, Body, T>(
    handleParameter<
      AxiosRequestConfig & ParamsNetwork<undefined, Body>,
      undefined,
      Body
    >({ ...params, headers }, 'POST'),
    additionParam,
  );
}

// put
async function Put<Body, T>(
  params: ParamsNetwork<undefined, Body>,
  additionParam?: AdditionParamType,
) {
  return Request<undefined, Body, T>(
    handleParameter<ParamsNetwork<undefined, Body>, undefined, Body>(
      params,
      'PUT',
    ),
    additionParam,
  );
}

// delete
async function Delete<Body, T>(
  params: ParamsNetwork<undefined, Body>,
  additionParam?: AdditionParamType,
) {
  return Request<undefined, Body, T>(
    handleParameter<ParamsNetwork<undefined, Body>, undefined, Body>(
      params,
      'DELETE',
    ),
    additionParam,
  );
}

export const NetWorkService = {
  Get,
  Post,
  PostSSO,
  Put,
  Delete,
  PostFormData,
  Request,
};
