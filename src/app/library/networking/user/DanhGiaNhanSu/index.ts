/* eslint-disable @typescript-eslint/no-explicit-any */
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';
import url from '@networking/url';

export const getDotDanhGiaNS = (params: any) =>
  NetWorkService.Get({
    url: `${url.DOT_DANH_GIA_NS}`,
    params,
  }).then(res => {
    return res;
  });

export const getDanhSachHopDong = (params: any) =>
  NetWorkService.Get({
    url: `${url.DANH_SACH_HOP_DONG}`,
    params,
  }).then(res => {
    return res;
  });

export const getDanhSachBieuMau = () =>
  NetWorkService.Get({
    url: `${url.DANH_SACH_BIEU_MAU}`,
  }).then(res => {
    return res;
  });

export const getBieuMauDGNS = (idBieuMau: string) =>
  NetWorkService.Get({
    url: `${url.BIEU_MAU_DANH_GIA_NS}/${idBieuMau}`,
  }).then(res => {
    return res;
  });

export const getNhanSuKS = (idDot: string) =>
  NetWorkService.Get({
    url: `${url.CAU_TRA_LOI_KS}/${idDot}/tong-hop-danh-gia`,
  }).then(res => {
    return res;
  });

export const donViGuiDanhGia = (idDot: string) =>
  NetWorkService.Put(
    {
      url: `${url.CAU_TRA_LOI_KS}/${idDot}/don-vi-gui-danh-gia`,
    },
    { message: MESSAGE_CODE.GUI },
  ).then(res => {
    return res;
  });

export const getManyDotDanhGia = () =>
  NetWorkService.Get({
    url: `${url.DOT_DANH_GIA_NHAN_SU}`,
  }).then(res => {
    return res;
  });

export const getDetailBieuMau = (ssoId: string, idDot: string) =>
  NetWorkService.Get({
    url: `${url.CAU_TRA_LOI_KS}/${ssoId}/bieu-mau/${idDot}`,
  }).then(res => {
    return res;
  });

export const onDGNhanSu = (body: any, gui?: boolean) =>
  NetWorkService.Post(
    {
      url: `${url.CAU_TRA_LOI_KS}/me`,
      body,
    },
    {
      message: gui ? MESSAGE_CODE.GUI : MESSAGE_CODE.LUU,
    },
  ).then(res => {
    return res;
  });

export const postGhiChuDonVi = (body: any) =>
  NetWorkService.Post({
    url: `${url.GHI_CHU_DON_VI}`,
    body,
  }).then(res => {
    return res;
  });

export const postGhiChuNhanSu = (body: any) =>
  NetWorkService.Post({
    url: `${url.GHI_CHU_NHAN_SU}`,
    body,
  }).then(res => {
    return res;
  });

export const getQuyenDanhGia = () =>
  NetWorkService.Get({
    url: `${url.QUYEN_DANH_GIA}`,
  }).then(res => {
    return res;
  });
