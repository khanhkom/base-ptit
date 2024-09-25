/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ChucVuUserProps {
  isBanGiamDoc: boolean;
  isTruongPhongPhoPhong: boolean;
}

export interface ChuTriProps {
  _id: string;
  ssoId: string;
  hoTen: string;
  maCanBo: string;
  tenDonVi: string;
  maDonVi: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface PhongHopProps {
  _id: string;
  ma: string;
  ten: string;
  diaChi: any;
  sucChua: number;
  thietBiCNC: any;
  sucChuaHoc: any;
  sucChuaThi: any;
  loaiPhong: string;
  trangThai: string;
  soTang: any;
  soPhong: any;
  createdAt: Date;
  updatedAt: Date;
  maToaNha: any;
}

export interface DonViProps {
  _id: string;
  ten: string;
  maDonVi: string;
  donViChaId: string;
  loaiPhongBanId: string;
  loaiHinhDonVi: string;
  laDonViThucTe: boolean;
  soQuyetDinhThanhLap: any;
  tenVietTat: any;
  ngayRaQuyetDinh: any;
  diaChiDonVi: any;
  sdtDonVi: any;
  emailDonVi: any;
  loaiTrucThuoc: any;
  urlFileUpload: any;
  moTa: any;
  chucDanhKiemNhiem: any;
  hienThi: boolean;
  loaiTuChuTaiChinh: any;
  createdAt: Date;
  updatedAt: Date;
  loaiPhongBan: LoaiPhongBan;
  donViCha: DonVi;
  danhSachDonViCon: any[];
  danhSachDonViViTri: DanhSachDonViViTri[];
  danhSachNhanSuDonViChinh: DanhSachNhanSuDonViChinh[];
}

export interface DanhSachDonViViTri {
  _id: string;
  tenChucVu: string;
  loai: string;
  soLuong: any;
  capChucVu: string;
  donViId: string;
  chucVu: LoaiPhongBan;
  donVi: DonVi;
}

export interface LoaiPhongBan {
  ma: string;
  ten: string;
}

export interface DonVi {
  maDonVi: string;
  ten: string;
}

export interface DanhSachNhanSuDonViChinh {
  _id: string;
  maCanBo: string;
  hoDem: string;
  ten: string;
  trangThai: string;
  loaiHoSo: string;
  cccdCMND: null | string;
  trangThaiChinhSua: null | string;
  loaiCanBoGiangVien: string;
  ssoId: null | string;
  donViChinh: DonViChinh;
  donViViTri: DonViViTri | any;
}

export interface DonViChinh {
  maDonVi: string;
  ten: string;
  _id: string;
}

export interface DonViViTri {
  capChucVu: string;
  tenChucVu: string;
  _id: string;
}
