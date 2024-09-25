/* eslint-disable @typescript-eslint/no-explicit-any */
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';

import url from './url';

export const getDotDGGVV2 = (idHocKy: string) =>
  NetWorkService.Get({
    url: `${url.GET_DOT_DGGV_V2}/${idHocKy}`,
  }).then((res: any) => {
    return res;
  });
export const getDotDGGV = (params: any) =>
  NetWorkService.Get({
    url: `${url.GET_DOT_DGGV}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getGiangVienDG = (idLop: string) =>
  NetWorkService.Get({
    url: `${url.GET_GIANG_VIEN}/${idLop}`,
  }).then((res: any) => {
    return res;
  });

export const getThongBaoLTC = (idLop: string, params: any) =>
  NetWorkService.Get({
    url: `${url.THONG_BAO_LTC}/${idLop}/notification/page`,
    params,
  }).then((res: any) => {
    return res;
  });

export const taoThongBaoLTC = (idLop: string, body: any) =>
  NetWorkService.Post(
    {
      url: `${url.THONG_BAO_LTC}/${idLop}/notification`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const taoThongBaoLHC = (idLop: string, body: any) =>
  NetWorkService.Post(
    {
      url: `${url.THONG_BAO_LHC}/${idLop}/notification`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const submitDanhGiaGV = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.SUBMIT_DANH_GIA_GV}`,
      body: body,
    },
    { message: MESSAGE_CODE.GUI },
  ).then(res => {
    return res;
  });
