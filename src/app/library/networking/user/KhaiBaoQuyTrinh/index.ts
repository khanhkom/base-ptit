/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaiDefaultValue } from '@common';
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';
import url from '@networking/url';

export const dsKhaiBaoQuyTrinh = (params: any, isGiangVien?: boolean) =>
  NetWorkService.Get({
    url: `${url.DANH_SACH_KB_QUY_TRINH}/${isGiangVien ? 'CBGV' : 'SINH_VIEN'}`,
    params,
  }).then(res => {
    return res;
  });

export const getQuyTrinhDong = () =>
  NetWorkService.Get({
    url: `${url.QUY_TRINH_DONG}`,
  }).then(res => {
    return res;
  });

export const getDotQuyTrinhDong = (body: {
  condition: { quyTrinhId: string | undefined };
}) =>
  NetWorkService.Get({
    url: `${url.DOT_QUY_TRINH_DONG}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getAllDotById = (id: string) =>
  NetWorkService.Get({
    url: `${url.GET_ALL_DOT_BY_ID}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const getMyAllDotById = (id: string) =>
  NetWorkService.Get({
    url: `${url.GET_MY_ALL_DOT_BY_ID}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const createQuyTrinh = (id: string | undefined, idDot: string) =>
  NetWorkService.Post(
    {
      url: `${url.CREATE_DON}/${id}/dot-quy-trinh/${idDot}`,
    },
    { message: MESSAGE_CODE.CREATE_DON },
  ).then(res => {
    return res;
  });

export const updateQuyTrinh = (id: string, buoc: string, body: any) =>
  NetWorkService.Put(
    {
      url: `${url.UPDATE_QUY_TRINH}/${id}/buoc/${buoc}`,
      body,
    },
    { message: MESSAGE_CODE.KHAI_BAO },
  ).then(res => {
    return res;
  });

export const validateQuyTrinh = (body: any) =>
  NetWorkService.Post({
    url: `${url.VALIDATE_QUY_TRINH}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const getLichSuKhaiBao = (body: any) =>
  NetWorkService.Get({
    url: `${url.LICH_SU_QUY_TRINH}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getDanhSachNamHoc = () =>
  NetWorkService.Get({
    url: `${url.DANH_SACH_NAM_HOC}`,
  }).then(res => {
    return res;
  });

export const getDefaultValueFormDong = (type: LoaiDefaultValue) =>
  NetWorkService.Get({
    url: `${url.DEFAULTV_VALUE_FORM_DONG}/${type}`,
  }).then(res => {
    return res;
  });
