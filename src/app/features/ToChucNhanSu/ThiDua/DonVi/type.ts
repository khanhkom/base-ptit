import { AccountProps } from '@model/app';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DotDanhGiaProps {
  _id: string;
  tenDot: string;
  idBieuMau: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  vanBanLienQuan: any;
  loaiDot: string;
  kichHoat: boolean;
  ghiChu: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface NhanSuProps {
  _id: string;
  ssoId: string;
  ghiChu: string;
  hoTen: string;
  tongDiemCaNhan: string;
  phanLoaiCaNhan: string;
  tongDiemDonVi: string;
  phanLoaiDonVi: string;
  trangThai: string;
}

export interface PhieuDanhGiaNSProps {
  ketQuaImport: boolean;
  data: any[];
  thongTinNhanSu: AccountProps;
  trangThai: string;
  yKienDonVi: string;
  ketLuanLanhDao: string;
  ketQuaKetLuan: string;
}

export interface ChucVuChinh {
  ma: string;
  ten: string;
  _id: string;
}

export interface DanhSachDonViCanBoViTri {
  _id: string;
  thongTinNhanSuId: string;
  donViId: string;
  chucVuId: string;
  donViViTriId: string;
  conHieuLuc: boolean;
  idGoc: string;
  soQuyetDinh: null;
  ngayQuyetDinh: null;
  hieuLucTuNgay: null;
  hieuLucDenNgay: null;
  laDonViChinh: boolean;
  loaiQuyetDinh: string;
  urlFileUpload: null;
  createdAt: Date;
  updatedAt: Date;
  chucVu: TrinhDoLyLuanChinhTri;
  donVi: DonVi;
  donViViTri: DonViViTri;
}

export interface TrinhDoLyLuanChinhTri {
  ma: string;
  ten: string;
}

export interface DonVi {
  maDonVi: string;
  ten: string;
}

export interface DonViViTri {
  tenChucVu: string;
  capChucVu: string;
  _id: string;
}

export interface DanhSachThongTinTrinhDoDAOTAO {
  _id: string;
  thongTinNhanSuId: string;
  idGoc: string;
  trinhDoDaoTaoId: string;
  nganh: string;
  maNganh: string;
  noiDaoTao: null;
  namTotNghiep: null;
  hinhThucDaoTaoId: null;
  vanBangChungChi: null;
  coSoDaoTao: null;
  nuocDaoTao: null;
  fileDinhKem: null;
  thoiGianBatDau: null;
  thoiGianKetThuc: null;
  createdAt: Date;
  updatedAt: Date;
  trinhDoDaoTao: TrinhDoDAOTAO;
  hinhThucDaoTao: null;
}

export interface TrinhDoDAOTAO {
  _id: string;
  ma: string;
  ten: string;
  soThuTu: number;
  moTa: null;
  suDung: null;
  createdAt: Date;
  updatedAt: Date;
}
