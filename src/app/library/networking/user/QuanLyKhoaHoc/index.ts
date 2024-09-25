/* eslint-disable @typescript-eslint/no-explicit-any */
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';
import url from '@networking/url';

export const dsLoaiHinhNCKH = (params: any) =>
  NetWorkService.Get({
    url: `${url.GET_LOAI_HINH_QLKH}`,
    params,
  }).then(res => {
    return res;
  });

export const getSanPhamNCKH = (params: any) =>
  NetWorkService.Get({
    url: `${url.GET_SAN_PHAM_LOAI_HINH_QLKH}`,
    params,
  }).then(res => {
    return res;
  });

export const getDanhMucNCKH = () =>
  NetWorkService.Get({
    url: `${url.GET_DANH_MUC_QLKH}`,
  }).then(res => {
    return res;
  });

export const getDanhMucQLQT = (id: string) =>
  NetWorkService.Get({
    url: `${url.GET_DANH_MUC_QLQT}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const getThongTinMacDinhDonHanhChinh = (
  idQuyTrinh: string,
  maDon: string,
) =>
  NetWorkService.Get({
    url: `${url.DEFAULTV_VALUE_FORM_DONG_QUY_TRINH}/${idQuyTrinh}/khai_bao/form/${maDon}`,
  }).then(res => {
    return res;
  });

export const delDonQuyTrinh = (idDon: string) =>
  NetWorkService.Delete(
    {
      url: `${url.EDIT_VALUE_FORM_DONG_QUY_TRINH}/${idDon}`,
    },
    {
      message: MESSAGE_CODE.XOA,
    },
  ).then((res: any) => {
    return res;
  });

export const getThongTinChinhSuaDonHanhChinh = (idDon: string) =>
  NetWorkService.Get({
    url: `${url.EDIT_VALUE_FORM_DONG_QUY_TRINH}/${idDon}/user`,
  }).then(res => {
    return res;
  });

export const khaiBaoNCKHV2 = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.KHAI_BAO_NCKH_V2}`,
      body,
    },

    { message: MESSAGE_CODE.KHAI_BAO },
  ).then(res => {
    return res;
  });

export const kiemTraTenQLKH = (params: any) =>
  NetWorkService.Get(
    {
      url: `${url.TEXT_QUERY_TEN_NCKH}`,
      params,
    },

    { message: MESSAGE_CODE.TEXT_QUERY_TEN_NCKH },
  ).then(res => {
    return res;
  });

export const yeuCauQuyDoiGio = (id: string, mode: string, body: any) =>
  NetWorkService.Post({
    url: `${url.QUY_DOI_GIO_DIEM}/${id}?mode=${mode}`,
    body,
  }).then(res => {
    return res;
  });

export const updateKhaiBao = (id: string, body: any) =>
  NetWorkService.Put(
    {
      url: `${url.UPDATE_KHAI_BAO}/${id}/update/user`,
      body,
    },
    { message: MESSAGE_CODE.LUU },
  ).then(res => {
    return res;
  });

export const delKhaiBao = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.DEL_KHAI_BAO}/${id}/delete/user`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then(res => {
    return res;
  });

export const thongKeNCKH = (idNamHoc: string, ssoId: string) =>
  NetWorkService.Get({
    url: `${url.THONG_KE_NCKH}/${idNamHoc}/loai-hinh/general`,
    params: { ssoId },
  }).then(res => {
    return res;
  });

export const thongKeGioDiemNCKH = (
  idNamHoc: string,
  ssoId: string,
  params: { mode: string },
) =>
  NetWorkService.Get({
    url: `${url.THONG_KE_NCKH}/${idNamHoc}/quy-doi-gio-nckh/nhan-su/${ssoId}`,
    params,
  }).then(res => {
    return res;
  });
