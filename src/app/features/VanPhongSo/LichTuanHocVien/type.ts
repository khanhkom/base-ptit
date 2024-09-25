import { ETrangThaiDuyetBanGiamDoc } from './constant';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DataCalendarWeekProps {
  _id: string;
  __v: number;
  chiTietThayDoi: any[];
  chuTri: ChuTri[];
  chuaPhatHanh: boolean;
  createdAt: Date;
  dauMoiLienHe: any[];
  donViPhoiHop: any[];
  donViPhoiHopKhac: string;
  hoan: boolean;
  info: Info;
  listThamGiaBiXoa: any[];
  loaiDoiTuong: string;
  trangThaiDuyetBanGiamDoc: ETrangThaiDuyetBanGiamDoc;
  daXoa: boolean;
  nam: number;
  noiDungCongViec: string;
  thanhPhanNguoiThamDu: any[];
  thanhPhanThamDu: any[];
  thanhPhanThamDuKhac: string;
  thietBiCNC: boolean;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  thu: number;
  trangThai: string;
  trangThaiSua: string;
  tuan: number;
  updatedAt: Date;
}

export interface ChuTri {
  ten: string;
  maDinhDanh: string;
  tenDonVi: string;
  id: number;
  tenGoi: string;
  thamGia: string;
}

export interface Info {
  nguoiTao: NguoiTAO;
}

export interface NguoiTAO {
  ssoId: string;
  code: string;
  fullname: string;
}
