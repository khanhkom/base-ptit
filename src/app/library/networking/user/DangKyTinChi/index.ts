/* eslint-disable @typescript-eslint/no-explicit-any */
import { NetWorkService } from '@networking/service';
import url from '@networking/url';

export const getDSDotCapNhatHS = (params: any) =>
  NetWorkService.Get({
    url: `${url.LIST_DOT_CAP_NHAT_HO_SO}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getDSKyHoc = (params: any) =>
  NetWorkService.Get({
    url: `${url.DS_KY_HOC_SINH_VIEN}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getDSHocPhan = (
  maHK: string,
  maChuongTrinh: string,
  params: any,
) =>
  NetWorkService.Get({
    url: `${url.DANG_KY_TIN_CHI_HOC_PHAN}/${maHK}/loai/${maChuongTrinh}/page`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getDSChiTietHocPhan = (
  maHK: string,
  maChuongTrinh: string,
  params: any,
) =>
  NetWorkService.Get({
    url: `${url.DANG_KY_DS_HOC_PHAN}/${maHK}/loai/${maChuongTrinh}/page`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getMucThuHocPhiTheoNam = (maNam: string) =>
  NetWorkService.Get({
    url: `${url.MUC_THU_ME}/${maNam}`,
  }).then((res: any) => {
    return res;
  });

export const getDotDangKyTC = (maKy: string) =>
  NetWorkService.Get({
    url: `${url.DOT_DANG_KY_TC}/${maKy}`,
  }).then((res: any) => {
    return res;
  });

export const getDSMonHocByHK = (maKy: string) =>
  NetWorkService.Get({
    url: `${url.DS_MON_HOC}/${maKy}`,
  }).then((res: any) => {
    return res;
  });

export const getTinChiValidateHK = (maKy: string) =>
  NetWorkService.Get({
    url: `${url.TIN_CHI_VALIDATE_HOC_KY}/${maKy}`,
  }).then(res => {
    return res;
  });

export const getPhieuDangKyTinChi = (id: string) =>
  NetWorkService.Get({
    url: `${url.PHIEU_DANG_KY_TIN_CHI}/${id}`,
  }).then(res => {
    return res;
  });
