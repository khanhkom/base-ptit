import { I18nKeys } from '@utils/i18n/locales';
import { AxiosRequestConfig } from 'axios';

export interface ParamsNetwork<T, U> extends AxiosRequestConfig {
  url: string;
  params?: T;
  path?: Record<string, string | number>;
  body?: U;
  controller?: AbortController;
}

export enum SLICE_NAME {
  APP = 'APP_',
  AUTHENTICATION = 'AUTHENTICATION_',
  TEST = 'TEST_',
}

export type ValidateMessageObject = {
  keyT: I18nKeys;
  optionsTx?: Record<string, I18nKeys>;
  options?: Record<string, string | number>;
};
