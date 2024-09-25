/* eslint-disable @typescript-eslint/no-explicit-any */
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';

import url from './url';

export const getDanhSachBaiDang = (params: any) =>
  NetWorkService.Get({
    url: `${url.DIEN_DAN_BAI_DANG}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getDanhSachBinhLuan = (params: any) =>
  NetWorkService.Get({
    url: `${url.DIEN_DAN_BINH_LUAN}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getChiTietBaiDang = (id: any) =>
  NetWorkService.Get({
    url: `${url.CHI_TIET_BAI_DANG}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const postBinhLuan = (body: any) =>
  NetWorkService.Post({
    url: `${url.DIEN_DAN_BINH_LUAN_SEND}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const putBinhLuan = (body, id) =>
  NetWorkService.Put({
    url: `${url.DIEN_DAN_BINH_LUAN_SEND}/${id}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const delBinhLuan = id =>
  NetWorkService.Delete({
    url: `${url.DIEN_DAN_BINH_LUAN_SEND}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const postBaiDang = (body: any) =>
  NetWorkService.Post({
    url: `${url.BAI_DANG}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const putBaiDang = (body, id) =>
  NetWorkService.Put(
    {
      url: `${url.BAI_DANG}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delBaiDang = id =>
  NetWorkService.Delete(
    {
      url: `${url.BAI_DANG}/${id}`,
    },
    {
      message: MESSAGE_CODE.THEM_MOI,
    },
  ).then((res: any) => {
    return res;
  });
