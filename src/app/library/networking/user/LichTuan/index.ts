/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';

import url from './url';

export const getLichTuanMany = (params: any) =>
  NetWorkService.Get({
    url: `${url.LICH_TUAN_MANY}`,
    params,
  }).then(res => {
    return res;
  });

export const getLichNghiTuan = (year: number, week: number) =>
  NetWorkService.Get({
    url: `${url.LICH_NGHI_TUAN}/${week}/${year}`,
  }).then(res => {
    return res;
  });

export const getLichTuanNhapManyAll = (params: any) =>
  NetWorkService.Get({
    url: `${url.LICH_TUAN_NHAP_ALL}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getLichTuanNhapMany = (params: any) =>
  NetWorkService.Get({
    url: `${url.LICH_TUAN_NHAP_MANY}`,
    params,
  }).then(res => {
    return res;
  });

export const getChuTriMany = () =>
  NetWorkService.Get({
    url: `${url.CHU_TRI_MANY}`,
  }).then((res: any) => {
    return res;
  });

export const getDonViMany = () =>
  NetWorkService.Get({
    url: `${url.DON_VI_MANY}`,
  }).then((res: any) => {
    return res;
  });

export const getPhongHopMany = (params: {}) =>
  NetWorkService.Get({
    url: `${url.PHONG_HOP_MANY}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getTruongPhongMany = (params: {}) =>
  NetWorkService.Get({
    url: `${url.TRUONG_PHO_DON_VI}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getSettingTimeRegister = () =>
  NetWorkService.Get({
    url: `${url.SETTING_TIME}`,
  }).then((res: any) => {
    return res;
  });

export const dangKyLichTuan = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.LICH_TUAN_DANG_KY}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then(res => {
    return res;
  });

export const updateLichTuan = (id: string, body: any) =>
  NetWorkService.Put(
    {
      url: `${url.LICH_TUAN_UPDATE}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.LUU },
  ).then(res => {
    return res;
  });

export const deleteLichTuan = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.LICH_TUAN_DELETE}/${id}/v2`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then(res => {
    return res;
  });

export const getChucVu = () =>
  NetWorkService.Get({
    url: `${url.CHUC_VU}`,
  }).then((res: any) => {
    return res;
  });
