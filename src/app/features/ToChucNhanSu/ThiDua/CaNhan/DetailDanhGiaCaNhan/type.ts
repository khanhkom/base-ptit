import { AccountProps } from '@model/app';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BieuMauDanhGiaProps {
  _id: string;
  loai: string;
  tieuDe: string;
  danhSachKhoi: DanhSachKhoi[];
  loaiDoiTuongSuDung: any[];
  danhSachVaiTro: any[];
  danhSachLopTinChi: any[];
  danhSachLopHanhChinh: any[];
  danhSachNguoiDung: any[];
  danhSachDonVi: any[];
  danhSachKhoaHoc: any[];
  danhSachNganhHoc: any[];
  kichHoat: boolean;
  soLuotTraLoiToiDa: number;
  coCamKet: boolean;
  phamVi: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface DanhSachKhoi {
  _id: string;
  tieuDe: string;
  danhSachCauHoi: DanhSachCauHoiProps[];
  moTa?: string;
}

export interface DanhSachCauHoiProps {
  _id: string;
  loai: Loai;
  batBuoc: boolean;
  noiDungCauHoi: string;
  cauTraLoiKhac: boolean;
  luaChon: any[];
  luaChonCot: any[];
  luaChonHang: any[];
  gioiHanDuoiTuyenTinh: number;
  gioiHanTrenTuyenTinh: number;
}

export enum Loai {
  Numberinputrating = 'Numberinputrating',
}

export interface DataDGDonViProps {
  ketQuaImport: boolean;
  data: Datum[];
  thongTinNhanSu: AccountProps;
  trangThai: string;
  yKienDonVi: string;
  ketLuanLanhDao: string;
  ketQuaKetLuan: string;
}

export interface Datum {
  _id: string;
  idDot: string;
  idKhaoSat: string;
  nguoiTraLoi: string;
  ssoId: string;
  __v: number;
  answered: boolean;
  createdAt: Date;
  danhSachTraLoi: DanhSachTraLoi[];
  saved: boolean;
  startedAt: Date;
  trangThaiDanhGia: string;
  updatedAt: Date;
  username?: string;
  thoiGianGui: Date;
  info?: Info;
}

export interface DanhSachTraLoi {
  idCauHoi: string;
  listLuaChon: any[];
  listLuaChonBang: any[];
  traLoiText: string;
  listUrlFile: any[];
  _id: string;
}

export interface Info {
  _id: string;
  email: string;
  ssoId: string;
  firstname: string;
  lastname: string;
  username: string;
}

export interface InfoPhieuProps {
  _id: string;
  idDot: string;
  idKhaoSat: string;
  nguoiTraLoi: string;
  ssoId: string;
  __v: number;
  answered: boolean;
  createdAt: Date;
  danhSachTraLoi: DanhSachTraLoi[];
  saved: boolean;
  startedAt: Date;
  trangThaiDanhGia: string;
  updatedAt: Date;
  username?: string;
  thoiGianGui: Date;
  info?: Info;
}

export interface DanhSachTraLoi {
  idCauHoi: string;
  listLuaChon: any[];
  listLuaChonBang: any[];
  traLoiText: string;
  listUrlFile: any[];
  _id: string;
}

export interface Info {
  _id: string;
  email: string;
  ssoId: string;
  firstname: string;
  lastname: string;
  username: string;
}
