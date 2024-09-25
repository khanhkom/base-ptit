/* eslint-disable @typescript-eslint/no-explicit-any */
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';
import url from '@networking/url';

export const getDetailKeKhai = (id: string) =>
  NetWorkService.Get({
    url: `${url.KE_KHAI_TAI_SAN}/${id}`,
  }).then(res => {
    return res;
  });

export const getInfoKeKhaiTaiSan = (id: string) =>
  NetWorkService.Get({
    url: `${url.DS_DOT_KE_KHAI_TAI_SAN}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const saveKhaiBao = (id: string, body: any, gui: boolean) =>
  NetWorkService.Put(
    {
      url: `${url.KE_KHAI_TAI_SAN}/${id}`,
      body,
    },
    {
      message: gui ? MESSAGE_CODE.GUI : MESSAGE_CODE.LUU,
    },
  ).then(res => {
    return res;
  });

export const saveNewKhaiBao = (body: any, gui: boolean) =>
  NetWorkService.Post(
    {
      url: `${url.KE_KHAI_TAI_SAN}`,
      body,
    },
    {
      message: gui ? MESSAGE_CODE.GUI : MESSAGE_CODE.LUU,
    },
  ).then(res => {
    return res;
  });

export const exportKhaiBao = (ssoId: string, id: string) =>
  NetWorkService.Get({
    url: `${url.KE_KHAI_TAI_SAN}/${ssoId}/export-ke-khai/dot/${id}`,
    responseType: 'arraybuffer',
  }).then(res => {
    return res;
  });
