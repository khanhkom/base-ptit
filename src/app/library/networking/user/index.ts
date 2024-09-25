/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout } from 'react-native-app-auth';
import OneSignal from 'react-native-onesignal';

import { CONFIG_SSO, showToastError } from '@common';
import { REDIREC_URL, SSO_URL, SUB_NAME, WORD_PRESS_NEWS_URL } from '@env';
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { onPushLogout } from '@networking/helper';
import { NetWorkService } from '@networking/service';
import url from '@networking/url';
import { translate } from '@utils/i18n/translate';
import { KEY_STORAGE, load } from '@utils/storage';

import { Buffer } from 'buffer';

export const notiToTele = (
  tokenTele: string,
  body: { chat_id: string; text: string },
) =>
  NetWorkService.Post({
    url: `https://api.telegram.org/bot${tokenTele}/sendMessage`,
    body,
    baseURL: '',
  }).then(res => {
    return res;
  });

export const xacNhanLichTuan = (id: string, body: any) =>
  NetWorkService.Put({
    url: `${url.XAC_NHAN_LICH_TUAN}/${id}/trang-thai-tham-gia`,
    params: body,
  }).then(res => {
    return res;
  });

export const lichTuanV2 = (from: string | number, to: string | number) =>
  NetWorkService.Get({
    url: `${url.LICH_TUAN_V2}/from/${from}/to/${to}`,
  }).then(res => {
    return res;
  });

export const dsNganHang = () =>
  NetWorkService.Get({
    url: '',
    baseURL: `${url.VIET_QR_BANK}`,
  }).then(res => {
    return res;
  });

export const taoTBLopHC = (idLop: string, body: any) =>
  NetWorkService.Post({
    url: `${url.LOP_HANH_CHINH}/${idLop}/can-bo/notification`,
    body: body,
  }).then(res => {
    return res;
  });

export const taoTBLopTC = (idLop: string, body: any) =>
  NetWorkService.Post({
    url: `${url.LOP_TIN_CHI}/${idLop}/giang-vien/notification`,
    body: body,
  }).then(res => {
    return res;
  });

export const updateNoiDungCB = (id: string, body: any) =>
  NetWorkService.Put(
    {
      url: `${url.ODOO_BUOI_HOC}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then(res => {
    return res;
  });

export const khoiTaoBuoiHoc = (id: string) =>
  NetWorkService.Post({
    url: `${url.ODOO_BUOI_HOC}/${id}/giang-vien/diem-danh/khoi-tao`,
  }).then(res => {
    return res;
  });

export const getChiTietDSDiemDanh = (id: string) =>
  NetWorkService.Get({
    url: `${url.ODOO_BUOI_HOC}/${id}/diem-danh/nguoi-hoc/many`,
  }).then((res: any) => {
    return res?.data?.data;
  });

export const diemDanhNguoiDay = (
  id: string,
  body: {
    hoTenUser: string;
    idUser: string;
    maUser: string;
    trangThai: string | string[] | undefined;
  },
) =>
  NetWorkService.Post(
    {
      url: `${url.ODOO_BUOI_HOC}/${id}/diem-danh/nguoi-day`,
      body,
    },
    {
      message: MESSAGE_CODE.DIEM_DANH_SINH_VIEN,
    },
  ).then(res => {
    return res;
  });

export const ketThucDiemDanh = (id: string) =>
  NetWorkService.Post(
    {
      url: `${url.ODOO_BUOI_HOC}/${id}/diem-danh/ket-thuc`,
    },
    {
      message: MESSAGE_CODE.KET_THUC_DIEM_DANH,
    },
  ).then(res => {
    return res;
  });

export const checkAllDiemDanh = (id: string) =>
  NetWorkService.Post(
    {
      url: `${url.ODOO_BUOI_HOC}/${id}/diem-danh/co-mat/all`,
    },
    {
      message: MESSAGE_CODE.DIEM_DANH_SINH_VIEN,
    },
  ).then(res => {
    return res;
  });

export const getListSVByLopHanhChinh = (idLop: string) =>
  NetWorkService.Get({
    url: `${url.GET_LOP_HC_SINH_VIEN_BY_ID}/${idLop}/nhan-su`,
  }).then(res => {
    return res;
  });

export const apiGetThongBaoGuiTC = (body: any, id: string) =>
  NetWorkService.Get({
    url: `${url.LOP_TIN_CHI}/${id}/giang-vien/notification/pageable`,
    params: body,
  }).then(res => {
    return res;
  });

export const lichSinhNhat = (month: string) =>
  NetWorkService.Get({
    url: `${url.LICH_SINH_NHAT}/${month}`,
  }).then(res => {
    return res;
  });

export const apiGetThongBaoGui = (body: any, idLop: string) =>
  NetWorkService.Get({
    url: `${url.LOP_HANH_CHINH}/${idLop}/can-bo/notification/pageable`,
    params: body,
  }).then(res => {
    return res;
  });

export const getThongbaoLHC = (idLop: string, body: any) =>
  NetWorkService.Get({
    url: `${url.LOP_HANH_CHINH_V2}/${idLop}/notification/page`,
    params: body,
  }).then(res => {
    return res;
  });

export const getDSMonGiaLap = () =>
  NetWorkService.Get({
    url: `${url.GET_DS_MON_GIA_LAP}`,
  }).then(res => {
    return res;
  });

export const postTaoMoiSuKien = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.TAO_MOI_SU_KIEN}`,
      body: body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then(res => {
    return res;
  });

export const putSuKien = (id: string, body: any) =>
  NetWorkService.Put(
    {
      url: `${url.TAO_MOI_SU_KIEN}/${id}`,
      body: body,
    },
    { message: MESSAGE_CODE.LUU },
  ).then(res => {
    return res;
  });

export const deleteSuKien = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.TAO_MOI_SU_KIEN}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then(res => {
    return res;
  });

export const loginTouchID = (body: any) =>
  NetWorkService.Post({
    url: `${url.LOGIN_TOUCH_ID}`,
    body: body,
  }).then(res => {
    return res;
  });

export const getUserMe = () =>
  NetWorkService.Get({
    url: `${url.GET_INFO_ME}`,
  }).then(res => {
    return res;
  });

export const registerTouchID = (body: any) =>
  NetWorkService.Post({
    url: `${url.REGISTER_TOUCH_ID}`,
    body: body,
  }).then(res => {
    return res;
  });

export const logOutApp = () =>
  NetWorkService.Post({
    url: `${url.LOG_OUT}`,
  }).then(res => {
    return res;
  });

export const khoiTaoTracNghiem = (idBieuMau: string, body: any) =>
  NetWorkService.Post({
    url: `${url.KHOI_TAO_TRAC_NGHIEM}/${idBieuMau}`,
    body: body,
  }).then(res => {
    return res;
  });

export const guiCauTraLoiBieuMau = (body: any) =>
  NetWorkService.Post({
    url: `${url.BIEU_MAU}`,
    body: body,
  }).then(res => {
    return res;
  });

export const postKhaiBaoYTe = (body: any) =>
  NetWorkService.Post({
    url: `${url.POST_KHAI_BAO_Y_TE}`,
    body: body,
  }).then(res => {
    return res;
  });

export const luuTracNghiem = (body: any) =>
  NetWorkService.Post({
    url: `${url.LUU_TRAC_NGHIEM}`,
    body: body,
  }).then(res => {
    return res;
  });

export const getDSDot = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_DS_DOT_KHAO_SAT}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getListDone = () =>
  NetWorkService.Get({
    url: `${url.LIST_KHAO_SAT_DONE}`,
  }).then(res => {
    return res;
  });

export const getKhaoSat = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_KHAO_SAT}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getKetQuaKhaoSat = (idDot: string) =>
  NetWorkService.Get({
    url: `${url.GET_KET_QUA_KHAO_SAT}/${idDot}/my`,
  }).then(res => {
    return res;
  });

export const getKetQuaKhaoSatCB = (idBieuMau: string, idDot: string) =>
  NetWorkService.Get({
    url: `${url.GET_KET_QUA_KHAO_SAT_CB}/${idBieuMau}/dot/${idDot}`,
  }).then(res => {
    return res;
  });

export const getNhomLopTinChi = (id: string) =>
  NetWorkService.Get({
    url: `${url.DS_NHOM_LOP_TC}/${id}`,
  }).then(res => {
    return res;
  });

export const getChiTietNhomLopTinChi = (id: string) =>
  NetWorkService.Get({
    url: `${url.NHOM_LOP_TC}/${id}/user/danh-sach-sv`,
  }).then(res => {
    return res;
  });

export const submitBieuMauKhaoSat = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.SUBMIT_DANH_GIA_GV}`,
      body: body,
    },
    { message: MESSAGE_CODE.GUI },
  ).then(res => {
    return res;
  });

export const guiThacMacDiem = (body: any) =>
  NetWorkService.Post({
    url: `${url.GUI_THAC_MAC_DIEM}`,
    body: body,
  }).then(res => {
    return res;
  });

export const apiGetAllGPA = () =>
  NetWorkService.Get({
    url: `${url.SV_GET_DIEM_CAC_KY}`,
  }).then(res => {
    return res;
  });

export const getAccessDanhGiaGV = (idDot: string, idLop: string) =>
  NetWorkService.Get({
    url: `${url.GET_ACCESS_DANH_GIA_GV}/${idDot}/lop-tin-chi/${idLop}`,
  }).then(res => {
    return res;
  });

export const apiGetCPAHienTai = () =>
  NetWorkService.Get({
    url: `${url.SV_GET_KQHT_GENERAL}`,
  }).then(res => {
    return res;
  });

export const getDanhSachThongKeThaoTac = (idDon: any) =>
  NetWorkService.Get({
    url: `${url.TRANG_THAI_DON}/${idDon}/buoc`,
  }).then(res => {
    return res;
  });

export const svXoaDon = (idDon: string) =>
  NetWorkService.Delete({
    url: `${url.SV_XOA_DON}/${idDon}`,
  }).then(res => {
    return res;
  });

export const huyMuonXe = (idDon: string, body: any) =>
  NetWorkService.Put({
    url: `${url.THONG_TIN_MUON_XE}/${idDon}/me-huy-muon-xe`,
    body: body,
  }).then(res => {
    return res;
  });

export const getAmountUnreadNoti = () =>
  NetWorkService.Get({
    url: `${url.GET_AMOUNT_UNREAD_NOTI}`,
  }).then(res => {
    return res;
  });

export const getTinhTP = () =>
  NetWorkService.Get({
    url: `${url.GET_TP}`,
  }).then(res => {
    return res;
  });

export const getQuanHuyen = (idTP: string) =>
  NetWorkService.Get({
    url: `${url.GET_QUAN_HUYEN}/${idTP}`,
  }).then(res => {
    return res;
  });

export const getPhuongXa = (idQH: string) =>
  NetWorkService.Get({
    url: `${url.GET_PHUONG_XA}/${idQH}`,
  }).then(res => {
    return res;
  });

export const loginSlinkID = (body: {
  accessToken: string;
  clientPlatform: string;
  oneSignalId: string | undefined;
  deviceId: string;
}) =>
  NetWorkService.Post({
    url: url.DANG_NHAP_SLINK_ID,
    body: body,
  }).then(res => {
    return res;
  });

export const guiPhanHoi = (body: any) =>
  NetWorkService.Post(
    {
      url: url.THEMPHANHOI,
      body: body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then(res => {
    return res;
  });

export const getKyHocSinhVien = (body?: any) =>
  NetWorkService.Get({
    url: url.KY_HOC_SINH_VIEN,
    params: body,
  }).then(res => {
    return res;
  });

export const getQuocGia = () =>
  NetWorkService.Get({
    url: url.GET_QUOC_GIA,
  }).then(res => {
    return res;
  });

export const getKyHocGiangVien = (body: {
  idHinhThuc?: string | number;
  hasCourse?: boolean;
}) =>
  NetWorkService.Get({
    url: url.KY_HOC_GIANG_VIEN,
    params: body,
  }).then(res => {
    return res;
  });

export const svGetLopHC = (body: any) =>
  NetWorkService.Get({
    url: url.GET_LOP_HC_SINH_VIEN,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getListSVLopHC = (id: string) =>
  NetWorkService.Get({
    url: `${url.GET_LIST_SINH_VIEN}/${id}/sinh-vien`,
  }).then(res => {
    return res;
  });

export const getAllLopHC = (body?: any) =>
  NetWorkService.Get({
    url: url.GET_LOP_HC,
    params: body ?? {},
  }).then(res => {
    return res;
  });

export const gvGetDiemLopHC = (idLop: string) =>
  NetWorkService.Get({
    url: `${url.LOP_HC}/${idLop}/can-bo/sv`,
  }).then(res => {
    return res;
  });

export const getSuKienCaNhan = (body = {}, from: string, to: string) =>
  NetWorkService.Get({
    url: `${url.SU_KIEN_USER}/from/${from}/to/${to}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getSuKienInComming = (day: number) =>
  NetWorkService.Get({
    url: `${url.SU_KIEN_USER}/incomming/day/${day}`,
  }).then(res => {
    return res;
  });

export const getCoCauToChuc = (body = {}) =>
  NetWorkService.Get({
    url: `${url.CO_CAU_TO_CHUC}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getAllTinTuc = (body = {}) =>
  NetWorkService.Get({
    url: `${url.TATCATINTUC}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getTinTucNoiBat = (body = {}) =>
  NetWorkService.Get({
    url: `${url.GET_TIN_NOI_BAT}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getLoaiTinTuc = (body = {}) =>
  NetWorkService.Get({
    url: `${url.LOAI_TIN_TUC}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getCommonTopic = (body = {}) =>
  NetWorkService.Get({
    url: `${url.COMMON_TOPIC}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getCauHoiThuongGap = () =>
  NetWorkService.Get({
    url: `${url.CAU_HOI_THUONG_GAP}`,
  }).then(res => {
    return res;
  });

export const getTinTucByPage = (body = {}) =>
  NetWorkService.Get({
    url: `${url.TINTHEOLOAI}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getGiangVienProfile = (body = {}) =>
  NetWorkService.Get({
    url: `${url.GV_PROFILE}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getStudentProfile = (body = {}) =>
  NetWorkService.Get({
    url: `${url.STUDENT_PROFILE}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getMyProfile = (body = {}) =>
  NetWorkService.Get({
    url: `${url.MY_PROFILE}`,
    params: body,
  }).then(res => {
    return res;
  });

export const updateUserInfo = (body = {}) =>
  NetWorkService.Put({
    url: `${url.MY_PROFILE}`,
    body: body,
  }).then(res => {
    return res;
  });

export const getThongBaoLopHCSinhVien = (idLop: string, body: any) =>
  NetWorkService.Get({
    url: `${url.LOP_HANH_CHINH}/${idLop}/sinh-vien/notification/pageable`,
    params: body,
  }).then(res => {
    return res;
  });

export const getThongBaoLopTCSinhVien = (idLop: string, body: any) =>
  NetWorkService.Get({
    url: `${url.LOP_TIN_CHI}/${idLop}/sinh-vien/notification/pageable`,
    params: body,
  }).then(res => {
    return res;
  });

export const getDanhSachLoaiDon = (body: any) =>
  NetWorkService.Get({
    url: `${url.DICH_VU_MOT_CUA_V2}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getLich = (body: any) =>
  NetWorkService.Get({
    url: `${url.LICH}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getLichSV = (body: any, year: string | number) =>
  NetWorkService.Get({
    url: `${url.LICH_SV}/${year}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getLichGV = (body: any, year: string | number) =>
  NetWorkService.Get({
    url: `${url.LICH_GV}/${year}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getLichTest = () =>
  NetWorkService.Get({
    url: `${url.LICH_SV_TEST}`,
  }).then(res => {
    return res;
  });

export const getLichKhaoThiSVFromTo = (from: string, to: string) =>
  NetWorkService.Get({
    url: `${url.LICH_KHAO_THI_SV_FROM_TO}/${from}/to/${to}`,
  }).then(res => {
    return res;
  });

export const getLichSVFromTo = (from: string, to: string) =>
  NetWorkService.Get({
    url: `${url.LICH_SV_FROM_TO}/${from}/to/${to}`,
  }).then(res => {
    return res;
  });

export const getLichKhaoThiNVFromTo = (from?: string, to?: string) =>
  NetWorkService.Get({
    url: `${url.LICH_KHAO_THI_NV_FROM_TO}/${from}/to/${to}`,
  }).then(res => {
    return res;
  });

export const getLichNVFromTo = (from?: string, to?: string) =>
  NetWorkService.Get({
    url: `${url.LICH_NV_FROM_TO}/${from}/to/${to}`,
  }).then(res => {
    return res;
  });

export const getLichSuKien = (body: any, from: string, to: string) =>
  NetWorkService.Get({
    url: `${url.LICH_SU_KIEN}/${from}/to/${to}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getLichTuanMe = (from: string, to: string, body?: any) =>
  NetWorkService.Get({
    url: `${url.LICH_TUAN_ME}/${from}/toDate/${to}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getGhiChuLichTuan = (week: number, year: number) =>
  NetWorkService.Get({
    url: `${url.GHI_CHU_LICH_TUAN}/${week}/${year}`,
  }).then(res => {
    return res;
  });

export const getLopTinChiSVTheoKyHoc = (body: any) =>
  NetWorkService.Get({
    url: `${url.LOP_TC_SINH_VIEN}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getLopTinChiGVTheoKyHoc = (body: any) =>
  NetWorkService.Get({
    url: `${url.LOP_TC_GIANG_VIEN}`,
    params: body,
  }).then(res => {
    return res;
  });

export const deleteLopDay = (maLop: string) =>
  NetWorkService.Put({
    url: `${url.DEL_LOP_DAY}${maLop}`,
  }).then(res => {
    return res;
  });

export const getAllHeDaoTaoLopTC = () =>
  NetWorkService.Get({
    url: `${url.GET_HE_DAO_TAO_LOP_TC}`,
  }).then(res => {
    return res;
  });

export const getNamHocTheoHDT = () =>
  NetWorkService.Get({
    url: `${url.GET_NAM_HOC_LOP_TC}`,
  }).then(res => {
    return res;
  });

export const capNhatGioiThieuChung = (id: string, gioiThieuChung: string) =>
  NetWorkService.Put(
    {
      url: `${url.CAP_NHAP_GIOI_THIEU}/${id}/update`,
      body: { gioiThieuChung },
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then(res => {
    return res;
  });

export const khoiTaoThoiKhoaBieu = (id: string) =>
  NetWorkService.Post(
    {
      url: `${url.KHOI_TAO_TKB}/${id}/nhan-su/khoi-tao`,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then(res => {
    return res;
  });

export const getDotDanhGia = (idKyHoc: string) =>
  NetWorkService.Get({
    url: `${url.GET_DOT_DANH_GIA}/${idKyHoc}`,
  }).then(res => {
    return res;
  });

export const getLopTCByIdGV = (id: string) =>
  NetWorkService.Get({
    url: `${url.LOP_TIN_CHI_ID}/${id}/nhan-su`,
  }).then(res => {
    return res;
  });

export const getLopTCByIdSV = (id: string) =>
  NetWorkService.Get({
    url: `${url.LOP_TIN_CHI_ID}/${id}/sinh-vien`,
  }).then(res => {
    return res;
  });

export const getListNhanSu = (body?: any) =>
  NetWorkService.Get({
    url: `${url.LIST_NHAN_SU}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const dangKyDayBu = (body?: any) =>
  NetWorkService.Post(
    {
      url: `${url.DANG_KY_DAY_BU}`,
      body,
    },
    { message: MESSAGE_CODE.DANG_KY },
  ).then((res: any) => {
    return res;
  });

export const getListSVGVByLopTinChi = (idLop: string) =>
  NetWorkService.Get({
    url: `${url.LOP_TIN_CHI}/${idLop}/sinh-vien/gv-sv`,
  }).then(res => {
    return res;
  });

export const getListSVByLopTinChi = (idLop: string) =>
  NetWorkService.Get({
    url: `${url.LOP_TIN_CHI}/${idLop}/giang-vien/sv`,
  }).then(res => {
    return res;
  });

export const getDanhSachBuoiHocGV = (ten: string) =>
  NetWorkService.Get({
    url: `${url.LOP_TIN_CHI_ID}/${ten}/nhan-su/thoi-khoa-bieu`,
  }).then(res => {
    return res;
  });

export const getDotKhaoSatTietHoc = (maHocKy: string) =>
  NetWorkService.Get({
    url: `${url.KY_HOC}/${maHocKy}/dot-khao-sat-tiet-hoc`,
  }).then(res => {
    return res;
  });

export const getKetQuaDotKhaoSatTietHoc = (maTietHoc: string) =>
  NetWorkService.Get({
    url: `${url.LOP_TIN_CHI_ID}/tkb/${maTietHoc}/sinh-vien/danh-gia`,
  }).then(res => {
    return res;
  });

export const postKetQuaKhaoSatTietHoc = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.LOP_TIN_CHI_ID}/tkb/sinh-vien/danh-gia`,
      body: body,
    },
    { message: MESSAGE_CODE.GUI },
  ).then(res => {
    return res;
  });

export const getLichSuDangKyDayBu = (body: any) =>
  NetWorkService.Get({
    url: `${url.LICH_SU_DAY_BU}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getDanhSachBuoiHocSV = (ten: string) =>
  NetWorkService.Get({
    url: `${url.LOP_TIN_CHI_ID}/${ten}/sinh-vien/thoi-khoa-bieu`,
  }).then(res => {
    return res;
  });

export const gvGetDiemSVLopTC = (idLop: string) =>
  NetWorkService.Get({
    url: `${url.GV_GET_DIEM_SV_LOP_TC}/${idLop}/sinh-vien/tong-hop/many`,
  }).then(res => {
    return res;
  });

export const getDiemMotMonCuThe = (idLop: string) =>
  NetWorkService.Get({
    url: `${url.GET_DIEM_MOT_MON_HOC_CU_THE}/${idLop}`,
  }).then((res: any) => {
    return res;
  });

export const getHinhThucDanhGia = () =>
  NetWorkService.Get({
    url: `${url.HINH_THUC_DANH_GIA}`,
  }).then((res: any) => {
    return res;
  });

export const getHinhThucDanhGiaPage = (body: any) =>
  NetWorkService.Get({
    url: `${url.HINH_THUC_DANH_GIA_PAGE}`,
    params: body,
  }).then(res => {
    return res;
  });

export const apiGetLichSuDon = (body: any) =>
  NetWorkService.Get({
    url: `${url.LICH_SU_GUI_DON}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getInvoiceInfo = (identityCode: string) =>
  NetWorkService.Get({
    url: `${url.INVOICE_INFO}/${identityCode}`,
  }).then(res => {
    return res;
  });

export const getThanhToanDVMC = (identityCode: string) =>
  NetWorkService.Get({
    url: `${url.THANH_TOAN_DVMC}/${identityCode}`,
  }).then(res => {
    return res;
  });

export const getDonById = (id: string) =>
  NetWorkService.Get({
    url: `${url.DON_DICH_VU_MOT_CUA}/${id}`,
  }).then(res => {
    return res;
  });

export const getHistoryThuVien = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_HISTORY_THU_VIEN}`,
    params: body,
  }).then(res => {
    return res;
  });

export const checkInThuVien = (body: any) =>
  NetWorkService.Post({
    url: `${url.CHECK_IN_THU_VIEN}`,
    body: body,
  }).then(res => {
    return res;
  });

export const getMyYear = () =>
  NetWorkService.Get({ url: `${url.GET_MY_YEAR}` }).then(res => {
    return res;
  });

export const getMyCredit = (body: any) =>
  NetWorkService.Get({ url: `${url.GET_MY_CREDIT}`, params: body }).then(
    res => {
      return res;
    },
  );

export const getMyCourse = () =>
  NetWorkService.Get({ url: `${url.GET_MY_COURSE}` }).then(res => {
    return res;
  });

export const getDanToc = () =>
  NetWorkService.Get({ url: `${url.GET_DAN_TOC}` }).then(res => {
    return res;
  });

export const getTonGiao = () =>
  NetWorkService.Get({ url: `${url.GET_TON_GIAO}` }).then(res => {
    return res;
  });

export const getPhanHoi = (body: { page: number; limit: number }) =>
  NetWorkService.Get({
    url: `${url.GET_PHAN_HOI}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getLinhVucPhanHoi = () =>
  NetWorkService.Get({
    url: `${url.LINH_VUC_PHAN_HOI}`,
  }).then((res: any) => {
    return res;
  });

export const getHocLieuSo = (id: string) =>
  NetWorkService.Get({
    url: `${url.HOC_LIEU_SO}/${id}`,
  }).then(res => {
    return res;
  });

export const getDeCuongHocLieuSo = (body: any) =>
  NetWorkService.Get({
    url: `${url.DE_CUONG_HOC_LIEU}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getDeCuongHocPhan = (id: string) =>
  NetWorkService.Get({
    url: `${url.DE_CUONG_HOC_PHAN}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const getTienTrinhHocPhan = (body: any) =>
  NetWorkService.Get({
    url: `${url.TIEN_TRINH_HOC_PHAN}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getNoiDungHocPhan = (body: any) =>
  NetWorkService.Get({
    url: `${url.NOI_DUNG_HOC_PHAN}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getDeCuongGV = (body: any) =>
  NetWorkService.Get({
    url: `${url.DE_CUONG_GV}`,
    params: body,
  }).then(res => {
    return res;
  });

export const postReadAllNotification = () =>
  NetWorkService.Post(
    {
      url: `${url.READ_ONE_NOTIFICATION}`,
      body: { type: 'ALL' },
    },
    { message: MESSAGE_CODE.READ_ALL_NOTIFY },
  ).then(res => {
    return res;
  });

export const postReadOneNotification = (body: { notificationId: string }) =>
  NetWorkService.Post({
    url: `${url.READ_ONE_NOTIFICATION}`,
    body: { type: 'ONE', ...body },
  }).then(res => {
    return res;
  });

export const getBieuMauDanhGiaGV = (id: string) =>
  NetWorkService.Get({
    url: `${url.GET_BIEU_MAU_DANH_GIA}/${id}`,
  }).then(res => {
    return res;
  });

export const bieuMauKhaoSatTrucTuyen = (id: string) =>
  NetWorkService.Get({
    url: `${url.GET_BIEU_MAU_KHAO_SAT}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const dapAnKhaoSatTrucTuyen = (id: string) =>
  NetWorkService.Get({
    url: `${url.GET_CAU_TRA_LOI_KHAO_SAT}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const getKhaoSatById = (id: string) =>
  NetWorkService.Get({
    url: `${url.GET_KHAO_SAT_BY_ID}/${id}`,
  }).then(res => {
    return res;
  });

export const getNotiByPage = (body: any) =>
  NetWorkService.Get({
    url: `${url.GETTHONGBAO}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getChiTietThongBao = (id: string) =>
  NetWorkService.Get({
    url: `${url.NOTIFICATION}/${id}/me`,
  }).then(res => {
    return res;
  });

export const getThacMacDiem = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_CAU_TRA_LOI_THAC_MAC}`,
    params: body,
  }).then(res => {
    return res;
  });

export const gvGetLopHCById = (idLop: string) =>
  NetWorkService.Get({
    url: `${url.LOP_HANH_CHINH}/${idLop}`,
  }).then(res => {
    return res;
  });

export const getMyPhanQuyen = () =>
  NetWorkService.Get({
    url: `${url.GET_PHAN_QUYEN_ME}`,
  }).then(res => {
    return res;
  });

export const uploadTaiLieuSingle = (body: FormData) =>
  NetWorkService.PostFormData({
    url: `${url.UPLOAD_DOC_SINGLE}`,
    body: body,
  }).then(res => {
    return res;
  });

export const XoaKyTu = (str = '') => {
  const strResult = str.replace(
    /[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi,
    '',
  );

  return strResult;
};

export const getNganHangVietQR = () =>
  NetWorkService.Get({
    url: '',
    baseURL: `${url.GET_DS_NGAN_HANG_VIETQR}`,
  }).then(res => {
    return res;
  });

export const getSetting = (key: string) =>
  NetWorkService.Get({
    url: `${url.GET_SETTING_CONFIG}/${key}`,
  }).then(res => {
    return res;
  });

export const getAllNamHoc = () =>
  NetWorkService.Get({
    url: `${url.GET_ALL_NAM_HOC}`,
  }).then(res => {
    return res;
  });

export const getTKGioGiang = (idNam: number, body?: any) =>
  NetWorkService.Get({
    url: `${url.GET_TK_GIO_GIANG}/${idNam}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getChiTietTKGioGiang = (idNam: number, body?: any) =>
  NetWorkService.Get({
    url: `${url.CHI_TIET_TK_GIO_GIANG}/${idNam}`,
    params: body,
  }).then(res => {
    return res;
  });

export const updateInfoSinhVien = (id: string, body) =>
  NetWorkService.Put({
    url: `${url.SINH_VIEN_UPDATE}/${id}`,
    body,
  }).then(res => {
    return res;
  });

export const uploadDocument = async (listDocument: any) => {
  let listImage: any[] = [];
  try {
    const listResponseUpload = listDocument.map(async (item: any) => {
      if (!item?.type) {
        return item;
      }

      const formData = new FormData();

      formData.append('file', item);

      formData.append('public', String('1'));

      const responseUpload: any = await uploadTaiLieuSingle(formData);

      if (!responseUpload?.status) {
        showToastError(translate('slink:Da_co_loi_xay_ra'));

        listImage = [];

        return;
      }

      return responseUpload?.data?.data ?? '';
    });

    listImage = await Promise.all(listResponseUpload);
  } catch (error) {
    listImage = [];
  }

  return listImage;
};

export const getStatInvoice = (body: any) =>
  NetWorkService.Get({
    url: `${url.STAT_INVOICE_PAYMENT}`,
    params: body,
  }).then(res => {
    return res;
  });

export const getListInvoice = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_LIST_INVOICE}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getListBillItemV2 = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_LIST_BILL_ITEM_V2}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getListInvoiceV2 = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_LIST_INVOICE_V2}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getTransactionV2 = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_TRANSACTION}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getFromWallet = () =>
  NetWorkService.Get({
    url: `${url.GET_FROM_WALLET}`,
  }).then((res: any) => {
    return res;
  });

export const createTransaction = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.CREATE_TRANSACTION_ME}`,
      body,
    },
    { message: MESSAGE_CODE.THANH_TOAN },
  ).then((res: any) => {
    return res;
  });

export const apiGetDanhSachKyHoc = () =>
  NetWorkService.Get({
    url: `${url.GET_KY_HOC_MOT_CUA}`,
  }).then(res => {
    return res;
  });

export const khoiTaoOneSignal = (body: any) =>
  NetWorkService.Put({
    url: `${url.INIT_ONE_SIGNAL}`,
    body,
  }).then(res => {
    return res;
  });

export const delOnesignal = (body: any) =>
  NetWorkService.Delete({
    url: `${url.INIT_ONE_SIGNAL}`,
    body,
  }).then(res => {
    return res;
  });

export const sinhVienGetDiemMonHocTheoKy = (params?: {
  condition: {
    maKhoaNganh?: string;
  };
}) =>
  NetWorkService.Get({
    url: `${url.SV_GET_DIEM_MON_HOC_THEO_KY}`,
    params: params || {},
  }).then((res: any) => {
    return res;
  });

export const thongKeKetQuaHocTapTheoKy = (body: any, maKhoaNganh?: string) =>
  NetWorkService.Get({
    url: `${url.THONG_KE_KET_QUA_HOC_TAP}/${maKhoaNganh}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getChuongTrinhKhung = () =>
  NetWorkService.Get({
    url: `${url.TIEN_TRINH_KHUNG}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getSongNganh = () =>
  NetWorkService.Get({
    url: `${url.SONG_NGANH}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getDotDangKyMe = (idDot: string) =>
  NetWorkService.Get({
    url: `${url.DOT_DANG_KY_ME}/${idDot}`,
  }).then((res: any) => {
    return res;
  });

export const getKhoaNganh = () =>
  NetWorkService.Get({
    url: `${url.KHOA_NGANH_SV}`,
  }).then((res: any) => {
    return res;
  });

export const getTienTrinhThucTe = () =>
  NetWorkService.Get({
    url: `${url.TIEN_TRINH_THUC_TE}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getTienTrinhThucTeSN = (ma: string) =>
  NetWorkService.Get({
    url: `${url.TIEN_TRINH_THUC_TE_SN}/${ma}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getDsVanBan = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_DS_VB}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const thongTinChung = () =>
  NetWorkService.Get({
    url: `${url.GET_THONG_TIN_CHUNG}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getPermission = () =>
  NetWorkService.PostSSO({
    url: '',
    body: {
      audience: `${SUB_NAME}-auth`,
      grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      response_mode: 'permissions',
    },
    baseURL: `${SSO_URL}/protocol/openid-connect/token`,
  }).then((res: any) => {
    return res?.data;
  });

//TIN TỨC STRAPI
export const getDanhMucTinTuc = () =>
  NetWorkService.Get(
    {
      url: '',
      baseURL: 'http://222.252.29.85:10400/api/navigation/render/3',
    },
    { noAuth: true },
  ).then((res: any) => {
    return res?.data;
  });

export const listTinTucV2 = (body: any) =>
  NetWorkService.Get(
    {
      params: body,
      url: '',
      baseURL: WORD_PRESS_NEWS_URL,
    },
    {
      noAuth: true,
    },
  ).then((res: any) => {
    return res?.data;
  });

// Nhân sự
export const thongTinNhanSuMe = () =>
  NetWorkService.Get({
    url: `${url.THONG_TIN_NHAN_SU_ME}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getThongTinChinhSua = () =>
  NetWorkService.Get({
    url: `${url.CHINH_SUA_INFO}`,
  }).then((res: any) => {
    return res?.data;
  });

export const downloadHoSoNhanSu = (id: string) =>
  NetWorkService.Get({
    url: `${url.DOWNLOAD_HO_SO_NHAN_SU}/${id}`,
    responseType: 'arraybuffer',
  }).then((res: any) => {
    return {
      res,
      type: res?.headers?.['content-type'] ?? '',
      url: Buffer.from(res.data, 'binary').toString('base64'),
    };
  });

export const lichSuChinhSuaNhanSu = () =>
  NetWorkService.Get({
    url: `${url.LICH_SU_CHINH_SUA_NHAN_SU}`,
  }).then((res: any) => {
    return res?.data;
  });

export const qhgdBanThan = (body: any) =>
  NetWorkService.Get({
    url: `${url.QHGD_VE_BAN_THAN}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const uploadqhgdBanThan = (body: any) =>
  NetWorkService.Post({
    url: `${url.QHGD_VE_BAN_THAN}`,
    body,
  }).then((res: any) => {
    return res?.data;
  });

export const qhgdVoChong = (body: any) =>
  NetWorkService.Get({
    url: `${url.QHGD_VE_VO_CHONG}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const uploadqhgdVoChong = (body: any) =>
  NetWorkService.Post({
    url: `${url.QHGD_VE_VO_CHONG}/page`,
    body,
  }).then((res: any) => {
    return res?.data;
  });

export const getLichSuNhanSu = () =>
  NetWorkService.Get({
    url: `${url.LICH_SU_KHAI_BAO}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getViTriChucDanh = (body: any) =>
  NetWorkService.Get({
    url: `${url.VI_TRI_CHUC_DANH}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getViTriChucDanhQuyHoach = (body: any) =>
  NetWorkService.Get({
    url: `${url.VI_TRI_QUY_HOACH}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getHinhThucDaoTao = () =>
  NetWorkService.Get({
    url: `${url.HINH_THUC_DAO_TAO}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getListTinHoc = () =>
  NetWorkService.Get({
    url: `${url.TIN_HOC_LIST}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getDSTrinhDoLyLuan = () =>
  NetWorkService.Get({
    url: `${url.TRINH_DO_LY_LUAN_CHINH_TRI}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getDSTrinhDoQuanLyHC = () =>
  NetWorkService.Get({
    url: `${url.TRINH_DO_QUAN_LY_HANH_CHINH}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getDSTrinhDoQuanLyNN = () =>
  NetWorkService.Get({
    url: `${url.TRINH_DO_QUAN_LY_NHA_NUOC}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getDSNgoaiNgu = () =>
  NetWorkService.Get({
    url: `${url.NGOAI_NGU_LIST}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getDSKhungNLNgoaiNgu = (params?: any) =>
  NetWorkService.Get({
    url: `${url.KHUNG_NANG_LUC_NGOAI_NGU_LIST}`,
    ...(params && { params }),
  }).then((res: any) => {
    return res?.data;
  });

export const getDSChucDanh = () =>
  NetWorkService.Get({
    url: `${url.CHUC_DANH}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getHocHamMe = (body: any) =>
  NetWorkService.Get({
    url: `${url.HOC_HAM}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getTrinhDoLyLuanPage = (body: any) =>
  NetWorkService.Get({
    url: `${url.TRINH_DO_LY_LUAN}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getQuanLyHanhChinh = (body: any) =>
  NetWorkService.Get({
    url: `${url.QUAN_LY_HANH_CHINH}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getLichThi = (maHocKy: string) =>
  NetWorkService.Get({
    url: `${url.LICH_THI}/${maHocKy}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getPhieuDrlMe = (params: any) =>
  NetWorkService.Get({
    url: `${url.PHIEU_DRL_ME}`,
    params,
  }).then((res: any) => {
    return res?.data;
  });

export const getQuanLyNhaNuoc = (body: any) =>
  NetWorkService.Get({
    url: `${url.QUAN_LY_NHA_NUOC}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getNgoaiNgu = (body: any) =>
  NetWorkService.Get({
    url: `${url.NGOAI_NGU}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getTinHoc = (body: any) =>
  NetWorkService.Get({
    url: `${url.TIN_HOC}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getQuocPhong = (body: any) =>
  NetWorkService.Get({
    url: `${url.BOI_DUONG_QUOC_PHONG}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getTrinhDoDaoTao = (body: any) =>
  NetWorkService.Get({
    url: `${url.TRINH_DO_DAO_TAO}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getThongTinHopDong = (body: any) =>
  NetWorkService.Get({
    url: `${url.HOP_DONG_ME}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getDienBienLuong = (body: any) =>
  NetWorkService.Get({
    url: `${url.DIEN_BIEN_LUONG}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getDienBienPhuCap = (body: any) =>
  NetWorkService.Get({
    url: `${url.DIEN_BIEN_PHU_CAP}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getDienBienKhoan = (body: any) =>
  NetWorkService.Get({
    url: `${url.DIEN_BIEN_KHOAN}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getDienBienPhuCapTangThem = (body: any) =>
  NetWorkService.Get({
    url: `${url.DIEN_BIEN_PHU_CAP_TANG_THEM}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getQuaTrinhCongTac = (body: any) =>
  NetWorkService.Get({
    url: `${url.QUA_TRINH_CONG_TAC}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getKeKhaiTaiSan = (body: any) =>
  NetWorkService.Get({
    url: `${url.DS_DOT_KE_KHAI_TAI_SAN}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getListTaiSanVatTu = (body: any) =>
  NetWorkService.Get({
    url: `${url.DS_TAI_SAN_VAT_TU}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getListDotKiemKeTaiSan = (body: any) =>
  NetWorkService.Get({
    url: `${url.DS_DOT_KIEM_KE}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getListTaiSanKiemKe = (body: any) =>
  NetWorkService.Get({
    url: `${url.DS_TAI_SAN_KIEM_KE}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const putKiemKeTaiSan = (idDot: string, body: any) =>
  NetWorkService.Put({
    url: `${url.KIEM_KE_TAI_SAN}/${idDot}/kiem-ke/many`,
    body: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getListKiemKeTinhTrangSuDung = () =>
  NetWorkService.Get({
    url: `${url.DS_TINH_TRANG_SU_DUNG}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getListPhongKiemKeTaiSan = (body: any) =>
  NetWorkService.Get({
    url: `${url.DS_PHONG_KIEM_KE}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getChiTietTaiSanVatTu = (id: string) =>
  NetWorkService.Get({
    url: `${url.TAI_SAN_VAT_TU}/qr/${id}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getListLichSuDieuChuyenTaiSan = (body: any) =>
  NetWorkService.Get({
    url: `${url.LICH_SU_DIEU_CHUYEN_TAI_SAN}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getListLichSuSuDungTaiSan = (body: any) =>
  NetWorkService.Get({
    url: `${url.LICH_SU_SU_DUNG_TAI_SAN}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getListTinhTrangSuDung = () =>
  NetWorkService.Get({
    url: `${url.TINH_TRANG_SU_DUNG}`,
  }).then((res: any) => {
    return res?.data;
  });

export const getQuaTrinhCuDiCongTac = (body: any) =>
  NetWorkService.Get({
    url: `${url.QUA_TRINH_DUOC_CU_CONG_TAC}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getQuaTrinhCuDiDaoTao = (body: any) =>
  NetWorkService.Get({
    url: `${url.CU_DI_DAO_TAO_BOI_DUONG}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getQuaTrinhDaoTaoBoiDuong = (body: any) =>
  NetWorkService.Get({
    url: `${url.CU_DI_DTBD}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getQuaTrinhDaoTaoBoiDuongCaNhan = (body: any) =>
  NetWorkService.Get({
    url: `${url.CU_DI_DAO_TAO_BOI_DUONG_CA_NHAN}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const postQuaTrinhDaoTaoBoiDuongCaNhan = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.CU_DI_DAO_TAO_BOI_DUONG_CA_NHAN}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putQuaTrinhDaoTaoBoiDuongCaNhan = (body: any, id: any) =>
  NetWorkService.Put(
    {
      url: `${url.CU_DI_DAO_TAO_BOI_DUONG_CA_NHAN}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const deleteQuaTrinhDaoTaoBoiDuongCaNhan = (id: any) =>
  NetWorkService.Delete(
    {
      url: `${url.CU_DI_DAO_TAO_BOI_DUONG_CA_NHAN}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const getKhenThuongNhanSu = (body: any) =>
  NetWorkService.Get({
    url: `${url.KHEN_THUONG_NHAN_SU}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getKyLuatNhanSu = (body: any) =>
  NetWorkService.Get({
    url: `${url.KY_LUAT_NHAN_SU}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getSangKienNhanSu = (body: any) =>
  NetWorkService.Get({
    url: `${url.SANG_KIEN_NHAN_SU}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getDoiTuongChinhSach = (body: any) =>
  NetWorkService.Get({
    url: `${url.DOI_TUONG_CHINH_SACH}/page`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });

export const getThongKeQLKH = (ssoId: string, id: string, body?: any) =>
  NetWorkService.Get({
    url: `${url.THONG_KE_QLKH}/${ssoId}/dot-khai-bao/${id}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getGioQLKH = (year: number) =>
  NetWorkService.Get({
    url: `${url.GIO_NCKH}/${year}`,
    baseURL: 'https://apiftu.aisenote.com',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTYzNjFlMGEwMjVhNjc3YzczNmJhZGUiLCJqdGkiOiI2NGI1MGNlMDUyMmZjZTg4MjFlODhhODQiLCJpYXQiOjE2ODk1ODY5MTIsImV4cCI6MTY5MDg4MjkxMn0.yRSQS_WLw-hOQjtMFIOF_bVftvmiE3ia4N5Z_67dy7g',
    },
  }).then((res: any) => {
    return res;
  });

export const getDSKHCN = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_DANH_SACH_KHCN}`,
    params: body,
    baseURL: 'https://dhs.aisenote.com/odoo-user-service',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsic2VydmljZSI6Ik9kb28iLCJ1bml2ZXJzaXR5U3NvIjp0cnVlLCJ1aWQiOjI0NDM2LCJwYXJ0bmVyX2lkIjpbMzQ1MiwiTmfDtCBRdeG7kWMgRMWpbmciXSwidmFpX3RybyI6Im5oYW5fdmllbiIsImhvX3RlbiI6Ik5nw7QgUXXhu5FjIETFqW5nIiwibWFfZGluaF9kYW5oIjoiS0NOMTAwMjU2IiwiZ2lvaV90aW5oIjoiMCIsIm5nYXlfc2luaCI6IjE5ODMtMDgtMDUiLCJwbGF0Zm9ybSI6IldlYiIsImRldmljZUlkIjoiZGV2aWNlSWQiLCJlbXBsb3llZV9wcm9maWxlIjp7ImlkIjozNDQ2LCJtYV9kaW5oX2RhbmgiOiJLQ04xMDAyNTYiLCJkb25fdmlfaWQiOls2OSwiS0NOMSJdLCJ0ZW5fZG9uX3ZpIjoiS2hvYSBDw7RuZyBuZ2jhu4cgdGjDtG5nIHRpbiAxIiwiY2h1Y19kYW5oIjoiVHLGsOG7n25nIGLhu5kgbcO0biIsInZhaV90cm8iOiJuaGFuX3ZpZW4ifX0sImp0aSI6ImEzNWEzNTRhLWVmODAtNGNkZS04MDc0LWJiMTMzMDFlMzdhMSIsImlhdCI6MTY5MDM1OTE0MiwiZXhwIjoxNjkyOTUxMTQyfQ.99iO-lC09NMlfJ7BFAmN1h4VUPyzNXhPLD-h1pz2vwA',
    },
  }).then((res: any) => {
    return res;
  });

export const getHDNCS = (body: any) =>
  NetWorkService.Get({
    url: `${url.GET_HD_NCH_HVCH}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const postLyLich = (body: any) =>
  NetWorkService.Post({
    url: `${url.LY_LICH_NS}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const dangKyKHCN = (body: any) =>
  NetWorkService.Post({
    url: `${url.DANG_KY_KHCN}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const xoaKhaiBaoNCKH = (id: string) =>
  NetWorkService.Delete({
    url: `${url.KHAI_BAO_NCKH}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const khaiBaoNCKH = (body: any) =>
  NetWorkService.Post({
    url: `${url.KHAI_BAO_NCKH}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const editKhaiBaoNCKH = (body: any, id: string) =>
  NetWorkService.Put({
    url: `${url.EDIT_NCKH}/${id}/cb-gv`,
    body,
  }).then((res: any) => {
    return res;
  });

export const getDotKhaiBao = () =>
  NetWorkService.Get({
    url: `${url.DOT_KHAI_BAO}`,
  }).then((res: any) => {
    return res;
  });

export const getDSCanBo = (body: any) =>
  NetWorkService.Get({
    url: `${url.DANH_SACH_CAN_BO}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getDSSinhVien = (body: any) =>
  NetWorkService.Get({
    url: `${url.DANH_SACH_SINH_VIEN}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getLyLichMe = (body?: any) =>
  NetWorkService.Get({
    url: `${url.LY_LICH_ME}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const getCongTrinhCuaToi = (body: any) =>
  NetWorkService.Get({
    url: `${url.LY_LICH_CONG_TRINH_CUA_TOI}`,
    params: body,
    baseURL: 'https://apiftu.aisenote.com',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTYzNjFlMGEwMjVhNjc3YzczNmJhZGUiLCJqdGkiOiI2NGMzMWZkOTUyMmZjZTg4MjFlODk1NzUiLCJpYXQiOjE2OTA1MDkyNzMsImV4cCI6MTY5MTgwNTI3M30.Mqh3GK-r3ukbThWTgeAJQs5lNLLh2XXxHdtFWd95GTM',
    },
  }).then((res: any) => {
    return res;
  });

export const getNghienCuuKhoaHoc = (body: any) =>
  NetWorkService.Get({
    url: `${url.NGHIEN_CUU_KHOA_HOC}`,
    params: body,
    baseURL: 'https://apiftu.aisenote.com',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTYzNjFlMGEwMjVhNjc3YzczNmJhZGUiLCJqdGkiOiI2NGMzMWZkOTUyMmZjZTg4MjFlODk1NzUiLCJpYXQiOjE2OTA1MDkyNzMsImV4cCI6MTY5MTgwNTI3M30.Mqh3GK-r3ukbThWTgeAJQs5lNLLh2XXxHdtFWd95GTM',
    },
  }).then((res: any) => {
    return res;
  });

export const getGiaiThuong = (body?: any) =>
  NetWorkService.Get({
    url: `${url.GIAI_THUONG}`,
    params: body,
    baseURL: 'https://apiftu.aisenote.com',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTYzNjFlMGEwMjVhNjc3YzczNmJhZGUiLCJqdGkiOiI2NGMzMWZkOTUyMmZjZTg4MjFlODk1NzUiLCJpYXQiOjE2OTA1MDkyNzMsImV4cCI6MTY5MTgwNTI3M30.Mqh3GK-r3ukbThWTgeAJQs5lNLLh2XXxHdtFWd95GTM',
    },
  }).then((res: any) => {
    return res;
  });

export const getCongTrinhMe = (body?: any) =>
  NetWorkService.Get({
    url: '/quan-ly-khoa-hoc/ly-lich/me',
    params: body,
    baseURL: 'https://apiftu.aisenote.com',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTYzNjFlMGEwMjVhNjc3YzczNmJhZGUiLCJqdGkiOiI2NGMzMWZkOTUyMmZjZTg4MjFlODk1NzUiLCJpYXQiOjE2OTA1MDkyNzMsImV4cCI6MTY5MTgwNTI3M30.Mqh3GK-r3ukbThWTgeAJQs5lNLLh2XXxHdtFWd95GTM',
    },
  }).then((res: any) => {
    return res;
  });

export const chinhSuaLyLich = (body: any, id: string) =>
  NetWorkService.Put({
    url: `${url.PUT_KHOA_HOC}/${id}/me`,
    body: body,
  }).then((res: any) => {
    return res;
  });

export const chinhSuaDeTai = (body: any, id: string) =>
  NetWorkService.Put({
    url: `${url.CHINH_SUA_DE_TAI}/${id}`,
    body: body,
  }).then((res: any) => {
    return res;
  });

export const checkDeTaiTrung = (body: any) =>
  NetWorkService.Get({
    url: `${url.ELASTIC_SEARCH_KHAI_BAO}`,
    params: body,
  }).then((res: any) => {
    return res;
  });

export const hinhThucTuyenDung = () =>
  NetWorkService.Get({
    url: `${url.HINH_THUC_TUYEN_DUNG}`,
  }).then((res: any) => {
    return res;
  });

export const getTinhTrangHonNhan = () =>
  NetWorkService.Get({
    url: `${url.TINH_TRANG_HON_NHAN}`,
  }).then((res: any) => {
    return res;
  });

export const dotTuyenDung = () =>
  NetWorkService.Get({
    url: `${url.DOT_TUYEN_DUNG}`,
  }).then((res: any) => {
    return res;
  });

export const ngachLuong = () =>
  NetWorkService.Get({
    url: `${url.NGACH_LUONG}`,
  }).then((res: any) => {
    return res;
  });

export const donViNhanSu = () =>
  NetWorkService.Get({
    url: `${url.DON_VI_NHAN_SU}`,
  }).then((res: any) => {
    return res;
  });

export const loaiHopDong = () =>
  NetWorkService.Get({
    url: `${url.LOAI_HOP_DONG}`,
  }).then((res: any) => {
    return res;
  });

export const donViViTri = (params?: any) =>
  NetWorkService.Get({
    url: `${url.DON_VI_VI_TRI}`,
    ...(params && { params }),
  }).then((res: any) => {
    return res;
  });

export const getNganh = () =>
  NetWorkService.Get({
    url: `${url.NGANH}`,
  }).then((res: any) => {
    return res;
  });

export const getTrinhDoDTNS = () =>
  NetWorkService.Get({
    url: `${url.TRINH_DO_DAO_TAO_NS}`,
  }).then((res: any) => {
    return res;
  });

export const getBacLuong = () =>
  NetWorkService.Get({
    url: `${url.BAC_LUONG}`,
  }).then((res: any) => {
    return res;
  });

export const getLoaiPhuCap = () =>
  NetWorkService.Get({
    url: `${url.LOAI_PHU_CAP}`,
  }).then((res: any) => {
    return res;
  });

export const getLoaiKhoan = () =>
  NetWorkService.Get({
    url: `${url.LOAI_KHOAN}`,
  }).then((res: any) => {
    return res;
  });

export const getLoaiPhuCapTangThem = () =>
  NetWorkService.Get({
    url: `${url.LOAI_PHU_CAP_TANG_THEM}`,
  }).then((res: any) => {
    return res;
  });

export const getLoaiBoiDuong = () =>
  NetWorkService.Get({
    url: `${url.LOAI_BOI_DUONG}`,
  }).then((res: any) => {
    return res;
  });

export const getBangCapChungChi = () =>
  NetWorkService.Get({
    url: `${url.BANG_CAP_CHUNG_CHI}`,
  }).then((res: any) => {
    return res;
  });

export const getCapKhenThuong = () =>
  NetWorkService.Get({
    url: `${url.CAP_KHEN_THUONG}`,
  }).then((res: any) => {
    return res;
  });

export const getCapSangKien = () =>
  NetWorkService.Get({
    url: `${url.CAP_SANG_KIEN}`,
  }).then((res: any) => {
    return res;
  });

export const getLoaiSangKien = () =>
  NetWorkService.Get({
    url: `${url.LOAI_SANG_KIEN}`,
  }).then((res: any) => {
    return res;
  });

export const getLoaiKhenThuong = () =>
  NetWorkService.Get({
    url: `${url.LOAI_KHEN_THUONG}`,
  }).then((res: any) => {
    return res;
  });

export const getPhuongThuocKhenThuong = () =>
  NetWorkService.Get({
    url: `${url.PHUONG_THUC_KHEN_THUONG}`,
  }).then((res: any) => {
    return res;
  });

export const getHinhThucKhenThuong = (body?: any) =>
  NetWorkService.Get({
    url: `${url.HINH_THUC_KHEN_THUONG}`,
    params: body ?? {},
  }).then((res: any) => {
    return res;
  });

export const getCapKyLuat = () =>
  NetWorkService.Get({
    url: `${url.CAP_KY_LUAT}`,
  }).then((res: any) => {
    return res;
  });

export const getQuyetDinhKhenThuong = () =>
  NetWorkService.Get({
    url: `${url.QUYET_DINH_KHEN_THUONG}`,
  }).then((res: any) => {
    return res;
  });

export const getHinhThucKyLuat = (params?: any) =>
  NetWorkService.Get({
    url: `${url.HINH_THUC_KY_LUAT}`,
    ...(params && { params }),
  }).then((res: any) => {
    return res;
  });

export const updateChinhSuaNS = (id: string | undefined, body: any) =>
  NetWorkService.Put(
    {
      url: `${url.UPDATE_BAN_CHINH_SUA}/${id}`,
      body,
    },
    {
      message: MESSAGE_CODE.CAP_NHAT,
    },
  ).then((res: any) => {
    return res;
  });

export const postQuanHeGiaDinh = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.QHGD_VE_BAN_THAN}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const delQuanHeGiaDinh = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.QHGD_VE_BAN_THAN}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const putQuanHeGiaDinh = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.QHGD_VE_BAN_THAN}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const postQuanHeVoChong = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.QHGD_VE_VO_CHONG}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putQuanHeVoChong = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.QHGD_VE_VO_CHONG}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delQuanHeVoChong = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.QHGD_VE_VO_CHONG}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postViTriChucDanh = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.VI_TRI_CHUC_DANH}`,
      body,
    },
    {
      message: MESSAGE_CODE.THEM_MOI,
    },
  ).then((res: any) => {
    return res;
  });

export const putViTriChucDanh = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.VI_TRI_CHUC_DANH}/${id}`,
      body,
    },
    {
      message: MESSAGE_CODE.CAP_NHAT,
    },
  ).then((res: any) => {
    return res;
  });

export const delViTriChucDanh = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.VI_TRI_CHUC_DANH}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postViTriQuyHoach = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.VI_TRI_QUY_HOACH}`,
      body,
    },
    {
      message: MESSAGE_CODE.THEM_MOI,
    },
  ).then((res: any) => {
    return res;
  });

export const putViTriQuyHoach = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.VI_TRI_QUY_HOACH}/${id}`,
      body,
    },
    {
      message: MESSAGE_CODE.CAP_NHAT,
    },
  ).then((res: any) => {
    return res;
  });

export const delViTriQuyHoach = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.VI_TRI_QUY_HOACH}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postHocHam = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.HOC_HAM}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putHocHam = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.HOC_HAM}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delHocHam = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.HOC_HAM}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postTrinhDoDaoTao = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.TRINH_DO_DAO_TAO}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putTrinhDoDaoTao = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.TRINH_DO_DAO_TAO}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delTrinhDoDaoTao = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.TRINH_DO_DAO_TAO}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postThongTinHopDong = (body: any) =>
  NetWorkService.Post({
    url: `${url.HOP_DONG_ME}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const putThongTinHopDong = (body: any, id: string) =>
  NetWorkService.Put({
    url: `${url.HOP_DONG_ME}/${id}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const delThongTinHopDong = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.HOP_DONG_ME}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postDBPhuCap = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.DIEN_BIEN_PHU_CAP}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putDBPhuCap = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.DIEN_BIEN_PHU_CAP}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const postDBKhoan = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.DIEN_BIEN_KHOAN}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putDBKhoan = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.DIEN_BIEN_KHOAN}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const postDBPhuCapTangThem = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.DIEN_BIEN_PHU_CAP_TANG_THEM}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putDBPhuCapTangThem = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.DIEN_BIEN_PHU_CAP_TANG_THEM}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const postDBLuong = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.DIEN_BIEN_LUONG}`,
      body,
    },
    {
      message: MESSAGE_CODE.THEM_MOI,
    },
  ).then((res: any) => {
    return res;
  });

export const putDBLuong = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.DIEN_BIEN_LUONG}/${id}`,
      body,
    },
    {
      message: MESSAGE_CODE.CAP_NHAT,
    },
  ).then((res: any) => {
    return res;
  });

export const delDBLuong = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.DIEN_BIEN_LUONG}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const delDBPhuCap = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.DIEN_BIEN_PHU_CAP}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const delDBKhoan = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.DIEN_BIEN_KHOAN}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const delDBPhuCapTangThem = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.DIEN_BIEN_PHU_CAP_TANG_THEM}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postQuaTrinhCongTac = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.QUA_TRINH_CONG_TAC}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putQuaTrinhCongTac = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.QUA_TRINH_CONG_TAC}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delQuaTrinhCongTac = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.QUA_TRINH_CONG_TAC}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postQuaTrinhCuDiCongTac = (body: any) =>
  NetWorkService.Post({
    url: `${url.CU_DI_CONG_TAC}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const putQuaTrinhCuDiCongTac = (body: any, id: string) =>
  NetWorkService.Put({
    url: `${url.QUA_TRINH_DUOC_CU_CONG_TAC}/${id}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const delQuaTrinhCuDiCongTac = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.QUA_TRINH_DUOC_CU_CONG_TAC}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postQuaTrinhCuDiDaoTao = (body: any) =>
  NetWorkService.Post({
    url: `${url.QUA_TRINH_CU_DI_DAO_TAO}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const putQuaTrinhCuDiDaoTao = (body: any, id: string) =>
  NetWorkService.Put({
    url: `${url.CU_DI_DAO_TAO_BOI_DUONG}/${id}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const delQuaTrinhCuDiDaoTao = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.CU_DI_DAO_TAO_BOI_DUONG}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postKhenThuong = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.KHEN_THUONG_NHAN_SU}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putKhenThuong = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.KHEN_THUONG_NHAN_SU}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delKhenThuong = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.KHEN_THUONG_NHAN_SU}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postSangKien = (body: any) =>
  NetWorkService.Post({
    url: `${url.SANG_KIEN_NHAN_SU_UP}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const putSangKien = (body: any, id: string) =>
  NetWorkService.Put({
    url: `${url.SANG_KIEN_NHAN_SU_UP}/${id}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const delSangKien = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.SANG_KIEN_NHAN_SU_UP}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postKyLuat = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.KY_LUAT_NHAN_SU}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putKyLuat = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.KY_LUAT_NHAN_SU}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delKyLuat = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.KY_LUAT_NHAN_SU}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postCuDiDTBD = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.CU_DI_DTBD}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putCuDiDTBD = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.CU_DI_DTBD}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delCuDiDTBD = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.CU_DI_DTBD}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postDoiTuongChinhSach = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.DOI_TUONG_CHINH_SACH}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putDoiTuongChinhSach = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.DOI_TUONG_CHINH_SACH}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delDoiTuongChinhSach = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.DOI_TUONG_CHINH_SACH}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postQuocPhong = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.BOI_DUONG_QUOC_PHONG}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putQuocPhong = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.BOI_DUONG_QUOC_PHONG}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delQuocPhong = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.BOI_DUONG_QUOC_PHONG}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postTinHoc = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.TIN_HOC}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putTinHoc = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.TIN_HOC}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delTinHoc = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.TIN_HOC}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postQuanLyHanhChinh = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.QUAN_LY_HANH_CHINH}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putQuanLyHanhChinh = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.QUAN_LY_HANH_CHINH}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delQuanLyHanhChinh = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.QUAN_LY_HANH_CHINH}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postQuanLyNhaNuoc = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.QUAN_LY_NHA_NUOC}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putQuanLyNhaNuoc = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.QUAN_LY_NHA_NUOC}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delQuanLyNhaNuoc = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.QUAN_LY_NHA_NUOC}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postLyLuanChinhTri = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.TRINH_DO_LY_LUAN}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putLyLuanChinhTri = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.TRINH_DO_LY_LUAN}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delLyLuanChinhTri = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.TRINH_DO_LY_LUAN}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const postNgoaiNgu = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.NGOAI_NGU}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putNgoaiNgu = (body: any, id: string) =>
  NetWorkService.Put(
    {
      url: `${url.NGOAI_NGU}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });

export const delNgoaiNgu = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.NGOAI_NGU}/${id}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });

export const khoaChinhSua = (body: any, id: string) =>
  NetWorkService.Put({
    url: `${url.KHOA_CHINH_SUA}/${id}`,
    body,
  }).then((res: any) => {
    return res;
  });

export const getThongTinSinhVien = (maKhoaNganh: string) =>
  NetWorkService.Get({
    url: `${url.XET_TOT_NGHIEP}/${maKhoaNganh}`,
  }).then((res: any) => {
    return res?.data?.data;
  });

export const getDotXetTN = () =>
  NetWorkService.Get({
    url: `${url.DOT_XET_TOT_NGHIEP}`,
  }).then((res: any) => {
    return res?.data?.data;
  });

export const getThongTinSVLop = (id: string) =>
  NetWorkService.Get({
    url: `${url.TONG_HOP_LOP_TC}/${id}/sinh-vien/tong-hop/many`,
  }).then((res: any) => {
    return res?.data?.data || [];
  });

export const logOutSSO = async () => {
  const res = await load(KEY_STORAGE.RESPONSE_SSO);

  if (res) {
    try {
      await logout(CONFIG_SSO, {
        idToken: res?.idToken ?? '',
        postLogoutRedirectUrl: `${REDIREC_URL}`,
      });

      const data = await OneSignal.getDeviceState();

      const player_id = data?.userId;

      const bodyOnesignal = { playerId: player_id };

      await delOnesignal(bodyOnesignal);

      onPushLogout();
    } catch (error) {
      onPushLogout();
    }
  }
};

export const getDSDotXayDungKeHoach = () =>
  NetWorkService.Get({
    url: `${url.DS_DOT_XAY_DUNG}`,
  }).then((res: any) => {
    return res?.data?.data;
  });

export const getDSCongViecCuaToi = (idDot: string, body: any) =>
  NetWorkService.Get({
    url: `${url.DS_CONG_VIEC}/${idDot}/me`,
    params: body,
  }).then((res: any) => {
    return res?.data?.data;
  });

export const raSoatTienDoCongViec = (id: string, body: any) =>
  NetWorkService.Put(
    {
      url: `${url.TO_CHUC_CONG_VIEC}/${id}/tien-do-cong-viec`,
      body: body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res?.data;
  });

export const getDSKeHoachNam = (body: any) =>
  NetWorkService.Get({
    url: `${url.DS_KE_HOACH_NAM}`,
    params: body,
  }).then((res: any) => {
    return res?.data?.data;
  });

export const getDSKeHoachHoatDong = (id: string, body: any) =>
  NetWorkService.Get({
    url: `${url.DS_KE_HOACH_HOAT_DONG}/${id}/can-bo`,
    params: body,
  }).then((res: any) => {
    return res?.data?.data;
  });

export const getThongTinChamCong = (body: any) =>
  NetWorkService.Get({
    url: `${url.THONG_TIN_CHAM_CONG}`,
    params: body,
  }).then((res: any) => {
    return res?.data?.data;
  });

export const getBangChamCongTheoThang = (body: any) =>
  NetWorkService.Get({
    url: `${url.BANG_CHAM_CONG}`,
    params: body,
  }).then((res: any) => {
    return res?.data?.data;
  });

export const getThongKeDon = (thang: number) =>
  NetWorkService.Get({
    url: `${url.THONG_KE_DON}/${thang}`,
  }).then(res => {
    return res;
  });

export const getLichLamThemGioDuKien = (params: any) =>
  NetWorkService.Get({
    url: `${url.LICH_LAM_THEM_DU_KIEN}`,
    params,
  }).then(res => {
    return res;
  });

export const postLichLamThemGioThucTe = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.THEM_LICH_THUC_TE}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then(res => {
    return res;
  });

export const postLichLamThemGioDuKien = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.THEM_LICH_DU_KIEN}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then(res => {
    return res;
  });

export const getDiemCuaPhieuDaNhap = id => {
  return NetWorkService.Get({
    url: `${url.DIEM_DA_NHAP}/${id}/Sinh%20vi%C3%AAn`,
  }).then((res: any) => {
    return res?.data;
  });
};

export const getDanhSachMinhChung = () => {
  return NetWorkService.Get({
    url: `${url.DS_MINH_CHUNG}`,
    params: { condition: { dungChoSuKien: false } },
  }).then((res: any) => {
    return res?.data;
  });
};

export const getDanhSachDotChamDiem = () => {
  return NetWorkService.Get({
    url: `${url.DS_DOT_CHAM_DIEM}`,
    params: { sort: { kyHoc: -1 } },
  }).then((res: any) => {
    return res?.data;
  });
};

export const getDanhSachLichSuKhaiBao = body => {
  return NetWorkService.Get({
    url: `${url.DS_LICH_SU_KHAI_BAO}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });
};

export const guiKhaiBaoMinhChung = body => {
  return NetWorkService.Post(
    {
      url: `${url.KHAI_BAO_MINH_CHUNG}`,
      body: body,
    },
    { message: MESSAGE_CODE.KHAI_BAO },
  ).then((res: any) => {
    return res?.data;
  });
};

export const getDefaultDataKhaoSatSuKien = (idSuKien, loai, ssoId) =>
  NetWorkService.Get({
    url: `${url.DEFAULT_DATA_KHAO_SAT_SU_KIEN}/${idSuKien}/${loai}/${ssoId}`,
  }).then(res => {
    return res;
  });

export const getSuKienDaThamGia = (body: any) => {
  return NetWorkService.Get({
    url: `${url.DANH_SACH_SU_KIEN_DA_THAM_GIA}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });
};

export const getDanhSachSuKien = body => {
  return NetWorkService.Get({
    url: `${url.DANH_SACH_SU_KIEN}`,
    params: body,
  }).then((res: any) => {
    return res?.data;
  });
};

export const getSettingByKey = (key: string) => {
  return NetWorkService.Get({
    url: `tai-chinh-api-v2/setting/${key}/value`,
  }).then((res: any) => {
    return res?.data;
  });
};

export const getChiTietOne = (identityCode: string) => {
  return NetWorkService.Get(
    {
      url: url.CHI_TIET_ONE,
      params: { condition: { identityCode } },
    },
    { message: MESSAGE_CODE.THANH_TOAN },
  ).then((res: any) => {
    return res;
  });
};

export const postChatBot = (question: string) =>
  NetWorkService.Post({
    url: '',
    baseURL: 'https://ami.ptit.edu.vn',
    body: { question },
  }).then((res: any) => {
    return res;
  });
